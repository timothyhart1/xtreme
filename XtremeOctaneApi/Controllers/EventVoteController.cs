using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Dtos;
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
        
        // Get all votes for an event.
        [HttpGet("GetEventVotes/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<VoteResultsModel>> GetEventVotes(int id)
        {
            try
            {
                var voteResults = await _db.EventVote
                    .Where(ev => ev.EventId == id)
                    .GroupBy(ev => ev.EventId)
                    .Select(g => new VoteResultsModel
                    {
                        EventId = g.Key,
                        TotalVotes = g.Count(),
                        YesVotes = g.Count(ev => ev.Vote == "yes"),
                        NoVotes = g.Count(ev => ev.Vote == "no"),
                        MaybeVotes = g.Count(ev => ev.Vote == "maybe"),
                        YesPercentage = Math.Round((double)g.Count(ev => ev.Vote == "yes") / g.Count() * 100, 2),
                        NoPercentage = Math.Round((double)g.Count(ev => ev.Vote == "no") / g.Count() * 100, 2),
                        MaybePercentage = Math.Round((double)g.Count(ev => ev.Vote == "maybe") / g.Count() * 100, 2)
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
        
        // Get votes made by a member
        [HttpGet("MemberEventVote/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<EventVoteModel>>> GetEventVotes(int id, int memberId)
        {
            try
            {
                var voteResults = await _db.EventVote
                    .Where(ev => ev.EventId == id && ev.MemberId == memberId)
                    .ToListAsync();

                return Ok(voteResults);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while fetching the event with ID {id}");
                return StatusCode(500, "An error occurred while fetching the event with ID");
            }
        }

        // Get votes + details of member who voted.
        [HttpGet("GetMemberVoteDetails/{id}")]
        public ActionResult<object> GetVotesForEvent(int id)
        {
            var eventDetails = _db.Event.FirstOrDefault(e => e.EventId == id);
            if (eventDetails == null)
            {
                return NotFound(); // Event not found
            }

            var voteDetails = from ev in _db.EventVote
                              join m in _db.Member on ev.MemberId equals m.MemberId
                              where ev.EventId == id
                              select new
                              {
                                  MemberName = m.Name,
                                  MemberSurname = m.Surname,
                                  MemberCity = m.City,
                                  MemberId = m.MemberId,
                                  Vote = ev.Vote,
                                  VoteDate = ev.VoteDate
                              };

            return Ok(voteDetails);
        }

        // Add a new vote for an event.
        [HttpPost("AddEventVote/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<EventModel>> AddEventVote(int id, EventVoteModel eventVote)
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

                var newEventVote = new EventVoteModel
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
