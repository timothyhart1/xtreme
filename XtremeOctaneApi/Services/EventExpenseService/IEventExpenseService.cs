using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventExpenses
{
    public interface IEventExpenseService
    {
        Task<IActionResult> GetEventExpenses(int id);
        Task<IActionResult> GetAllCategories();
        Task<IActionResult> GetEventExpenseById(int id);
        Task<IActionResult> GetEventExpensesTotal(int id);
        Task<ActionResult<EventExpenseModel>> AddEventExpense(EventExpenseModel model);
        Task<ActionResult<ExpenseCategory>> AddExpenseCategory(ExpenseCategory model);
        Task<IActionResult> EditEventExpense(int id, EventExpenseModel model);
        Task<IActionResult> DeleteEventExpense(int id);
    }
}
