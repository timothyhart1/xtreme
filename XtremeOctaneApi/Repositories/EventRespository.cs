using XtremeOctaneApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using XtremeOctaneApi.Data;

namespace XtremeOctaneApi.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _db;

        public EventRepository(DataContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<EventModel>> GetAllEvents()
        {
            return await _db.Event.Where(e => e.Deleted != true).ToListAsync();
        }

        public async Task<EventModel> GetEventById(int id)
        {
            return await _db.Event.FirstOrDefaultAsync(e => e.EventId == id);
        }

        public async Task<int> AddEvent(EventModel eventModel)
        {
            _db.Event.Add(eventModel);
            await _db.SaveChangesAsync();
            return eventModel.EventId;
        }

        public async Task<bool> UpdateEvent(EventModel eventModel)
        {
            _db.Entry(eventModel).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEvent(int id)
        {
            var eventModel = await _db.Event.FindAsync(id);
            if (eventModel == null)
            {
                return false;
            }

            eventModel.Deleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
