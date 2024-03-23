using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Services.Vehicle;

public class VehicleService : IVehicleService
{
    private readonly ILogger<VehicleService> _logger;
    private readonly DataContext _db;

    public VehicleService(DataContext db, ILogger<VehicleService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<IEnumerable<VehicleModel>> GetAllVehicles()
    {
        try
        {
            var vehicles = await _db.Vehicle
                .Include(v => v.Member)
                .OrderByDescending(v => v.VehicleId)
                .ToListAsync();

            return vehicles;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching the vehicles");
            throw;
        }
    }

    public async Task<VehicleModel> GetVehicle(int id)
    {
        var vehicle = await _db.Vehicle
            .Include(v => v.Member)
            .FirstOrDefaultAsync(v => v.VehicleId == id);

        return vehicle;
    }

    public async Task<IEnumerable<VehicleModel>> GetVehiclesByMember(int memberId)
    {
        var member = await _db.Member.FindAsync(memberId);

        if (member == null)
        {
            throw new InvalidOperationException("Member not found.");
        }

        var vehicles = await _db.Vehicle
            .Where(v => v.MemberId == memberId)
            .ToListAsync();

        return vehicles;
    }

    public async Task<byte[]> GetVehicleImage(int id)
    {
        var vehicle = await _db.Vehicle.FirstOrDefaultAsync(e => e.VehicleId == id);

        if (vehicle == null || string.IsNullOrEmpty(vehicle.VehicleImage))
        {
            throw new InvalidOperationException("Vehicle or image not found.");
        }

        string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", vehicle.VehicleImage);

        if (!File.Exists(filePath))
        {
            throw new InvalidOperationException("Image not found.");
        }

        return await File.ReadAllBytesAsync(filePath);
    }

    public async Task EditVehicle(int id, VehicleModel vehicleModel, IFormFile? vehicleImage)
    {
        try
        {
            var vehicle = await _db.Vehicle.FirstOrDefaultAsync(e => e.VehicleId == id);

            if (vehicle != null)
            {
                if (vehicleImage != null)
                {
                    string fileName = Guid.NewGuid() + Path.GetExtension(vehicleImage.FileName);
                    string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", fileName);

                    using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
                    {
                        await vehicleImage.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }

                    vehicle.VehicleImage = fileName;
                    vehicle.HasImage = true;
                }
                else
                {
                    vehicle.HasImage = false;
                }

                vehicle.MemberId = vehicleModel.MemberId;
                vehicle.Manufacturer = vehicleModel.Manufacturer;
                vehicle.Model = vehicleModel.Model;
                vehicle.Year = vehicleModel.Year;
                vehicle.Mileage = vehicleModel.Mileage;
                vehicle.Plate = vehicleModel.Plate;
                vehicle.Color = vehicleModel.Color;

                await _db.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException($"Could not find the vehicle with the id {id}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "There was an error editing the vehicle");
            throw;
        }
    }

    public async Task<VehicleModel> AddVehicle(VehicleModel formData)
    {
        try
        {
            bool hasImage = formData.Image != null;
            string fileName = hasImage ? Guid.NewGuid() + Path.GetExtension(formData.Image.FileName) : null;

            if (hasImage)
            {
                string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", fileName);

                using (var fileStream = new FileStream(uploadFilePath, FileMode.Create))
                {
                    await formData.Image.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                }
            }

            var vehicle = new VehicleModel
            {
                MemberId = formData.MemberId,
                Manufacturer = formData.Manufacturer,
                Year = formData.Year,
                Model = formData.Model,
                Mileage = formData.Mileage,
                Plate = formData.Plate,
                Color = formData.Color,
                VehicleImage = fileName,
                HasImage = hasImage
            };

            await _db.Vehicle.AddAsync(vehicle);
            await _db.SaveChangesAsync();

            return vehicle;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while posting the vehicle");
            throw;
        }
    }

    public async Task<bool> DeleteVehicle(int id)
    {
        try
        {
            var vehicle = await _db.Vehicle.FindAsync(id);

            if (vehicle != null)
            {
                _db.Vehicle.Remove(vehicle);
                await _db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the vehicle");
            throw;
        }
    }

    public async Task<bool> DeleteVehicleImage(int id)
    {
        try
        {
            var vehicle = await _db.Vehicle.FindAsync(id);

            if (vehicle != null && !string.IsNullOrEmpty(vehicle.VehicleImage))
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", vehicle.VehicleImage);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

                vehicle.VehicleImage = null;
                vehicle.HasImage = false;

                await _db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the vehicle image");
            throw;
        }
    }
}
