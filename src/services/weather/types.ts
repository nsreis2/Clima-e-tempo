export interface WeatherData {
  latitude: number;
  longitude: number;
  cityName: string;
  stateUf: string;
  current: {
    time: string;
    temperature: number;
    apparentTemperature: number;
    weatherCode: number;
    conditionText: string;
    isDay: boolean;
    precipitation: number;
    relativeHumidity: number;
    windSpeed: number;
    windDirection: number;
    windDirectionCardinal: string;
    uvIndex: number;
    pressure: number;
  };
  today: {
    minTemp: number;
    maxTemp: number;
    precipitationProbability: number;
    precipitationSum: number;
    uvIndexMax: number;
    sunrise: string;
    sunset: string;
  };
  daily: DailyForecastItem[];
  hourly: HourlyForecastItem[];
  lastUpdated: string;
  dataSource: string;
}

export interface DailyForecastItem {
  date: string;
  dayOfWeek: string;
  dayOfWeekShort: string;
  weatherCode: number;
  conditionText: string;
  minTemp: number;
  maxTemp: number;
  precipitationProbability: number;
  precipitationSum: number;
  uvIndexMax: number;
  windSpeedMax: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecastItem {
  time: string;
  hour: string;
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  conditionText: string;
  precipitationProbability: number;
  precipitation: number;
  relativeHumidity: number;
  windSpeed: number;
}

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // State / Province
  admin2?: string;
}

export interface CityInfo {
  slug: string;
  name: string;
  uf: string;
  state: string;
  latitude: number;
  longitude: number;
  region: 'Sul' | 'Sudeste' | 'Centro-Oeste' | 'Nordeste' | 'Norte';
  description: string;
  climateType: string;
  averageAnnualTemp: number;
  rainySeason: string;
  nearbyCities: string[]; // slugs
}
