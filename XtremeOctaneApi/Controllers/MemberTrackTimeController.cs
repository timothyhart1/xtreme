using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using static System.Net.Mime.MediaTypeNames;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberTrackTimeController : Controller
    {
        private readonly ILogger<MemberTrackTimeController> _logger;
        private readonly DataContext _db;

        public MemberTrackTimeController(DataContext db, ILogger<MemberTrackTimeController> logger)
        {
            _db = db;
            _logger = logger;
        }


        // Get all track times.
        [HttpGet("GetAllTrackTimes")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<MemberTrackTimeModel>> GetAllTrackTimes()
        {
            try
            {
                List<MemberTrackTimeModel> trackTimes = _db.MemberTrackTime
                    .Include(t => t.Vehicle)
                    .ThenInclude(m => m.Member)
                    .ToList();

                trackTimes = trackTimes.OrderBy(t => (t.LapTimeMinutes * 60) + t.LapTimeSeconds).ToList();

                return Ok(trackTimes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the lap times");
                return StatusCode(500, "An error occurred while fetching the lap times");
            }
        }

        // Add a new track time.
        [HttpPost("AddNewTrackTime")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberTrackTimeModel>> AddTrackTime(int memberId, int vehicleId, int lapTimeMinutes, int lapTimeSeconds,
            string conditions, string tyre, string vehicleClass, IFormFile lapTimeScreenshot, bool? verified)
        {
            try
            {
                string screenshotImage = $"{Guid.NewGuid()}{Path.GetExtension(lapTimeScreenshot.FileName)}";
                string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "LapTimeScreenshots", screenshotImage);

                using var stream = new FileStream(uploadFilePath, FileMode.Create);
                await lapTimeScreenshot.CopyToAsync(stream);
                await stream.FlushAsync();


                bool enteredAlready = await _db.MemberTrackTime.AnyAsync(t => t.VehicleId == vehicleId);

                if (enteredAlready)
                {
                    return BadRequest("A lap time for this vehicle already exists.");
                }

                int totalSeconds = (lapTimeMinutes * 60) + lapTimeSeconds;

                var trackTime = new MemberTrackTimeModel
                {
                    MemberId = memberId,
                    VehicleId = vehicleId,
                    LapTimeMinutes = lapTimeMinutes,
                    LapTimeSeconds = lapTimeSeconds,
                    Conditions = conditions,
                    Tyre = tyre,
                    VehicleClass = vehicleClass,
                    TrackDate = DateTime.Now,
                    LapTimeScreenshot = screenshotImage,
                    Verified = false
                };

                await _db.MemberTrackTime.AddAsync(trackTime);
                await _db.SaveChangesAsync();

                return Ok(trackTime);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the vehicle");
                return StatusCode(500, "An error occurred while posting the lap time");
            }
        }

        // Delete a track time
        [HttpDelete("DeleteTrackTime/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteTrackTime(int id)
        {
            try
            {
                var laptime = await _db.MemberTrackTime.FindAsync(id);

                if(laptime == null)
                {
                    return BadRequest($"No laptime was found with the id {id}");
                }

                _db.MemberTrackTime.Remove(laptime);
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
