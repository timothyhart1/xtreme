using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string Token { get; set; } = string.Empty;
        public int? MemberId { get; set; }
    }
}
