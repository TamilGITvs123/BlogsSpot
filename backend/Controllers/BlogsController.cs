using BlogApi.Data;
using BlogApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BlogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BlogsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogs = await _db.Blogs.Include(b => b.Author).OrderByDescending(b => b.CreatedAt).ToListAsync();
            return Ok(blogs.Select(b => new { b.Id, b.Title, b.Content, b.CreatedAt, Author = b.Author != null ? b.Author.Username : "" }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var b = await _db.Blogs.Include(x => x.Author).SingleOrDefaultAsync(x => x.Id == id);
            if (b == null) return NotFound();
            return Ok(new { b.Id, b.Title, b.Content, b.CreatedAt, Author = b.Author?.Username });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BlogPostRequest req)
        {
            var userId = int.Parse(User.FindFirstValue("id") ?? "0");
            if (userId == 0) return Unauthorized();

            var blog = new Blog { Title = req.Title, Content = req.Content, AuthorId = userId, CreatedAt = DateTime.UtcNow };
            _db.Blogs.Add(blog);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = blog.Id }, blog);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BlogPostRequest req)
        {
            var blog = await _db.Blogs.FindAsync(id);
            if (blog == null) return NotFound();

            var userId = int.Parse(User.FindFirstValue("id") ?? "0");
            if (blog.AuthorId != userId) return Forbid();

            blog.Title = req.Title;
            blog.Content = req.Content;
            await _db.SaveChangesAsync();
            return Ok(blog);
        }
    }

    public record BlogPostRequest(string Title, string Content);
}
