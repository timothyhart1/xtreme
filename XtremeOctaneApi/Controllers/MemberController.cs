using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Dtos;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class MemberController : Controller
    {
        private readonly ILogger<EventController> _logger;
        private readonly DataContext _db;

        public MemberController(DataContext db, ILogger<EventController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // Get all members.
        [HttpGet("GetAllMembers")]
        public async Task<IActionResult> GetAllMembers()
        {
            try
            {
                var members = await _db.Member
                    .Where(m => m.Verified == true)
                    .OrderBy(m => m.Deleted)
                    .ThenBy(m => m.Name)
                    .ToListAsync();

                if (members == null)
                {
                    return NotFound("No members are available!");
                }
                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the members");
                return StatusCode(500, "An error occurred while fetching the members");
            }
        }

        // Get all non-verified members.
        [HttpGet("GetAllNonVerifiedMembers")]
        public async Task<IActionResult> GetAllNonVerifiedMembers()
        {
            try
            {
                var members = await _db.Member
                    .Where(m => m.Verified != true)
                    .OrderBy(m => m.Name == null ? 1 : 0)
                    .ThenBy(m => m.Name)
                    .ToListAsync();

                if (members == null || !members.Any())
                {
                    return NotFound("No members are available!");
                }
                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the members");
                return StatusCode(500, "An error occurred while fetching the members");
            }
        }

        // Get a single member
        [HttpGet("GetSingleMember/{id}")]
        public async Task<ActionResult<MemberModel>> GetMemberById(int id)
        {
            try
            {
                var member = await _db.Member.SingleOrDefaultAsync(e => e.MemberId == id);
               
                if (member == null)
                {
                    return NotFound();
                }
                return member;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the member with ID", id);
                return StatusCode(500, "An error occurred while fetching the member with ID");
            }
        }

        // Get profile picture.
        [HttpGet("GetProfilePicture/{memberId}")]
        [AllowAnonymous]
        public IActionResult GetEventImage(int memberId)
        {
            var member = _db.Member.FirstOrDefault(e => e.MemberId == memberId);

            if (member == null || string.IsNullOrEmpty(member.ProfilePicture))
            {
                return NotFound("Event or image not found.");
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "ProfilePictures", member.ProfilePicture);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image not found.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "image/jpeg");
        }

        // Edit profile.
        [HttpPut("EditProfile/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> EditProfile(int id, [FromForm] CreateMemberDto member)
        {
            try
            {
                var memberProfile = _db.Member.FirstOrDefault(e => e.MemberId == id);

                if (memberProfile != null)
                {
                    memberProfile.Name = member.Name;
                    memberProfile.Surname = member.Surname;
                    memberProfile.City = member.City;
                    memberProfile.PhoneNumber = member.PhoneNumber;
                    memberProfile.Gender = member.Gender;

                    if (member.Image != null)
                    {
                        string fileName = Path.GetFileName(member.Image.FileName);
                        string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\ProfilePictures", fileName);

                        using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
                        {
                            await member.Image.CopyToAsync(fileStream);
                            await fileStream.FlushAsync();
                        }

                        memberProfile.ProfilePicture = fileName;
                    }

                    _db.SaveChanges();

                    return Ok(memberProfile);
                }

                return NotFound("Member not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing your profile");
                return BadRequest(ex.Message);
            }
        }

        // Edit a member.
        [HttpPut("ReinstateMember/{memberId}")]
        [AllowAnonymous]
        public ActionResult ReinstateMember(int memberId)
        {
            try
            {
                var memberProfile = _db.Member.FirstOrDefault(e => e.MemberId == memberId);

                if (memberProfile != null)
                {
                    memberProfile.Deleted = false;
                    _db.SaveChanges();
                    return Ok(memberProfile);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error reinstating the member");
                return BadRequest(ex.Message);
            }
        }

        // Verify a member.
        [HttpPut("VerifyMember/{memberId}")]
        [AllowAnonymous]
        public ActionResult VerifyMember(int memberId)
        {
            try
            {
                var memberProfile = _db.Member.FirstOrDefault(e => e.MemberId == memberId);

                if (memberProfile != null)
                {
                    memberProfile.Verified = true;
                    _db.SaveChanges();
                    return Ok(memberProfile);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error reinstating the member");
                return BadRequest(ex.Message);
            }
        }

        // Create a new member.
        [HttpPost("AddNewMember")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberModel>> AddMember(MemberModel memberModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var member = new MemberModel
                {
                    Email= memberModel.Email,
                    Name = memberModel.Name,
                    Surname = memberModel.Surname,
                    City = memberModel.City,
                    PhoneNumber = memberModel.PhoneNumber,
                    Gender = memberModel.Gender,
                    CreateDate = DateTime.Now,
                    Deleted = false,
                    Verified = false,
                };

                await _db.Member.AddAsync(member);
                await _db.SaveChangesAsync();
                return Ok(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the member");
                return StatusCode(500, "An error occurred while adding the member");
            }
        }

        // Delete a member
        [HttpDelete("DeleteMember/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMember(int id)
        {
            try
            {
                var member = await _db.Member.FindAsync(id);

                if (member == null)
                {
                    return NotFound("No member was found with a matching ID!");
                }

                member.Deleted = true;
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the member");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the member");
            }
        }
    }
}
