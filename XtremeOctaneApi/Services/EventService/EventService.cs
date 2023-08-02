using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Repositories;

namespace XtremeOctaneApi.Services.EventService
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<EventModel>> GetAllEvents()
        {
            return await _eventRepository.GetAllEvents();
        }

        public async Task<EventModel> GetEventById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }

        public async Task<int> AddEvent(IFormFile image, string eventName, string eventDesc)
        {
            string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Events", fileName);

            using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
            }

            var newEvent = new EventModel
            {
                EventName = eventName,
                EventDesc = eventDesc,
                EventDate = DateTime.Now,
                EventImage = fileName,
                Deleted = false
            };

            return await _eventRepository.AddEvent(newEvent);
        }

        public async Task<bool> EditEvent(int id, IFormFile eventImage, string eventName, string eventDesc, DateTime eventDate, bool deleted)
        {
            var existingEvent = await _eventRepository.GetEventById(id);
            if (existingEvent == null)
            {
                return false;
            }

            if (eventImage != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(eventImage.FileName);
                string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Events", fileName);

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

            return await _eventRepository.UpdateEvent(existingEvent);
        }

        public async Task<bool> DeleteEvent(int id)
        {
            var existingEvent = await _eventRepository.GetEventById(id);
            if (existingEvent == null)
            {
                return false;
            }

            existingEvent.Deleted = true;
            return await _eventRepository.UpdateEvent(existingEvent);
        }

        public async Task<bool> RestoreEvent(int id)
        {
            var existingEvent = await _eventRepository.GetEventById(id);
            existingEvent.Deleted = false;
            return await _eventRepository.UpdateEvent(existingEvent);
        }
    }
}
