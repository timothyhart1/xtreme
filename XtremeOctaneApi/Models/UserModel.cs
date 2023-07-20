using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    public class UserModel
    {
        public string UserId { get; set; }
        [Required]
        public string EmailAddress { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
