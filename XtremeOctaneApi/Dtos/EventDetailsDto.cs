namespace XtremeOctaneApi.Dtos
{
    public class EventDetailsDto
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string StartDestination { get; set; }
        public string EndingDestination { get; set; }
        public string EventDesc { get; set; }
        public DateTime EventDate { get; set; }
        public string EventImage { get; set; }
        public Boolean? Deleted { get; set; }
    }
}
