using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventVoteController : ControllerBase
    {
        private readonly ILogger<EventVoteController> _logger;
        private readonly DataContext _db;

        public EventVoteController(DataContext db, ILogger<EventVoteController> logger)
        {
            _db = db;
            _logger = logger;

        }

        [HttpGet("EventVotes/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<VoteResults>> GetEventVotes(int id)
        {
            try
            {
                var voteResults = await _db.EventVote
                    .Where(ev => ev.EventId == id)
                    .GroupBy(ev => ev.EventId)
                    .Select(g => new VoteResults
                    {
                        EventId = g.Key,
                        TotalVotes = g.Count(),
                        YesVotes = g.Count(ev => ev.Vote == "yes"),
                        NoVotes = g.Count(ev => ev.Vote == "no"),
                        MaybeVotes = g.Count(ev => ev.Vote == "maybe")
                    })
                    .SingleOrDefaultAsync();

                return Ok(voteResults);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the event with ID", id);
                return StatusCode(500, "An error occurred while fetching the event with ID");
            }
        }



        [HttpPost("Add-Event-Vote/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Event>> AddEventVote(int id, EventVote eventVote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingVote = await _db.EventVote.FirstOrDefaultAsync(ev => ev.EventId == id && ev.MemberId == eventVote.MemberId);

                if (existingVote != null)
                {
                    _db.EventVote.Remove(existingVote);
                }

                var newEventVote = new EventVote
                {
                    EventId = id,
                    MemberId = eventVote.MemberId,
                    Vote = eventVote.Vote,
                    VoteDate = DateTime.Now
                };

                await _db.EventVote.AddAsync(newEventVote);
                await _db.SaveChangesAsync();

                return Ok(newEventVote);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the event");
                return StatusCode(500, "An error occurred while posting the event");
            }
        }

    }
}
