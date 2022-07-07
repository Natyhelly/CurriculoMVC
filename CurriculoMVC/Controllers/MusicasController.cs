using CurriculoMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CurriculoMVC.Controllers
{
    public class MusicasController : Controller
    {
        private readonly ILogger<MusicasController> _logger;

        public MusicasController(ILogger<MusicasController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}