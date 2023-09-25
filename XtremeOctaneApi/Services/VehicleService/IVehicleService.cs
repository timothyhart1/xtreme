using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Services.Vehicle
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleModel>> GetAllVehicles();
        Task<VehicleModel> GetVehicle(int id);
        Task<IEnumerable<VehicleModel>> GetVehiclesByMember(int memberId);
        Task<byte[]> GetVehicleImage(int id);
        Task EditVehicle(int id, VehicleModel vehicleModel, IFormFile? vehicleImage);
        Task<VehicleModel> AddVehicle(VehicleModel formData);
        Task<bool> DeleteVehicle(int id);
        Task<bool> DeleteVehicleImage(int id);
    }
}
