using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Controllers
{
    public class EventExpenseController : ControllerBase
    {
        private readonly ILogger<EventController> _logger;
        private readonly DataContext _db;
        public EventExpenseController(DataContext db, ILogger<EventController> logger) 
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet("EventExpenses/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpenses(int id)
        {
            try
            {
                var eventExpenses = await _db.EventExpenses.Where(e => e.EventId == id)
                    .OrderBy(e => e.ExpenseAmount)
                    .ToListAsync();
                return Ok(eventExpenses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost("AddEvent")]
        [AllowAnonymous]
        public async Task<ActionResult<EventExpenses>> AddEventExpense (EventExpenses expenseModel)
        {
            try
            {
                var eventExpense = new EventExpenses
                {
                    EventId = expenseModel.EventId,
                    ExpenseName = expenseModel.ExpenseName,
                    ExpenseAmount = expenseModel.ExpenseAmount,
                    AddedBy = expenseModel.AddedBy,
                    CreateDate = DateTime.Now,
                };

                await _db.EventExpenses.AddAsync(eventExpense);
                await _db.SaveChangesAsync();

                return Ok(eventExpense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the event");
                return StatusCode(500, "An error occurred while posting the event");
            }
        }
    }
}
