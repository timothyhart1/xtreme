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

        [ForeignKey(nameof(MemberId))]
        public MemberModel? Member { get; set; }
    }
}
