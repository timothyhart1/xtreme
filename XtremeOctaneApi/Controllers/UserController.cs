using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using BlindsTool.Web.Security.Models;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using WebApi.Services;
using XtremeOctaneApi.Security.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;



        public UserController(DataContext db, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IMapper mapper, IHttpContextAccessor httpContextAccessor, IUserService userService, RoleManager<IdentityRole> roleManager,
            ILogger<UserController> logger)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
            _roleManager = roleManager;
            _mapper = mapper;
            _logger = logger;
        }


        [HttpPost]
        [Route("CreateNewUser")]
        public async Task<IActionResult> CreateNewUser([FromBody] UserModel userModel)
        {
            var user = new ApplicationUser { UserName = userModel.EmailAddress };
            var result = await _userManager.CreateAsync(user, userModel.Password);
            string userRole = UserRoles.User;

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(userRole))
                {
                    await _roleManager.CreateAsync(new IdentityRole(userRole));
                }

                if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await _userManager.AddToRoleAsync(user, userRole);
                }

                // Authenticate the newly created user
                await _signInManager.SignInAsync(user, isPersistent: false);

                return Ok();
            }
            else
            {
                await _userManager.DeleteAsync(user);
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(errors);
            }
        }


        [HttpPost, Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserModel userModel)
        {

            try
            {
                var result = await _signInManager.PasswordSignInAsync(userModel.EmailAddress, userModel.Password, false, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    var user = await _db.AspNetUsers.SingleOrDefaultAsync(u => u.UserName == userModel.EmailAddress);
                    var userId = await _db.AspNetUsers
                        .Where(u => u.UserName == userModel.EmailAddress)
                        .Select(u => u.Id)
                        .SingleOrDefaultAsync();


                    if (user != null)
                    {
                        var token = _userService.GenerateToken(userId);
                        return Ok(token);
                    }
                    else
                    {
                        return BadRequest("User not found.");
                    }
                }

                if (result.IsLockedOut)
                {
                    return BadRequest("User is locked out");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the member with ID");
            }

            return Ok();
        }

        [HttpPost, Route("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
