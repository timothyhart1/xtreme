using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<EventModel>> GetAllEvents();
        Task<EventModel> GetEventById(int id);
        Task<int> AddEvent(EventModel eventModel);
        Task<bool> UpdateEvent(EventModel eventModel);
        Task<bool> DeleteEvent(int id);
    }
}
