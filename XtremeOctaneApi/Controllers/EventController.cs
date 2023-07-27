using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.StaticFiles;
using XtremeOctaneApi.Data;
using Microsoft.Extensions.Logging; 


namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<EventController> _logger;
        private readonly DataContext _db;

        public EventController(DataContext db, ILogger<EventController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // Get all events.
        [HttpGet("GetAllEvents")]
        public async Task<IActionResult> GetAllEvents()
        {
            try
            {
                var events = await _db.Event.Where(e => e.Deleted != true).ToListAsync();

                if (events == null)
                {
                    return NotFound("No events are available!");
                }
                return Ok(events);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the events");
                return StatusCode(500, "An error occurred while fetching the events");
            }
        }

        // Get a single event.
        [HttpGet("GetSingleEvent/{id}")]
        public async Task<ActionResult<EventModel>> GetEventById(int id)
        {
            try
            {
                var xtremeEvent = await _db.Event.SingleOrDefaultAsync(e => e.EventId == id);

                if (xtremeEvent == null)
                {
                    return NotFound();
                }
                return xtremeEvent;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the event with ID {id}", id);
                return StatusCode(500, "An error occurred while fetching the event with ID {id}");
            }
        }

        // Get the image for a single event.
        [HttpGet("GetEventImage/{id}")]
        [AllowAnonymous]
        public IActionResult GetEventImage(int id)
        {
            var xtremeEvent = _db.Event.FirstOrDefault(e => e.EventId == id);

            if (xtremeEvent == null)
            {
                return NotFound("Event not found.");
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Events", xtremeEvent.EventImage);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image not found.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "image/jpeg");
        }

        // Add a new event.
        [HttpPost("AddNewEvent")]
        [AllowAnonymous]
        public async Task<ActionResult<EventModel>> AddEvent(IFormFile image, string eventName, string eventDesc)
        {
            try
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                string uploadfilepath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Events", fileName);

                using (var fileStream = new FileStream(uploadfilepath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                };

                var xtremeEvent = new EventModel
                {
                    EventName = eventName,
                    EventDesc = eventDesc,
                    EventDate = DateTime.Now,
                    EventImage = fileName,
                    Deleted = false
                };

                await _db.Event.AddAsync(xtremeEvent);
                await _db.SaveChangesAsync();
                return Ok(xtremeEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the event");
                return StatusCode(500, "An error occurred while posting the event");
            }
        }

        // Edit an event.
        [HttpPut("EditEvent/{id}")]
        public async Task<IActionResult> EditEvent(int id, IFormFile eventImage, string eventName, string eventDesc, DateTime eventDate, bool deleted)
        {
            try
            {
                var xtremeEvent = _db.Event.FirstOrDefault(e => e.EventId == id);

                if (xtremeEvent != null)
                {
                    if (eventImage != null)
                    {
                        string fileName = Guid.NewGuid() + Path.GetExtension(eventImage.FileName);
                        string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Events", fileName);

                        using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
                        {
                            await eventImage.CopyToAsync(fileStream);
                            await fileStream.FlushAsync();
                        }

                        xtremeEvent.EventImage = fileName;
                    }

                    xtremeEvent.EventName = eventName;
                    xtremeEvent.EventDesc = eventDesc;
                    xtremeEvent.EventDate = DateTime.Now;
                    xtremeEvent.Deleted = false;

                    _db.SaveChanges();

                    return Ok(xtremeEvent.EventId);
                }

                return NotFound($"Could not find the event with the id {id}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the event");
                return BadRequest(ex.Message);
            }
        }
        
        // Delete an event.
        [HttpDelete("DeleteEvent/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                var xtremeEvent = await _db.Event.FindAsync(id);

                if (xtremeEvent == null)
                {
                    return NotFound($"No event was found with the id {id}");
                }

                xtremeEvent.Deleted = true;
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
};



