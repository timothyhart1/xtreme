﻿using XtremeOctaneApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Data;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : Controller
    {
        private readonly ILogger<VehicleController> _logger;
        private readonly DataContext _db;

        public VehicleController(DataContext db, ILogger<VehicleController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // Get all vehicles.
        [HttpGet, Route("GetAllVehicles")]
        public async Task<IActionResult> GetAllVehicles()
        {
            try
            {
                var vehicles = await _db.Vehicle
                    .Include(v => v.Member)
                    .OrderBy(v => v.Manufacturer)
                    .ToListAsync();

                if (vehicles == null)
                {
                    return NotFound("No members are available!");
                }

                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the members");
                return StatusCode(500, "An error occurred while fetching the members");
            }
        }

        // Get a single vehicle.
        [HttpGet, Route("GetMemberVehicle/{id}")]
        public IActionResult GetVehicle(int id)
        {
            var vehicle = _db.Vehicle.Include(v => v.Member).FirstOrDefault(v => v.VehicleId == id);

            if (vehicle == null)
            {
                return NotFound("Member not found.");
            }

            return Ok(vehicle);
        }

        // Get all vehicles owned by a member.
        [HttpGet, Route("GetAllMemberVehicles/{id}")]
        public IActionResult GetVehiclesByMember (int id)
        {
            var member = _db.Member.Find(id);

            if (member == null)
            {
                return NotFound("Member not found.");
            }

            var vehicles = _db.Vehicle
                .Where(v => v.MemberId == id)
                .ToList();

            return Ok(vehicles);
        }

        // Get the image of a vehicle.
        [HttpGet("GetVehicleImage/{id}")]
        [AllowAnonymous]
        public IActionResult GetEventImage(int id)
        {
            var vehicle = _db.Vehicle.FirstOrDefault(e => e.VehicleId == id);

            if (vehicle == null || string.IsNullOrEmpty(vehicle.VehicleImage))
            {
                return NotFound("Event or image not found.");
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", vehicle.VehicleImage);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image file not found on the server.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "image/jpeg");
        }

        // Add a new vehicle.
        [HttpPost("AddVehicle")]
        [AllowAnonymous]
        public async Task<ActionResult<VehicleModel>> AddVehicle(IFormFile image, int vehicleId, int memberId, string manufacturer, string model, string year, int mileage, 
        string plate, string color)
        {
            try
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                string uploadfilepath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Cars", fileName);

                using (var fileStream = new FileStream(uploadfilepath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                };

                var vehicle = new VehicleModel
                {
                    MemberId = memberId,
                    Manufacturer = manufacturer,
                    Year = year,
                    Model = model,
                    Mileage = mileage,
                    Plate = plate,
                    Color = color,
                    VehicleImage = fileName
                };

                await _db.Vehicle.AddAsync(vehicle);
                await _db.SaveChangesAsync();

                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the vehicle");
                return StatusCode(500, "An error occurred while posting the vehicle");
            }
        }

        // Delete a vehicle.
        [HttpDelete("DeleteVehicle/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var vehicle = await _db.Vehicle.FindAsync(id);

                if (vehicle == null)
                {
                    return BadRequest("No vehicle was found with a matching ID!");
                }

                _db.Vehicle.Remove(vehicle);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the event");
            }
        }
    }
}
