using Microsoft.AspNetCore.Mvc;
using HomeService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace HomeService.Controllers
{
    [Authorize]
    public class BookingController : Controller
    {
        private readonly AppDbContext _context;
        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Create(int serviceId)
        {
            var service = await _context.Services.FindAsync(serviceId);
            if (service == null) return NotFound();
            ViewBag.Service = service;
            return View(new Booking { ServiceId = serviceId });
        }

        [HttpPost]
        public async Task<IActionResult> Create(Booking model)
        {
            if (!ModelState.IsValid) return View(model);
            var userId = int.Parse(User.FindFirst("UserId").Value!);
            model.UserId = userId;
            model.Status = "Chờ xử lý";
            model.CreatedAt = DateTime.Now;
            _context.Bookings.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("MyBookings");
        }

        // Tạo đơn nhanh — chọn dịch vụ + thông tin trong 1 form
        public async Task<IActionResult> CreateQuick()
        {
            var services = await _context.Services
                .Include(s => s.Category)
                .OrderByDescending(s => s.Id)
                .ToListAsync();
            ViewBag.Services = services;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuick(string serviceId, string fullName, string phone, string address, DateTime scheduleDate, string content)
        {
            if (string.IsNullOrEmpty(serviceId) || string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phone))
            {
                TempData["Error"] = "Vui lòng điền đầy đủ thông tin bắt buộc.";
                return RedirectToAction("CreateQuick");
            }

            var sid = int.Parse(serviceId);
            var service = await _context.Services.FindAsync(sid);
            if (service == null) return NotFound();

            var userId = int.Parse(User.FindFirst("UserId")!.Value);
            var booking = new Booking
            {
                ServiceId = sid,
                UserId = userId,
                FullName = fullName,
                Phone = phone,
                Address = address ?? "",
                ScheduleDate = scheduleDate == default ? DateTime.Now.AddDays(1) : scheduleDate,
                Content = content,
                Status = "Chờ xử lý",
                CreatedAt = DateTime.Now
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Đơn đặt dịch vụ \"{service.Title}\" đã được tạo thành công!";
            return RedirectToAction("MyBookings");
        }

        public async Task<IActionResult> MyBookings()
        {
            var userId = int.Parse(User.FindFirst("UserId")!.Value);
            var bookings = await _context.Bookings
                .Include(b => b.Service).ThenInclude(s => s!.Category)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
            return View(bookings);
        }
    }
}
