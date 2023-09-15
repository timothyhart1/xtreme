using System.ComponentModel.DataAnnotations;

namespace XtremeOctaneApi.Models
{
    public class ExpenseCategory
    {
        [Key]
        public int ExpenseCategoryId { get; set; }
        public string Category { get; set;} = string.Empty;
    }
}
