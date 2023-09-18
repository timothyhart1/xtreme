using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Services.EventExpenses;

namespace XtremeOctaneApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventExpenseController : ControllerBase
    {
        private readonly IEventExpenseService _eventExpenseService;

        public EventExpenseController(IEventExpenseService eventExpenseService)
        {
            _eventExpenseService = eventExpenseService;
        }

        // Get all expenses of an event.
        [HttpGet("GetEventExpenses/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpenses(int id)
        {
            return await _eventExpenseService.GetEventExpenses(id);
        }

        // Get all categories.
        [HttpGet("GetAllCategories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCategories()
        {
            return await _eventExpenseService.GetAllCategories();
        }

        // Get a single event expense.
        [HttpGet("GetExpenseSingle/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpenseById(int id)
        {
            return await _eventExpenseService.GetEventExpenseById(id);
        }

        // Get total amount of expenses for an event.
        [HttpGet("EventExpenseTotal/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpensesTotal(int id)
        {
            return await _eventExpenseService.GetEventExpensesTotal(id);
        }

        // Add an expense for an event.
        [HttpPost("AddNewEventExpense")]
        [AllowAnonymous]
        public async Task<ActionResult<EventExpenseModel>> AddEventExpense([FromBody] EventExpenseModel model)
        {
            return await _eventExpenseService.AddEventExpense(model);
        }

        // Add a category.
        [HttpPost("AddCategory")]
        [AllowAnonymous]
        public async Task<ActionResult<ExpenseCategory>> AddExpenseCategory([FromBody] ExpenseCategory model)
        {
            return await _eventExpenseService.AddExpenseCategory(model);
        }

        // Edit an event expense.
        [HttpPut("EditEventExpense/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> EditEventExpense(int id, [FromBody] EventExpenseModel model)
        {
            return await _eventExpenseService.EditEventExpense(id, model);
        }

        // Delete an event expense
        [HttpDelete("DeleteExpense/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteEventExpense(int id)
        {
            return await _eventExpenseService.DeleteEventExpense(id);
        }
    }
}
