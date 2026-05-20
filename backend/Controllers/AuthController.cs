using BlogApi.Data;
using BlogApi.Models;
using BlogApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest("Username and password required");

            if (await _db.Users.AnyAsync(u => u.Username == req.Username))
                return BadRequest("Username already exists");

            var user = new User { Username = req.Username, PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password) };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest req)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == req.Username);
            if (user == null) return Unauthorized("Invalid credentials");
            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash)) return Unauthorized("Invalid credentials");

            var token = _jwt.Generate(user);
            return Ok(new { token });
        }
    }

    public record AuthRequest(string Username, string Password);
}
