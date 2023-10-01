using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
namespace XtremeOctaneApi.Services.MemberTrackTimeService
{
    public class MemberTrackTimeService : IMemberTrackTimeService
    {
        private readonly DataContext _db;

        public MemberTrackTimeService(DataContext db)
        {
            _db = db;
        }
        
        // Get all lap times
        public IEnumerable<MemberTrackTimeModel> GetAllTrackTimes()
        {
            try
            {
                List<MemberTrackTimeModel> trackTimes = _db.MemberTrackTime
                    .Include(t => t.Vehicle)
                    .ThenInclude(m => m.Member)
                    .ToList();

                trackTimes = trackTimes.OrderBy(t => (t.LapTimeMinutes * 60) + t.LapTimeSeconds + t.LapTimeMiliseconds).ToList();

                return trackTimes;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while fetching the lap times", ex);
            }
        }
        
        // Verify lap time
        public async Task<MemberTrackTimeModel> VerifyLaptime(int id)
        {
            try
            {
                var trackTime = await _db.MemberTrackTime.FindAsync(id);

                if (trackTime == null)
                {
                    throw new KeyNotFoundException($"Laptime with {id} does not exist.");
                }

                trackTime.Verified = true;
                _db.Entry(trackTime).State = EntityState.Modified;
                await _db.SaveChangesAsync();

                return trackTime;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while verifying the lap time", ex);
            }
        }
        
        // Add lap time
        public async Task<MemberTrackTimeModel> AddTrackTime(int memberId, int vehicleId, int lapTimeMinutes, int lapTimeSeconds,
            int lapTimeMiliSeconds, string conditions, string tyre, string vehicleClass, IFormFile lapTimeScreenshot, bool? verified)
        {
            try
            {
                string screenshotImage = $"{Guid.NewGuid()}{Path.GetExtension(lapTimeScreenshot.FileName)}";
                string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "LapTimeScreenshots", screenshotImage);

                using var stream = new FileStream(uploadFilePath, FileMode.Create);
                await lapTimeScreenshot.CopyToAsync(stream);
                await stream.FlushAsync();

                bool enteredAlready = await _db.MemberTrackTime.AnyAsync(t => t.VehicleId == vehicleId);

                if (enteredAlready)
                {
                    throw new InvalidOperationException("A lap time for this vehicle already exists.");
                }
                
                var trackTime = new MemberTrackTimeModel
                {
                    MemberId = memberId,
                    VehicleId = vehicleId,
                    LapTimeMinutes = lapTimeMinutes,
                    LapTimeSeconds = lapTimeSeconds,
                    LapTimeMiliseconds = lapTimeMiliSeconds,
                    Conditions = conditions,
                    Tyre = tyre,
                    VehicleClass = vehicleClass,
                    TrackDate = DateTime.Now,
                    LapTimeScreenshot = screenshotImage,
                    Verified = verified ?? false
                };

                await _db.MemberTrackTime.AddAsync(trackTime);
                await _db.SaveChangesAsync();

                return trackTime;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while posting the lap time", ex);
            }
        }
        
        // Delete lap time
        public async Task<bool> DeleteTrackTime(int id)
        {
            try
            {
                var laptime = await _db.MemberTrackTime.FindAsync(id);

                if (laptime == null)
                {
                    return false; 
                }

                _db.MemberTrackTime.Remove(laptime);
                await _db.SaveChangesAsync();

                return true; 
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while deleting the lap time", ex);
            }
        }
    }
}
