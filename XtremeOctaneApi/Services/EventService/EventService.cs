using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventService
{
    public class EventService : IEventService
    {
        private readonly DataContext _db;

        public EventService(DataContext db)
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

        public async Task<int> AddEvent(IFormFile image, string eventName, string eventDesc, DateTime eventDate)
        {
            string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Events", fileName);

            using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
            }

            var newEvent = new EventModel
            {
                EventName = eventName,
                EventDesc = eventDesc,
                EventDate = eventDate,
                EventImage = fileName,
                Deleted = false
            };

            _db.Event.Add(newEvent);
            await _db.SaveChangesAsync();

            return newEvent.EventId;
        }

        public async Task<bool> EditEvent(int id, IFormFile eventImage, string eventName, string eventDesc, DateTime eventDate, bool deleted)
        {
            var existingEvent = await _db.Event.FindAsync(id);
            if (existingEvent == null)
            {
                return false;
            }

            if (eventImage != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(eventImage.FileName);
                string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Events", fileName);

                using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
                {
                    await eventImage.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                }

                existingEvent.EventImage = fileName;
            }

            existingEvent.EventName = eventName;
            existingEvent.EventDesc = eventDesc;
            existingEvent.EventDate = eventDate;
            existingEvent.Deleted = deleted;

            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteEvent(int id)
        {
            var existingEvent = await _db.Event.FindAsync(id);
            if (existingEvent == null)
            {
                return false;
            }

            existingEvent.Deleted = true;
            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RestoreEvent(int id)
        {
            var existingEvent = await _db.Event.FindAsync(id);
            existingEvent.Deleted = false;
            await _db.SaveChangesAsync();

            return true;
        }
    }
}
