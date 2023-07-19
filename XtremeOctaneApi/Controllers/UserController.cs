using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Dtos;
using BCrypt.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using BlindsTool.Web.Security.Models;
using Microsoft.AspNetCore.Identity;
using System;
using AutoMapper;
using WebApi.Services;
using Microsoft.AspNetCore.Http;
using XtremeOctaneApi.Security.Models;

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


        public UserController(DataContext db, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, IHttpContextAccessor httpContextAccessor, IUserService userService, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
            _roleManager = roleManager;
            _mapper = mapper;
        }


        [HttpPost, Route("CreateNewUser")]
        public async Task<IActionResult> CreateNewUser([FromBody] User userModel)
        {

            var user = new ApplicationUser { UserName = userModel.EmailAddress };
            var result = await _userManager.CreateAsync(user, userModel.Password);
            string userRole = String.Empty;

            if (result.Succeeded)
            {
                try
                {
                    if (!await _roleManager.RoleExistsAsync(userRole))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(userRole));
                    }
                    if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
                    {
                        await _userManager.AddToRoleAsync(user, UserRoles.User);
                    }

                    return Ok();
                }
                catch
                {
                    await _userManager.DeleteAsync(user);
                }
            }
            
            return BadRequest();
        }

        [HttpPost, Route("Login")]
        public async Task<IActionResult> Login([FromBody] User userModel)
        {

            try
            {
                var result = await _signInManager.PasswordSignInAsync(userModel.EmailAddress, userModel.Password, false, lockoutOnFailure: true);

                //if (result.Succeeded)
                //{
                //    var token = _userService.GenerateToken(userModel.EmailAddress);
                //    return Ok(token);
                //}
                if (result.IsLockedOut)
                {
                    return BadRequest("User is locked out");
                }
            }
            catch (Exception ex)
            {
                //ToDp: Log error
            }

            return BadRequest();
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
