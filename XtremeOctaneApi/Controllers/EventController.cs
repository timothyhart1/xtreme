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

        [HttpGet("All-Events")]
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

        [HttpGet("Single-Event/{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
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


        [HttpGet("Get-Event-Image/{eventId}")]
        [AllowAnonymous]
        public IActionResult GetEventImage(int eventId)
        {
            var xtremeEvent = _db.Event.FirstOrDefault(e => e.EventId == eventId);

            if (xtremeEvent == null || string.IsNullOrEmpty(xtremeEvent.EventImage))
            {
                return NotFound("Event or image not found.");
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Events", xtremeEvent.EventImage);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image file not found on the server.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "image/jpeg");
        }


        [HttpPost("Add-Event")]
        [AllowAnonymous]

        public async Task<ActionResult<Event>> AddEvent(IFormFile image, string eventName, string eventDesc)
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

                var xtremeEvent = new Event
                {
                    EventName = eventName,
                    EventDesc = eventDesc,
                    EventDate = DateTime.Now,
                    EventImage = fileName,
                    Deleted = true
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

        [HttpPut("Edit-Event/{id}")]
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

                        xtremeEvent.EventImage = fileName; // Store the file name or path in the database
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



        [HttpDelete("Delete-Event/{id}")]
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



