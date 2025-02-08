using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Dtos;
using XtremeOctaneApi.Services.MemberService;
using System.Data;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("GetAllMembers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllMembers()
        {
            return await _memberService.GetAllMembers();
        }

        [HttpGet("GetAllNonVerifiedMembers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllNonVerifiedMembers()
        {
            return await _memberService.GetAllNonVerifiedMembers();
        }

        [HttpGet("GetSingleMember/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberModel>> GetMemberById(int id)
        {
            return await _memberService.GetMemberById(id);
        }

        [HttpGet("GetProfilePicture/{memberId}")]
        [AllowAnonymous]
        public IActionResult GetProfilePicture(int memberId)
        {
            return _memberService.GetProfilePicture(memberId);
        }

        [HttpPut("EditProfile/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> EditProfile(int id, [FromForm] CreateMemberDto member)
        {
            return await _memberService.EditProfile(id, member);
        }

        [HttpPut("UpdateMemberRole/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateMemberRole(string userId, [FromBody] string newRoleName)
        {
            return await _memberService.UpdateMemberRole(userId, newRoleName);
        }

        [HttpPut("ReinstateMember/{memberId}")]
        public ActionResult ReinstateMember(int memberId)
        {
            return _memberService.ReinstateMember(memberId);
        }

        [HttpPut("VerifyMember/{memberId}")]
        public ActionResult VerifyMember(int memberId)
        {
            return _memberService.VerifyMember(memberId);
        }

        [HttpPost("AddNewMember")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberModel>> AddNewMember(MemberModel memberModel)
        {
            return await _memberService.AddMember(memberModel);
        }

        [HttpDelete("DeleteMember/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMember(int id)
        {
            return await _memberService.DeleteMember(id);
        }
    }
}
