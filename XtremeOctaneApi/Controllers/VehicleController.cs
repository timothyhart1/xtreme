using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Services.Vehicle;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : Controller
    {
        private readonly ILogger<VehicleController> _logger;
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService, ILogger<VehicleController> logger)
        {
            _vehicleService = vehicleService;
            _logger = logger;
        }

        // Get all vehicles.
        [HttpGet, Route("GetAllVehicles")]
        [Authorize]
        public async Task<IActionResult> GetAllVehicles()
        {
            try
            {
                var vehicles = await _vehicleService.GetAllVehicles();

                if (vehicles == null)
                {
                    return NotFound("No vehicles are available!");
                }

                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the vehicles");
                return StatusCode(500, "An error occurred while fetching the vehicles");
            }
        }

        // Get a single vehicle.
        [HttpGet, Route("GetMemberVehicle/{id}")]
        [Authorize]
        public async Task<IActionResult> GetVehicle(int id)
        {
            try
            {
                var vehicle = await _vehicleService.GetVehicle(id);

                if (vehicle == null)
                {
                    return NotFound("Vehicle not found.");
                }

                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the vehicle");
                return StatusCode(500, "An error occurred while fetching the vehicle");
            }
        }

        // Get all vehicles owned by a member.
        [HttpGet, Route("GetAllMemberVehicles/{id}")]
        [Authorize]
        public async Task<IActionResult> GetVehiclesByMember(int id)
        {
            try
            {
                var vehicles = await _vehicleService.GetVehiclesByMember(id);

                if (vehicles == null)
                {
                    return NotFound("No vehicles found for the member.");
                }

                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the member's vehicles");
                return StatusCode(500, "An error occurred while fetching the member's vehicles");
            }
        }

        // Get the image of a vehicle.
        [HttpGet("GetVehicleImage/{id}")]
        public async Task<IActionResult> GetVehicleImage(int id)
        {
            try
            {
                var imageBytes = await _vehicleService.GetVehicleImage(id);

                if (imageBytes == null)
                {
                    return NotFound("Vehicle image not found.");
                }

                return File(imageBytes, "image/jpeg");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the vehicle image");
                return StatusCode(500, "An error occurred while fetching the vehicle image");
            }
        }

        // Edit a vehicle.
        [HttpPut("EditVehicle/{id}")]
        [Authorize]
        public async Task<IActionResult> EditVehicle(int id, [FromForm] VehicleModel formData)
        {
            try
            {
                await _vehicleService.EditVehicle(id, formData, formData.Image);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "There was an error editing the vehicle");
                return StatusCode(500, "An error occurred while editing the vehicle");
            }
        }

        // Add a vehicle.
        [HttpPost("AddVehicle")]
        [Authorize]
        public async Task<IActionResult> AddVehicle([FromForm] VehicleModel formData)
        {
            try
            {
                var vehicle = await _vehicleService.AddVehicle(formData);

                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the vehicle");
                return StatusCode(500, "An error occurred while adding the vehicle");
            }
        }

        // Delete a vehicle.
        [HttpDelete("DeleteVehicle/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            try
            {
                var success = await _vehicleService.DeleteVehicle(id);

                if (success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("No vehicle was found with a matching ID!");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the vehicle");
                return StatusCode(500, "An error occurred while deleting the vehicle");
            }
        }

        // Delete the VehicleImage of a vehicle.
        [HttpDelete("DeleteVehicleImage/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicleImage(int id)
        {
            try
            {
                var success = await _vehicleService.DeleteVehicleImage(id);

                if (success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("No vehicle was found with a matching ID!");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the vehicle image");
                return StatusCode(500, "An error occurred while deleting the vehicle image");
            }
        }
    }
}
