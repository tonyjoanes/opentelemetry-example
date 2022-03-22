import { Component } from '@angular/core';
import { ApiService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData: any;
  constructor(private api: ApiService) {}

  title = 'example-frontend';

  getWeatherData() {
    this.api.getWeather().subscribe(res => {
      this.weatherData = res;
      console.log("Got weather data from API", res);
    });
  }
}