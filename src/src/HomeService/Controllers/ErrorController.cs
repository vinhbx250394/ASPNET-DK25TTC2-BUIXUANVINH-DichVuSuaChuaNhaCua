using Microsoft.AspNetCore.Mvc;

namespace HomeService.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult Error()
        {
            return View();
        }
    }
}
