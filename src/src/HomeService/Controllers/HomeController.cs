using Microsoft.AspNetCore.Mvc;
using HomeService.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeService.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;
        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var services = await _context.Services
                .Include(s => s.Category)
                .OrderByDescending(s => s.Id)
                .Take(6)
                .ToListAsync();
            return View(services);
        }

        public async Task<IActionResult> Services(string? category = null)
        {
            var servicesQuery = _context.Services.Include(s => s.Category).AsQueryable();
            if (!string.IsNullOrEmpty(category))
            {
                servicesQuery = servicesQuery.Where(s => s.Category.Name == category);
            }
            var services = await servicesQuery.OrderByDescending(s => s.Id).ToListAsync();
            ViewBag.SelectedCategory = category;
            ViewBag.AllCategories = await _context.Categories.ToListAsync();
            return View(services);
        }

        public async Task<IActionResult> ServiceDetails(int id)
        {
            var service = await _context.Services
                .Include(s => s.Category)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (service == null) return NotFound();
            return View(service);
        }

        public IActionResult Contact()
        {
            return View();
        }
    }
}
