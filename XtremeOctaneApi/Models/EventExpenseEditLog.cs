using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class EventExpenseEditLog
    {
        [Key]
        public int LogId { get; set; }
        public int EventExpenseId { get; set; }
        public DateTime EditedAt { get; set; }
        public int MemberId { get; set; }
        public string? PreviousValue { get; set; } = string.Empty;
        public string? NewValue { get; set; } = string.Empty;
        public string PreviousExpenseName { get; set; } = string.Empty;
        public string NewExpenseName { get; set; } = string.Empty;
    }
}
