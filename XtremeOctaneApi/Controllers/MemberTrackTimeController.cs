using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Services.MemberTrackTimeService;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberTrackTimeController : Controller
    {
        private readonly ILogger<MemberTrackTimeController> _logger;
        private readonly DataContext _db;
        private readonly IMemberTrackTimeService _memberTrackTimeService;

        public MemberTrackTimeController(DataContext db, ILogger<MemberTrackTimeController> logger, 
            IMemberTrackTimeService memberTrackTimeService)
        {
            _db = db;
            _logger = logger;
            _memberTrackTimeService = memberTrackTimeService;
        }
        
        // Get all lap times
        [HttpGet, Route("GetAllTrackTimes")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<MemberTrackTimeModel>> GetAllTrackTimes()
        {
            try
            {
                var trackTimes = _memberTrackTimeService.GetAllTrackTimes();
                return Ok(trackTimes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while getting lap times, {ex}");
            }

        }

        // Verify lap time
        [HttpPut, Route("VerifyLaptime/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberTrackTimeModel>> VerifyLaptime(int id)
        {
            try
            {
                var trackTime = await _memberTrackTimeService.VerifyLaptime(id);
                return Ok(trackTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while verifying the lap time, {ex}");
            }
        }

        // Add lap time
        [HttpPost, Route("AddNewTrackTime")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberTrackTimeModel>> AddNewTrackTime(
            int memberId,
            int vehicleId,
            int lapTimeMinutes,
            int lapTimeSeconds,
            int lapTimeMilliseconds,
            string conditions,
            string tyre,
            string vehicleClass,
            IFormFile lapTimeScreenshot,
            bool? verified)
        {
            try
            {
                var trackTime = await _memberTrackTimeService.AddTrackTime(
                    memberId,
                    vehicleId,
                    lapTimeMinutes,
                    lapTimeSeconds,
                    lapTimeMilliseconds,
                    conditions,
                    tyre,
                    vehicleClass,
                    lapTimeScreenshot,
                    verified
                );

                return Ok(trackTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while posting the lap time, {ex}");
            }
        }
        
        // Delete lap time
        [HttpDelete, Route("DeleteTrackTime/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteTrackTime(int id)
        {
            try
            {
                bool isDeleted = await _memberTrackTimeService.DeleteTrackTime(id);

                if (!isDeleted)
                {
                    return BadRequest($"No laptime was found with the id {id}");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting the lap time");
            }
        }
    }
}
