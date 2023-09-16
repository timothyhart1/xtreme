﻿using Microsoft.AspNetCore.Mvc;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;
using BlindsTool.Web.Security.Models;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using WebApi.Services;
using XtremeOctaneApi.Security.Models;
using Microsoft.EntityFrameworkCore;
using System;
using AutoMapper.Execution;
using XtremeOctaneApi.Dtos;

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
                // Check if the "User" role exists
                var userRoleExists = await _roleManager.RoleExistsAsync(userRole);

                // Assign the "User" role to the user if it exists
                if (userRoleExists)
                {
                    await _userManager.AddToRoleAsync(user, userRole);
                    _logger.LogInformation($"User '{user.UserName}' assigned to role '{userRole}'.");
                }
                else
                {
                    _logger.LogError($"Role '{userRole}' does not exist.");
                    // Handle the situation where the "User" role is missing (e.g., throw an exception or return an error response).
                    // You can decide on the appropriate action based on your application's requirements.
                    return BadRequest("Role 'User' does not exist.");
                }

                // Authenticate the newly created user
                await _signInManager.SignInAsync(user, isPersistent: false);

                MemberModel member = new MemberModel
                {
                    Email = user.UserName,
                    UserId = user.Id,
                    Name = null,
                    Surname = null,
                    City = null,
                    PhoneNumber = null,
                    Gender = null,
                    CreateDate = DateTime.Now
                };

                await _db.Member.AddAsync(member);
                await _db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                await _userManager.DeleteAsync(user);
                var errors = result.Errors.Select(e => e.Description).ToList();
                _logger.LogError($"User creation failed. Errors: {string.Join(", ", errors)}");
                return BadRequest(errors);
            }
        }






        [HttpPost, Route("Login")]
        public async Task<ActionResult> Login([FromBody] UserModel userModel)
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

                    var member = await _db.Member.SingleOrDefaultAsync(m => m.UserId == userId);

                    if (userId == null || string.IsNullOrEmpty(user.UserName))
                    {
                        return BadRequest();
                    }

                    var token = _userService.GenerateToken(userId);

                    var loginResponse = new LoginResponseDto
                    {
                        Token = token,
                        UserId = userId,
                        Email = user.UserName,
                        MemberId = member.MemberId
                    };
                    return Ok(loginResponse);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching the member with ID");
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
