using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string? Email { get; set; } = String.Empty;
        public string? PasswordHash { get; set; } = String.Empty;
        public Member Member { get; set; }
    }
}
