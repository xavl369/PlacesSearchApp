using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using Places.Persistence.Contracts;
using PlacesSearchApp.Models;
using System.Diagnostics;

namespace PlacesSearchApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IPlaceRepository _repository;

        public HomeController(ILogger<HomeController> logger, 
                              IConfiguration configuration,
                              IMapper mapper,
                              IPlaceRepository repository)
        {
            _logger = logger;
            _configuration = configuration;
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IActionResult> Index()
        {
            string foursquareApiKey = _configuration["FoursquareAPIKey"] ?? "";
            string foursquareApiUrl = _configuration["FoursquareAPIUrl"] ?? "";

            ViewBag.FoursquareAPIKey = foursquareApiKey;
            ViewBag.FoursquareAPIUrl = foursquareApiUrl;

            var places = await _repository.GetAllAsync();
            var placesViewModel = _mapper.Map <PlaceViewModel[]>(places);

            if (TempData.ContainsKey("Message"))
            {
                ViewBag.Message = TempData["Message"]?.ToString();
            }

            return View(placesViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<IActionResult> SavePlace([FromBody] PlaceViewModel placeModel)
        {
            try
            {
                if (!_repository.ExistPlace(placeModel.Id))
                {
                    var placeEntity = _mapper.Map<Place>(placeModel);
                    await _repository.AddAsync(placeEntity);
                    return Ok(new { Message = $"Place datails for {placeModel.Name} saved successfully", Success = true });
                }
                else
                {
                    return Ok(new { Message = $"Place data for {placeModel.Name} already exists", Success = false });
                }

            }
            catch (Exception ex) {
                _logger.LogError(ex, ex.Message);
                return Ok(new { Message = "An error occurred while saving place.", Success = false });
            }
        }

        public async Task<IActionResult> Delete(string id)
        {
            var place = await _repository.GetByIdAsync(id);

            if (place == null)
            {
                return NotFound();
            }
            else
            {
                await _repository.DeleteAsync(place);
                var places = await _repository.GetAllAsync();
                TempData["Message"] = $"Place {place.Name} deleted successfully.";

                return RedirectToAction(nameof(Index));
            }
        }
    }
}