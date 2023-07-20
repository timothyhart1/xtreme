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

        [HttpGet("EventExpense/GetEventExpenses/{id}")]
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

        [HttpGet("EventExpense/GetExpenseSingle/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpenseById (int id)
        {
            try
            {
                var eventExpenses = await _db.EventExpenses.Where(e => e.EventExpenseId == id)
                    .SingleOrDefaultAsync();

                if(eventExpenses == null)
                {
                    return NotFound();
                }

                return Ok(eventExpenses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("EventExpense/EventExpenseTotal/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpensesTotal(int id)
        {
            try
            {
                var totalExpenses = await _db.EventExpenses
                    .Where(e => e.EventId == id)
                    .SumAsync(e => e.ExpenseAmount);

                return Ok(new { TotalExpenses = totalExpenses });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost("EventExpense/AddNewEventExpense")]
        [AllowAnonymous]

        public async Task<ActionResult<EventExpenseModel>> AddTrackTime([FromBody] EventExpenseModel model)
        {
            try
            {
                var eventExpenses = new EventExpenseModel
                {
                    EventId = model.EventId,
                    ExpenseName = model.ExpenseName,
                    ExpenseAmount = model.ExpenseAmount,
                    AddedBy = model.AddedBy,
                    CreateDate = DateTime.Now
                };

                await _db.EventExpenses.AddAsync(eventExpenses);
                await _db.SaveChangesAsync();

                return Ok(eventExpenses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the vehicle");
                return StatusCode(500, "An error occurred while posting the lap time");
            }
        }

        [HttpPut("EventExpense/EditEventExpense/{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> EditEventExpense (int id, [FromBody] EventExpenseModel model)
        {
            try
            {
                var eventExpense = await _db.EventExpenses.FirstOrDefaultAsync(e => e.EventExpenseId == id);

                if (eventExpense != null)
                {
                    eventExpense.EventId = model.EventId;
                    eventExpense.ExpenseName = model.ExpenseName;
                    eventExpense.ExpenseAmount = model.ExpenseAmount;
                    eventExpense.AddedBy = model.AddedBy;

                    _db.SaveChanges();
                }
                return Ok(eventExpense);
            } catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the expense");
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("EventExpense/DeleteExpense/{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> DeleteEvent (int id)
        {
            try
            {
                var expense = await _db.EventExpenses.FindAsync(id);

                if (expense == null)
                {
                    return BadRequest("No vehicle was found with a matching ID!");
                }

                _db.EventExpenses.Remove(expense);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the event");
            }
        }
    }
}
