using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class EventVoteModel
    {
        [Key]
        public int EventVoteId { get; set; }
        public int EventId { get; set; }
        public int MemberId { get; set; }
        public string Vote { get; set; }
        public DateTime VoteDate { get; set; }
    }
}
