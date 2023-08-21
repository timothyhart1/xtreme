using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class EventExpenseModel
    {
        [Key]
        public int EventExpenseId { get; set; }
        public int EventId { get; set; }
        public string ExpenseName { get; set; } = string.Empty;
        public decimal ExpenseAmount { get; set; }
        public string AddedBy { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public int? MemberId { get; set; }
        public string? Category { get; set; } 
    }
}
