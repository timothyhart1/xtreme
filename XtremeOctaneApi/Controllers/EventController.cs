using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;
using XtremeOctaneApi.Services.EventService;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<EventController> _logger;
        private readonly IEventService _eventService;

        public EventController(ILogger<EventController> logger, IEventService eventService)
        {
            _logger = logger;
            _eventService = eventService;
        }

        [HttpGet("GetAllEvents")]
        [Authorize]
        public async Task<IActionResult> GetAllEvents()
        {
            try
            {
                var events = await _eventService.GetAllEvents();

                if (events == null || !events.Any())
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

        [HttpGet("GetSingleEvent/{id}")]
        [Authorize]
        public async Task<IActionResult> GetEventById(int id)
        {
            try
            {
                var xtremeEvent = await _eventService.GetEventById(id);

                if (xtremeEvent == null)
                {
                    return NotFound();
                }

                return Ok(xtremeEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the event with ID {id}", id);
                return StatusCode(500, $"An error occurred while fetching the event with ID {id}");
            }
        }

        [HttpGet("GetEventImage/{id}")]
        [Authorize]
        public IActionResult GetEventImage(int id)
        {
            try
            {
                var xtremeEvent = _eventService.GetEventById(id).Result;

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
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the event image for ID {id}", id);
                return StatusCode(500, $"An error occurred while fetching the event image for ID {id}");
            }
        }

        [HttpPost("AddNewEvent")]
        [Authorize]
        public async Task<IActionResult> AddEvent(IFormFile image, string eventName, string eventDesc)
        {
            try
            {
                var eventId = await _eventService.AddEvent(image, eventName, eventDesc);
                if (eventId == 0)
                {
                    return StatusCode(500, "Failed to add event.");
                }

                return Ok(eventId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the event");
                return StatusCode(500, "An error occurred while posting the event");
            }
        }

        [HttpPut("EditEvent/{id}")]
        [Authorize]
        public async Task<IActionResult> EditEvent(int id, IFormFile eventImage, string eventName, string eventDesc, DateTime eventDate, bool deleted)
        {
            try
            {
                var success = await _eventService.EditEvent(id, eventImage, eventName, eventDesc, eventDate, deleted);
                if (success)
                {
                    return Ok(id);
                }
                else
                {
                    return NotFound($"Could not find the event with the id {id}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the event");
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteEvent/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                var success = await _eventService.DeleteEvent(id);
                if (success)
                {
                    return Ok();
                }
                else
                {
                    return NotFound($"No event was found with the id {id}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
