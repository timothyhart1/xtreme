using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Dtos;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.MemberService
{
    public interface IMemberService
    {
        Task<IActionResult> GetAllMembers();
        Task<IActionResult> GetAllNonVerifiedMembers();
        Task<ActionResult<MemberModel>> GetMemberById(int id);
        IActionResult GetProfilePicture(int memberId);
        Task<IActionResult> EditProfile(int id, CreateMemberDto member);
        Task<IActionResult> UpdateMemberRole(string userId, string newRoleName);
        ActionResult ReinstateMember(int memberId);
        ActionResult VerifyMember(int memberId);
        Task<ActionResult<MemberModel>> AddMember(MemberModel memberModel);
        Task<IActionResult> DeleteMember(int id);

    }
}
