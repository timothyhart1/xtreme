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

namespace XtremeOctaneApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly IConfiguration _configuration;


        public UserController(DataContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration; 
        }

        public static User user = new User();
        
        [HttpPost("Register")]
        public async Task<ActionResult<User>> RegisterAsync([FromBody] UserDto request)
        {
            if (await _db.User.AnyAsync(u => u.Email == request.Email))
            {
                ModelState.AddModelError("Email", "Email is already registered");
                return BadRequest(ModelState);
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            User user = new User
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                Member = new Member
                {
                    Email = request.Email,
                    CreateDate = DateTime.Now
                }
            };

            _db.User.Add(user);
            await _db.SaveChangesAsync();

            return Ok(user);
        }


        [HttpPost("Login")]
        public ActionResult<string> Login(UserDto request)
        {
            User user = _db.User.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        private string CreateToken (User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
