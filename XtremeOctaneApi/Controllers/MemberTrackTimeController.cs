using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

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


        [HttpGet("All-Track-Times")]
        public async Task<IActionResult> GetAllVehicle()
        {
            try
            {
                var times = await _db.MemberTrackTime.OrderBy(e => e.LapTime).ToListAsync();

                if (times == null)
                {
                    return NotFound("No times are available!");
                }

                return Ok(times);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the lap times");
                return StatusCode(500, "An error occurred while fetching the lap times");
            }
        }


        [HttpPost("Add-Track-Time")]
        [AllowAnonymous]

        public async Task<ActionResult<MemberTrackTime>> AddTrackTime(MemberTrackTime model)
        {
            try
            {
                var trackTime = new MemberTrackTime
                {
                    MemberTrackTimeId = model.MemberTrackTimeId,
                    MemberId = model.MemberId,
                    VehicleId = model.VehicleId,
                    LapTime = model.LapTime,
                    Conditions = model.Conditions,
                    Tyre = model.Tyre,
                    VehicleClass = model.VehicleClass,
                    TrackDate = DateTime.Now,
                };

                await _db.MemberTrackTime.AddAsync(trackTime);
                await _db.SaveChangesAsync();

                return Ok(trackTime);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the vehicle");
                return StatusCode(500, "An error occurred while posting the lap time");
            }
        }

        [HttpDelete("Delete-Track-Time/{id}")]
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
