namespace XtremeOctaneApi.Models
{
    public class VoteResults
    {
        public int EventId { get; set; }
        public int TotalVotes { get; set; }
        public int YesVotes { get; set; }
        public int NoVotes { get; set; }
        public int MaybeVotes { get; set; }
        public double YesPercentage { get; set; }
        public double NoPercentage { get; set; }
        public double MaybePercentage { get; set; }
    }
}
