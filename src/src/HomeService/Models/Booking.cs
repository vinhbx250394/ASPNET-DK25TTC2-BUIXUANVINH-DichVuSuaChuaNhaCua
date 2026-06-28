using System.ComponentModel.DataAnnotations;

namespace HomeService.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }

        [Required]
        public string FullName { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime ScheduleDate { get; set; }
        public string Content { get; set; }
        public string Status { get; set; } = "Chờ xử lý";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
