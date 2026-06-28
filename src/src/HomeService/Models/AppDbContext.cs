using Microsoft.EntityFrameworkCore;

namespace HomeService.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Sửa điện" },
                new Category { Id = 2, Name = "Sửa nước" },
                new Category { Id = 3, Name = "Máy lạnh" },
                new Category { Id = 4, Name = "Sơn nhà" },
                new Category { Id = 5, Name = "Chống thấm" }
            );

            modelBuilder.Entity<Service>().HasData(
                new Service { Id = 1, Title = "Sửa điện cơ bản", Description = "Sửa ổ cắm, dây điện...", Price = 200000, CategoryId = 1 },
                new Service { Id = 2, Title = "Thay cầu dao, aptômát", Description = "Thay thế thiết bị điện", Price = 150000, CategoryId = 1 },
                new Service { Id = 3, Title = "Sửa ống nước rò rỉ", Description = "Sửa ống nước trong nhà", Price = 250000, CategoryId = 2 },
                new Service { Id = 4, Title = "Lắp đặt máy lạnh", Description = "Lắp đặt, nạp gas", Price = 500000, CategoryId = 3 },
                new Service { Id = 5, Title = "Sơn nội thất 1 phòng", Description = "Sơn tường và trần", Price = 1200000, CategoryId = 4 },
                new Service { Id = 6, Title = "Chống thấm ban công", Description = "Xử lý chống thấm", Price = 800000, CategoryId = 5 }
            );

            // Seed admin user with plain password (will be hashed in initial migration/run step)
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = "admin123", FullName = "Admin", Phone = "0123456789", Address = "Hanoi", IsAdmin = true }
            );
        }
    }
}
