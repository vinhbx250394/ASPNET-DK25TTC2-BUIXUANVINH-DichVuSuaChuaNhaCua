using System.ComponentModel.DataAnnotations;

namespace HomeService.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
