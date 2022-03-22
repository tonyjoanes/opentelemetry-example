import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface WeatherForecast {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeather() {
    let testUi = '/weatherforecast'; // 'http://backend-service/weatherdata';

    return this.http.get(testUi);
  }
}