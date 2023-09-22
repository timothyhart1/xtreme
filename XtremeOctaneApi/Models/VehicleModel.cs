using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    public class VehicleModel
    {
        [Key]
        public int VehicleId { get; set; }
        public int MemberId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public int Mileage { get; set; }
        public string Plate { get; set; }
        public string Color { get; set; }
        public string? VehicleImage { get; set; }
        public bool? HasImage { get; set; }

        [ForeignKey(nameof(MemberId))]
        public MemberModel? Member { get; set; }

        [NotMapped] // This property is not mapped to the database
        public IFormFile Image { get; set; }
    }
}
