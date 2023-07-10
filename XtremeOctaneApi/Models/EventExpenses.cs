using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class EventExpenses
    {
        [Key]
        public int EventExpenseId { get; set; }
        public int EventId { get; set; }
        public string ExpenseName { get; set; }
        public decimal ExpenseAmount { get; set; }
        public string AddedBy { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
