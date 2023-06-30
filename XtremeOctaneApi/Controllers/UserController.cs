using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using XtremeOctaneApi.Data;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private readonly DataContext _db;


        public UserController(IConfiguration configuration, DataContext db)
        {
            _config = configuration;
            _db = db;
        }

        private string HashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _db.User.AnyAsync(u => u.Email == user.Email))
            {
                ModelState.AddModelError("Email", "Email is already registered");
                return BadRequest(ModelState);
            }

            try
            {
                user.Password = HashPassword(user.Password);

                user.Token = GenerateToken(user);

                Member member = new Member
                {
                    Email = user.Email,
                    Name = null,
                    Surname = null,
                    City = null,
                    PhoneNumber = null,
                    Gender = null,
                    CreateDate = DateTime.Now
                };

                await _db.Member.AddAsync(member);
                await _db.SaveChangesAsync();

                user.MemberId = member.MemberId; 

                await _db.User.AddAsync(user);
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        private string GenerateToken(User user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
                expires: DateTime.Now.AddDays(20), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            IActionResult response = Unauthorized();
            var existingUser = await _db.User.SingleOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null && VerifyPassword(user.Password, existingUser.Password))
            {
                var token = GenerateToken(existingUser);
                response = Ok(new { token = token });
            }
            else
            {
                response = BadRequest(new { message = "Invalid email or password." });
            }
            return response;
        }

        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            string hashedEnteredPassword = HashPassword(enteredPassword);

            return hashedEnteredPassword == storedHashedPassword;
        }

    }
}
