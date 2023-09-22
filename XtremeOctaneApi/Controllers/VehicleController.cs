using XtremeOctaneApi.Models;
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
                return NotFound("Image not found.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "image/jpeg");
        }

        // Edit a vehicle.
        [HttpPut("EditVehicle/{id}")]
        public async Task<ActionResult> EditVehicle(int id, IFormFile? vehicleImage, int memberId, string manufacturer, string model,
            string year, int mileage, string plate, string color)
        {
            try
            {
                var vehicle = _db.Vehicle.FirstOrDefault(e => e.VehicleId == id);

                if (vehicle != null)
                {
                    if (vehicleImage != null)
                    {
                        string fileName = Guid.NewGuid() + Path.GetExtension(vehicleImage.FileName);
                        string uploadFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Cars", fileName);

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

                    vehicle.MemberId = memberId;
                    vehicle.Manufacturer = manufacturer;
                    vehicle.Model = model;  
                    vehicle.Year = year;
                    vehicle.Mileage = mileage;
                    vehicle.Plate = plate;
                    vehicle.Color = color;

                    _db.SaveChanges();

                    return Ok();
                }

                return NotFound($"Could not find the event with the id {id}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the event");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddVehicle")]
        [AllowAnonymous]
        public async Task<ActionResult<VehicleModel>> AddVehicle([FromForm] VehicleModel formData) 
        {
            try
            {
                bool hasImage = formData.Image != null;
                string fileName = hasImage ? Guid.NewGuid() + Path.GetExtension(formData.Image.FileName) : null;

                if (hasImage)
                {
                    string uploadfilepath = Path.Combine(Directory.GetCurrentDirectory(), "Documents\\Cars", fileName);

                    using (var fileStream = new FileStream(uploadfilepath, FileMode.Create))
                    {
                        await formData.Image.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    };
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

        // Delete the VehicleImage of a vehicle.
        [HttpDelete("DeleteVehicleImage/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteVehicleImage(int id)
        {
            try
            {
                var vehicle = await _db.Vehicle.FindAsync(id);

                if (vehicle == null)
                {
                    return BadRequest("No vehicle was found with a matching ID!");
                }

                if (!string.IsNullOrEmpty(vehicle.VehicleImage))
                {
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "Cars", vehicle.VehicleImage);

                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    vehicle.VehicleImage = null;
                    vehicle.HasImage = false;

                    await _db.SaveChangesAsync();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the vehicle image");
            }
        }
    }
}
