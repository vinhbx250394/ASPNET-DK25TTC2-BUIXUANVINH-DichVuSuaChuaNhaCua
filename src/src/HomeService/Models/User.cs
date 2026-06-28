using System.ComponentModel.DataAnnotations;

namespace HomeService.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool IsAdmin { get; set; }
    }
}
