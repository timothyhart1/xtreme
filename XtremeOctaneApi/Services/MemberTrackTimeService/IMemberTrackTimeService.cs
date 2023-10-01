using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.MemberTrackTimeService
{
    public interface IMemberTrackTimeService
    {
        IEnumerable<MemberTrackTimeModel> GetAllTrackTimes();
        Task<MemberTrackTimeModel> VerifyLaptime(int id);
        Task<MemberTrackTimeModel> AddTrackTime(int memberId, int vehicleId, int lapTimeMinutes, int lapTimeSeconds,
            int lapTimeMiliSeconds, string conditions, string tyre, string vehicleClass, IFormFile lapTimeScreenshot, bool? verified);
        Task<bool> DeleteTrackTime(int id);
    }
}
