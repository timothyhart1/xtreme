using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    public class MemberTrackTimeModel
    {
        [Key]
        public int MemberTrackTimeId { get; set; }
        public int MemberId { get; set; }
        public int VehicleId { get; set; }
        public int LapTimeMinutes { get; set; }
        public int LapTimeSeconds { get; set; } 
        public string Conditions { get; set; }
        public string Tyre { get; set; }
        public string VehicleClass { get; set; }
        public DateTime TrackDate { get; set; }
        public string? LapTimeScreenshot { get; set; }
        public bool? Verified { get; set; }

        [ForeignKey(nameof(VehicleId))]
        public VehicleModel? Vehicle { get; set; }
    }
}
