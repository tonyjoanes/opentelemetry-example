namespace TestApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using TestApi.Models;

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var propagationContext = Telemetry.GetPropagationContext(Request);

            var links = new List<ActivityLink>
            {
                new ActivityLink(propagationContext.ActivityContext)
            };

            using var myActivity = Telemetry
                                    .MyActivitySource
                                    .StartActivity(
                                        ActivityKind.Server,
                                        parentContext: propagationContext.ActivityContext,
                                        name: "get-weather-data", 
                                        links: links);

            var rng = new Random();

            myActivity?.AddEvent(new($"using range ${rng}"));

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();

            _ = (myActivity?.SetStatus(System.Diagnostics.ActivityStatusCode.Ok, "Successfully generated weather data"));
        }
    }
}
