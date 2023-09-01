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

        // Get all expenses of an event.
        [HttpGet("EventExpense/GetEventExpenses/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEventExpenses(int id)
        {
            try
            {
                var eventExpenses = await _db.EventExpenses.Where(e => e.EventId == id)
                    .Where(e => e.Active == true)
                    .OrderBy(e => e.ExpenseAmount)
                    .ToListAsync();
                return Ok(eventExpenses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // Get a single event expense.
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

        // Get total amount of expenses for an event.
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

        // Add an expense for an event.
        [HttpPost, Route("EventExpense/AddNewEventExpense")]
        [AllowAnonymous]
        public async Task<ActionResult<EventExpenseModel>> AddEventExpense ([FromBody] EventExpenseModel model)
        {
            try
            {
                var eventExpenses = new EventExpenseModel
                {
                    EventId = model.EventId,
                    ExpenseName = model.ExpenseName,
                    ExpenseAmount = model.ExpenseAmount,
                    AddedBy = model.AddedBy,
                    CreateDate = DateTime.Now,
                    Category = model.Category,
                };

                await _db.EventExpenses.AddAsync(eventExpenses);
                await _db.SaveChangesAsync();

                return Ok(eventExpenses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the event expense.");
                return StatusCode(500, "An error occurred while posting the event expense");
            }
        }

        // Edit an event expense.
        [HttpPut("EventExpense/EditEventExpense/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> EditEventExpense(int id, [FromBody] EventExpenseModel model)
        {
            try
            {
                var eventExpense = await _db.EventExpenses.FirstOrDefaultAsync(e => e.EventExpenseId == id);

                if (eventExpense != null)
                {
                    var previousEventExpense = new EventExpenseModel
                    {
                        EventId = eventExpense.EventId,
                        ExpenseName = eventExpense.ExpenseName,
                        ExpenseAmount = eventExpense.ExpenseAmount,
                        AddedBy = eventExpense.AddedBy,
                    };

                    eventExpense.EventId = model.EventId;
                    eventExpense.ExpenseName = model.ExpenseName;
                    eventExpense.ExpenseAmount = model.ExpenseAmount;
                    eventExpense.AddedBy = model.AddedBy;

                    await _db.SaveChangesAsync();

                    var editLog = new EventExpenseEditLog
                    {
                        EventExpenseId = id,
                        EditedAt = DateTime.UtcNow,
                        MemberId = model.MemberId ?? 0, 
                        PreviousValue = previousEventExpense.ExpenseAmount.ToString(),
                        NewValue = model.ExpenseAmount.ToString(),
                        PreviousExpenseName = previousEventExpense.ExpenseName,
                        NewExpenseName = model.ExpenseName,
                    };

                    _db.EventExpenseEditLog.Add(editLog);
                    await _db.SaveChangesAsync();
                }

                return Ok(eventExpense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the event expense.");
                return BadRequest(ex.Message);
            }
        }


        // Delete an event expense
        [HttpDelete("EventExpense/DeleteExpense/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteEventExpense(int id, [FromBody] EventExpenseModel model)
        {
            try
            {
                var eventExpense = await _db.EventExpenses.FirstOrDefaultAsync(e => e.EventExpenseId == id);

                if (eventExpense == null)
                {
                    return BadRequest("No event expense was found with a matching ID!");
                }

                var previousEventExpense = new EventExpenseModel
                {
                    EventId = eventExpense.EventId,
                    ExpenseName = eventExpense.ExpenseName,
                    ExpenseAmount = eventExpense.ExpenseAmount,
                    AddedBy = eventExpense.AddedBy,
                };

                eventExpense.Active = false;

                await _db.SaveChangesAsync();

                var editLog = new EventExpenseEditLog
                {
                    EventExpenseId = id,
                    EditedAt = DateTime.UtcNow,
                    MemberId = model.MemberId ?? 0,
                    PreviousValue = previousEventExpense.ExpenseAmount.ToString(),
                    NewValue = "Deleted",
                    PreviousExpenseName = previousEventExpense.ExpenseName,
                    NewExpenseName = model.ExpenseName,
                };

                _db.EventExpenseEditLog.Add(editLog);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the event expense.");
            }
        }

    }
}
