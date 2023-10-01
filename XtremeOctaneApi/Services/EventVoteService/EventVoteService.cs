using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventVoteService
{
    public class EventVoteService : IEventVoteService
    {
        private readonly ILogger<EventVoteService> _logger;
        private readonly DataContext _db;

        public EventVoteService(DataContext db, ILogger<EventVoteService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<VoteResultsModel> GetEventVotes(int id)
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

                return voteResults;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the event with ID", id);
                return null; 
            }
        }

        public async Task<List<EventVoteModel>> GetEventVotes(int id, int memberId)
        {
            try
            {
                var voteResults = await _db.EventVote
                    .Where(ev => ev.EventId == id && ev.MemberId == memberId)
                    .ToListAsync();

                return voteResults;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while fetching the event with ID {id}");
                return null;
            }
        }

        public object GetVotesForEvent(int id)
        {
            var eventDetails = _db.Event.FirstOrDefault(e => e.EventId == id);
            if (eventDetails == null)
            {
                return null; 
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

            return voteDetails.ToList();
        }

        public async Task<EventVoteModel> AddEventVote(int id, EventVoteModel eventVote)
        {
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

                return newEventVote;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the event");
                return null;
            }
        }
    }
}