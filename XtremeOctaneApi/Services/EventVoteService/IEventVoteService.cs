using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventVoteService
{
    public interface IEventVoteService
    {
        Task<VoteResultsModel> GetEventVotes(int id);
        Task<List<EventVoteModel>> GetEventVotes(int id, int memberId);
        object GetVotesForEvent(int id);
        Task<EventVoteModel> AddEventVote(int id, EventVoteModel eventVote);
    }
}