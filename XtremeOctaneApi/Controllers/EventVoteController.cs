using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Services.EventVoteService;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventVoteController : ControllerBase
    {
        private readonly ILogger<EventVoteController> _logger;
        private readonly IEventVoteService _eventVoteService;

        public EventVoteController(IEventVoteService eventVoteService, ILogger<EventVoteController> logger)
        {
            _eventVoteService = eventVoteService;
            _logger = logger;
        }

        // Get all votes for an event.
        [HttpGet("GetEventVotes/{id}")]
        [Authorize]
        public async Task<ActionResult<VoteResultsModel>> GetEventVotes(int id)
        {
            try
            {
                var voteResults = await _eventVoteService.GetEventVotes(id);
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
        [Authorize]
        public async Task<ActionResult<List<EventVoteModel>>> GetEventVotes(int id, int memberId)
        {
            try
            {
                var voteResults = await _eventVoteService.GetEventVotes(id, memberId);
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
        [Authorize]
        public ActionResult<object> GetVotesForEvent(int id)
        {
            try
            {
                var voteDetails = _eventVoteService.GetVotesForEvent(id);
                return Ok(voteDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while fetching the event with ID {id}");
                return StatusCode(500, "An error occurred while fetching the event with ID");
            }
        }

        // Add a new vote for an event.
        [HttpPost("AddEventVote/{id}")]
        [Authorize]
        public async Task<ActionResult<EventModel>> AddEventVote(int id, EventVoteModel eventVote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newEventVote = await _eventVoteService.AddEventVote(id, eventVote);
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