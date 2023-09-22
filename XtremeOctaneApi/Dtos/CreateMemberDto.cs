using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Dtos
{
    public class CreateMemberDto
    {
        public int MemberId { get; set; }
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? City { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public DateTime CreateDate { get; set; }
        public bool? Deleted { get; set; }
        public bool? Verified { get; set; }
        public string? ProfilePicture { get; set; }

        [NotMapped]
        public IFormFile Image { get; set; }
    }
}
