using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Controllers;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventExpenses
{
    public class EventExpenseService : IEventExpenseService
    {
        private readonly ILogger<EventController> _logger;
        private readonly DataContext _db;

        public EventExpenseService(DataContext db, ILogger<EventController> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<IActionResult> GetEventExpenses(int id)
        {
            try
            {
                var eventExpenses = await _db.EventExpenses
                    .Where(e => e.EventId == id && e.Active == true)
                    .OrderBy(e => e.ExpenseAmount)
                    .ToListAsync();
                return new OkObjectResult(eventExpenses);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var eventExpenses = await _db.ExpenseCategory
                    .OrderBy(e => e.Category)
                    .ToListAsync();
                return new OkObjectResult(eventExpenses);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<IActionResult> GetEventExpenseById(int id)
        {
            try
            {
                var eventExpense = await _db.EventExpenses
                    .Where(e => e.EventExpenseId == id)
                    .SingleOrDefaultAsync();

                if (eventExpense == null)
                {
                    return new NotFoundResult();
                }

                return new OkObjectResult(eventExpense);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<IActionResult> GetEventExpensesTotal(int id)
        {
            try
            {
                var totalExpenses = await _db.EventExpenses
                    .Where(e => e.EventId == id)
                    .SumAsync(e => e.ExpenseAmount);

                return new OkObjectResult(new { TotalExpenses = totalExpenses });
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<ActionResult<EventExpenseModel>> AddEventExpense(EventExpenseModel model)
        {
            try
            {
                var eventExpense = new EventExpenseModel
                {
                    EventId = model.EventId,
                    ExpenseName = model.ExpenseName,
                    ExpenseAmount = model.ExpenseAmount,
                    AddedBy = model.AddedBy,
                    CreateDate = DateTime.Now,
                    Category = model.Category,
                    Active = true
                };

                await _db.EventExpenses.AddAsync(eventExpense);
                await _db.SaveChangesAsync();

                return new OkObjectResult(eventExpense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the event expense.");
                return new ObjectResult("An error occurred while posting the event expense") { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<ActionResult<ExpenseCategory>> AddExpenseCategory(ExpenseCategory model)
        {
            try
            {
                var category = new ExpenseCategory
                {
                    ExpenseCategoryId = model.ExpenseCategoryId,
                    Category = model.Category,
                };

                await _db.ExpenseCategory.AddAsync(category);
                await _db.SaveChangesAsync();

                return new OkObjectResult(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the category.");
                return new ObjectResult("An error occurred while adding the category") { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }

        public async Task<IActionResult> EditEventExpense(int id, EventExpenseModel model)
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

                return new OkObjectResult(eventExpense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the event expense.");
                return new BadRequestObjectResult(ex.Message);
            }
        }

        public async Task<IActionResult> DeleteEventExpense(int id)
        {
            try
            {
                var eventExpense = await _db.EventExpenses.FirstOrDefaultAsync(e => e.EventExpenseId == id);

                if (eventExpense == null)
                {
                    return new BadRequestObjectResult("No event expense was found with a matching ID!");
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
                    MemberId = 4,
                    PreviousValue = previousEventExpense.ExpenseAmount.ToString(),
                    NewValue = "Deleted",
                    PreviousExpenseName = previousEventExpense.ExpenseName,
                    NewExpenseName = "Deleted",
                };

                _db.EventExpenseEditLog.Add(editLog);
                await _db.SaveChangesAsync();
                return new OkResult();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ObjectResult("An error occurred while deleting the event expense.") { StatusCode = StatusCodes.Status500InternalServerError };
            }
        }
    }
}
