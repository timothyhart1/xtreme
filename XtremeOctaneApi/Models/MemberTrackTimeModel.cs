using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class MemberTrackTimeModel
    {
        [Key]
        public int MemberTrackTimeId { get; set; }
        public int MemberId { get; set; }
        public int VehicleId { get; set; }
        public TimeSpan LapTime { get; set; }
        public string Conditions { get; set; }
        public string Tyre { get; set; }
        public string VehicleClass { get; set; }
        public DateTime TrackDate { get; set; }
    }
}
