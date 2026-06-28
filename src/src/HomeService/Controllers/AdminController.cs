using Microsoft.AspNetCore.Mvc;
using HomeService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace HomeService.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly AppDbContext _context;
        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var bookings = await _context.Bookings.Include(b => b.Service).Include(b => b.User).ToListAsync();
            return View(bookings);
        }

        // Services CRUD
        public async Task<IActionResult> Services()
        {
            var services = await _context.Services.Include(s => s.Category).ToListAsync();
            return View(services);
        }

        public async Task<IActionResult> CreateService()
        {
            ViewBag.Categories = await _context.Categories.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateService(Service model)
        {
            if (!ModelState.IsValid) return View(model);
            _context.Services.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Services");
        }

        public async Task<IActionResult> EditService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return NotFound();
            ViewBag.Categories = await _context.Categories.ToListAsync();
            return View(service);
        }

        [HttpPost]
        public async Task<IActionResult> EditService(Service model)
        {
            if (!ModelState.IsValid) return View(model);
            _context.Services.Update(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Services");
        }

        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return NotFound();
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
            return RedirectToAction("Services");
        }

        // Booking Management
        public async Task<IActionResult> Bookings()
        {
            var bookings = await _context.Bookings.Include(b => b.Service).Include(b => b.User).ToListAsync();
            return View(bookings);
        }

        public async Task<IActionResult> UpdateStatus(int id, string status)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return NotFound();
            booking.Status = status;
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
            return RedirectToAction("Bookings");
        }
    }
}
