﻿using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.EventService
{
    public interface IEventService
    {
        Task<List<EventModel>> GetAllEvents();
        Task<EventModel> GetEventById(int id);

        Task<int> AddEvent(IFormFile image, string eventName, string eventDesc, DateTime eventDate,
            string startDestination, string endDestination);
        Task<bool> EditEvent(int id, IFormFile eventImage, string eventName, string eventDesc, DateTime eventDate, bool deleted);
        Task<bool> DeleteEvent(int id);
        Task<bool> RestoreEvent(int id);
    }
}
