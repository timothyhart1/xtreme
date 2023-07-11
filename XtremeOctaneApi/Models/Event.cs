using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    [Table("Event")]
    public class Event
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string EventDesc { get; set; }
        public DateTime EventDate { get; set; }
        public string EventImage { get; set; }
        public Boolean? Deleted { get; set; }
    }
};