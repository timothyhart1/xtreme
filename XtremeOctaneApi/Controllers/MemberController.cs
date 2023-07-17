using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;

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

        [HttpGet("All-Members")]
        public async Task<IActionResult> GetAllMembers()
        {
            try
            {
                var members = await _db.Member.Where(m => m.Deleted == false).OrderBy(m => m.Name).ToListAsync();

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


        [HttpGet("Single-Member/{id}")]
        public async Task<ActionResult<Member>> GetMemberById(int id)
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

        [HttpPut("Edit-Profile/{id}")]
        [AllowAnonymous]
        public ActionResult EditProfile(int id, [FromBody] Member member)
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
                    memberProfile.CreateDate = _db.Member.Where(e => e.MemberId == id).Select(e => e.CreateDate).FirstOrDefault();
                    memberProfile.Deleted = false;
                }

                _db.SaveChanges();

                return Ok(memberProfile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing your profile");
                return BadRequest(ex.Message);
            }
        }




        [HttpPost("Add-Member")]
        [AllowAnonymous]

        public async Task<ActionResult<Member>> AddMember(Member memberModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var member = new Member
                {
                    Email= memberModel.Email,
                    Name = memberModel.Name,
                    Surname = memberModel.Surname,
                    City = memberModel.City,
                    PhoneNumber = memberModel.PhoneNumber,
                    Gender = memberModel.Gender,
                    CreateDate = DateTime.Now
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

        [HttpDelete("Delete-Member")]
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
