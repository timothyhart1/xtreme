﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Controllers;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Dtos;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.MemberService
{
    public class MemberService : IMemberService
    {
        private readonly ILogger<MemberService> _logger;
        private readonly DataContext _db;

        public MemberService(DataContext db, ILogger<MemberService> logger)
        {
            _db = db;
            _logger = logger;
        }

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
                    return new NotFoundObjectResult("No members are available!");
                }
                return new OkObjectResult(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the members");
                return new StatusCodeResult(500);
            }
        }

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
                    return new NotFoundObjectResult("No members are available!");
                }
                return new OkObjectResult(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the members");
                return new StatusCodeResult(500);
            }
        }

        public async Task<ActionResult<MemberModel>> GetMemberById(int id)
        {
            try
            {
                var member = await _db.Member.SingleOrDefaultAsync(e => e.MemberId == id);

                if (member == null)
                {
                    return new NotFoundResult();
                }
                return new ActionResult<MemberModel>(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the member with ID", id);
                return new StatusCodeResult(500);
            }
        }

        public IActionResult GetProfilePicture(int memberId)
        {
            var member = _db.Member.FirstOrDefault(e => e.MemberId == memberId);
            if (member == null)
            {
                return new NotFoundObjectResult("Member not found.");
            }

            string basePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "ProfilePictures");
            string filePath = member.ProfilePicture != null ? Path.Combine(basePath, member.ProfilePicture) : null;

            if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
            {
                filePath = Path.Combine(basePath, "profile-pic-default.webp");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return new FileContentResult(fileBytes, "image/webp"); 
        }


        public async Task<IActionResult> EditProfile(int id, CreateMemberDto member)
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

                    return new OkObjectResult(memberProfile);
                }

                return new NotFoundObjectResult("Member not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing your profile");
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public async Task<IActionResult> UpdateMemberRole(string userId, string newRoleName)
        {
            try
            {
                var role = _db.Roles.FirstOrDefault(r => r.Name == newRoleName);
                if (role == null)
                {
                    return new NotFoundObjectResult($"Role '{newRoleName}' not found.");
                }

                // Find the existing user role
                var userRole = await _db.UserRoles.FirstOrDefaultAsync(ur => ur.UserId == userId);
                if (userRole != null)
                {
                    // Remove the existing user role
                    _db.UserRoles.Remove(userRole);
                    await _db.SaveChangesAsync();
                }

                // Create and add the new user role
                var newUserRole = new IdentityUserRole<string> { UserId = userId, RoleId = role.Id };
                _db.UserRoles.Add(newUserRole);
                await _db.SaveChangesAsync();

                return new OkObjectResult($"Member role updated to '{newRoleName}'.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error updating the member role.");
                return new BadRequestObjectResult(ex.Message);
            }
        }


        public ActionResult ReinstateMember(int memberId)
        {
            try
            {
                var memberProfile = _db.Member.FirstOrDefault(e => e.MemberId == memberId);

                if (memberProfile != null)
                {
                    memberProfile.Deleted = false;
                    _db.SaveChanges();
                    return new OkObjectResult(memberProfile);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error reinstating the member");
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public ActionResult VerifyMember(int memberId)
        {
            try
            {
                var memberProfile = _db.Member.FirstOrDefault(e => e.MemberId == memberId);

                if (memberProfile != null)
                {
                    memberProfile.Verified = true;
                    _db.SaveChanges();
                    return new OkObjectResult(memberProfile);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error verifying the member");
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public async Task<ActionResult<MemberModel>> AddMember(MemberModel memberModel)
        {
            try
            {
                var member = new MemberModel
                {
                    Email = memberModel.Email,
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
                return new OkObjectResult(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the member");
                return new StatusCodeResult(500);
            }
        }

        public async Task<IActionResult> DeleteMember(int id)
        {
            try
            {
                var member = await _db.Member.FindAsync(id);

                if (member == null)
                {
                    return new NotFoundObjectResult("No member was found with a matching ID!");
                }

                member.Deleted = true;
                await _db.SaveChangesAsync();

                return new OkResult();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the member");
                return new ObjectResult("An error occurred while deleting the member")
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}
