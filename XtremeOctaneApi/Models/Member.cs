using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    [Table("Member")]
    public class Member
    {
        [Key]
        public int MemberId { get; set; }
        public string Email { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? City { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public DateTime CreateDate { get; set; }
        public Boolean? Deleted { get; set; }
    }
}
