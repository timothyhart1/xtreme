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
        public int? LapTimeMiliseconds { get; set; }
        public string Conditions { get; set; } = string.Empty;
        public string Tyre { get; set; } = string.Empty;
        public string VehicleClass { get; set; } = string.Empty;
        public DateTime TrackDate { get; set; }
        public string LapTimeScreenshot { get; set; } = string.Empty;
        public bool? Verified { get; set; }

        [ForeignKey(nameof(VehicleId))]
        public VehicleModel? Vehicle { get; set; }
    }
}
