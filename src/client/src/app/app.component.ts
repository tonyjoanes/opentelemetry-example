import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface WeatherForecast {
        date: Date;
        temperatureC: number;
        temperatureF: number;
        summary: string;
    }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  result: WeatherForecast[] = [];

  constructor(private http: HttpClient) {
    console.log('AppComponent constructor');
    this.getData();
  }

  getData() {
    this.http.get('/weatherforecast').subscribe((data) => {
      console.log(data);
      this.result = data as WeatherForecast[];
    });
  }

  refreshWeatherData() {
    console.log('refreshing weather data');
    this.getData();
  }

}
