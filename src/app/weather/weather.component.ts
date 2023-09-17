import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature = 0;
  feelsLikeTemp = 0;
  humidity = 0;
  pressure = 0;
  summary = '';
  iconUrl = '';
  city = 'lyon';
  units = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(); // Appel de la méthode pour obtenir les données météorologiques initiales
  }

  // Méthode pour obtenir les données météorologiques
  private getWeatherData() {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].description;
        this.iconUrl = `http://openweathermap.org/img/wn/${this.myWeather.weather[0].icon}@2x.png`;
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  // Méthode pour mettre à jour la ville
  updateCity(cityInput: HTMLInputElement) {
    this.city = cityInput.value;
    this.getWeatherData(); // Réappeler la méthode pour mettre à jour les données météorologiques
  }
}
