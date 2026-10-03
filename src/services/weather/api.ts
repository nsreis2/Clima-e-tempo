import type { WeatherData, DailyForecastItem, HourlyForecastItem, GeocodingResult } from './types';
import { getWMOInfo } from './wmo';
import { formatDayOfWeek, windDegreeToCardinal } from './formatters';

const DEFAULT_TIMEZONE = 'America/Sao_Paulo';
const API_TIMEOUT = 6000;

export async function fetchWeather(
  latitude: number,
  longitude: number,
  cityName: string = 'Localização',
  stateUf: string = 'BR',
  timezone: string = DEFAULT_TIMEZONE
): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', latitude.toFixed(4));
  url.searchParams.set('longitude', longitude.toFixed(4));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index'
  );
  url.searchParams.set(
    'hourly',
    'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m'
  );
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max'
  );
  url.searchParams.set('timezone', timezone);
  url.searchParams.set('forecast_days', '7');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ClimaBrasil/1.0 (https://climabrasil.com.br)',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return transformWeatherData(data, cityName, stateUf);
  } catch (error) {
    console.warn(`[WeatherService] Falha ao consultar Open-Meteo para ${cityName} (${latitude}, ${longitude}):`, error);
    return getFallbackWeatherData(latitude, longitude, cityName, stateUf);
  }
}

export function transformWeatherData(data: any, cityName: string, stateUf: string): WeatherData {
  const current = data.current || {};
  const daily = data.daily || {};
  const hourly = data.hourly || {};

  const currentWeatherCode = current.weather_code ?? 0;
  const currentWmo = getWMOInfo(currentWeatherCode);

  const dailyItems: DailyForecastItem[] = [];
  if (daily.time && Array.isArray(daily.time)) {
    for (let i = 0; i < daily.time.length; i++) {
      const dateStr = daily.time[i];
      const { full, short } = formatDayOfWeek(dateStr);
      const code = daily.weather_code ? daily.weather_code[i] : 0;
      const wmo = getWMOInfo(code);

      dailyItems.push({
        date: dateStr,
        dayOfWeek: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : full,
        dayOfWeekShort: i === 0 ? 'Hoje' : short,
        weatherCode: code,
        conditionText: wmo.description,
        minTemp: Math.round(daily.temperature_2m_min ? daily.temperature_2m_min[i] : 18),
        maxTemp: Math.round(daily.temperature_2m_max ? daily.temperature_2m_max[i] : 28),
        precipitationProbability: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0,
        precipitationSum: daily.precipitation_sum ? daily.precipitation_sum[i] : 0,
        uvIndexMax: daily.uv_index_max ? daily.uv_index_max[i] : 5,
        windSpeedMax: daily.wind_speed_10m_max ? Math.round(daily.wind_speed_10m_max[i]) : 15,
        sunrise: daily.sunrise ? daily.sunrise[i] : '',
        sunset: daily.sunset ? daily.sunset[i] : '',
      });
    }
  }

  const hourlyItems: HourlyForecastItem[] = [];
  if (hourly.time && Array.isArray(hourly.time)) {
    // Current hour index
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13); // YYYY-MM-DDTHH
    let startIdx = 0;
    
    // Find approximate index of now
    for (let i = 0; i < hourly.time.length; i++) {
      if (hourly.time[i].startsWith(currentHourStr)) {
        startIdx = i;
        break;
      }
    }

    // Get next 24 hours
    for (let i = startIdx; i < Math.min(startIdx + 24, hourly.time.length); i++) {
      const timeStr = hourly.time[i];
      const hourPart = timeStr.includes('T') ? timeStr.split('T')[1].slice(0, 5) : timeStr;
      const code = hourly.weather_code ? hourly.weather_code[i] : 0;
      const wmo = getWMOInfo(code);

      hourlyItems.push({
        time: timeStr,
        hour: hourPart,
        temperature: Math.round(hourly.temperature_2m ? hourly.temperature_2m[i] : 20),
        apparentTemperature: Math.round(hourly.apparent_temperature ? hourly.apparent_temperature[i] : 20),
        weatherCode: code,
        conditionText: wmo.description,
        precipitationProbability: hourly.precipitation_probability ? hourly.precipitation_probability[i] : 0,
        precipitation: hourly.precipitation ? hourly.precipitation[i] : 0,
        relativeHumidity: hourly.relative_humidity_2m ? hourly.relative_humidity_2m[i] : 60,
        windSpeed: hourly.wind_speed_10m ? Math.round(hourly.wind_speed_10m[i]) : 10,
      });
    }
  }

  const todayDaily = dailyItems[0] || {
    minTemp: Math.round((current.temperature_2m || 20) - 4),
    maxTemp: Math.round((current.temperature_2m || 20) + 5),
    precipitationProbability: 10,
    precipitationSum: 0,
    uvIndexMax: 6,
    sunrise: '06:00',
    sunset: '18:30',
  };

  return {
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    cityName,
    stateUf,
    current: {
      time: current.time || new Date().toISOString(),
      temperature: Math.round(current.temperature_2m ?? 22),
      apparentTemperature: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 22),
      weatherCode: currentWeatherCode,
      conditionText: currentWmo.description,
      isDay: current.is_day === 1,
      precipitation: current.precipitation ?? 0,
      relativeHumidity: current.relative_humidity_2m ?? 65,
      windSpeed: Math.round(current.wind_speed_10m ?? 12),
      windDirection: current.wind_direction_10m ?? 90,
      windDirectionCardinal: windDegreeToCardinal(current.wind_direction_10m),
      uvIndex: current.uv_index ?? 5,
      pressure: Math.round(current.surface_pressure ?? 1013),
    },
    today: {
      minTemp: todayDaily.minTemp,
      maxTemp: todayDaily.maxTemp,
      precipitationProbability: todayDaily.precipitationProbability,
      precipitationSum: todayDaily.precipitationSum,
      uvIndexMax: todayDaily.uvIndexMax,
      sunrise: todayDaily.sunrise,
      sunset: todayDaily.sunset,
    },
    daily: dailyItems,
    hourly: hourlyItems,
    lastUpdated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    dataSource: 'Open-Meteo & Modelos Meteorológicos Globais',
  };
}

export function getFallbackWeatherData(
  latitude: number,
  longitude: number,
  cityName: string,
  stateUf: string
): WeatherData {
  const isSouth = latitude < -23;
  const baseTemp = isSouth ? 20 : 26;

  const mockDaily: DailyForecastItem[] = [];
  const days = ['Hoje', 'Amanhã', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const { full, short } = formatDayOfWeek(dateStr);

    mockDaily.push({
      date: dateStr,
      dayOfWeek: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : full,
      dayOfWeekShort: i === 0 ? 'Hoje' : short,
      weatherCode: i % 2 === 0 ? 1 : 2,
      conditionText: i % 2 === 0 ? 'Predomínio de sol' : 'Parcialmente nublado',
      minTemp: baseTemp - 4 + (i % 3),
      maxTemp: baseTemp + 5 + (i % 4),
      precipitationProbability: (i * 15) % 40,
      precipitationSum: 0,
      uvIndexMax: 7,
      windSpeedMax: 14,
      sunrise: '06:15',
      sunset: '18:25',
    });
  }

  const mockHourly: HourlyForecastItem[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = (now.getHours() + i) % 24;
    mockHourly.push({
      time: `${String(hour).padStart(2, '0')}:00`,
      hour: `${String(hour).padStart(2, '0')}:00`,
      temperature: baseTemp + Math.round(Math.sin((hour - 6) / 4) * 4),
      apparentTemperature: baseTemp + Math.round(Math.sin((hour - 6) / 4) * 4),
      weatherCode: 1,
      conditionText: 'Predomínio de sol',
      precipitationProbability: 10,
      precipitation: 0,
      relativeHumidity: 65,
      windSpeed: 12,
    });
  }

  return {
    latitude,
    longitude,
    cityName,
    stateUf,
    current: {
      time: now.toISOString(),
      temperature: baseTemp,
      apparentTemperature: baseTemp + 1,
      weatherCode: 1,
      conditionText: 'Predomínio de sol',
      isDay: true,
      precipitation: 0,
      relativeHumidity: 65,
      windSpeed: 12,
      windDirection: 90,
      windDirectionCardinal: 'Leste',
      uvIndex: 6,
      pressure: 1015,
    },
    today: {
      minTemp: baseTemp - 4,
      maxTemp: baseTemp + 5,
      precipitationProbability: 10,
      precipitationSum: 0,
      uvIndexMax: 7,
      sunrise: '06:15',
      sunset: '18:25',
    },
    daily: mockDaily,
    hourly: mockHourly,
    lastUpdated: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    dataSource: 'Estimativa Climática Regional (Modo Seguro)',
  };
}

export async function searchCitiesGeocoding(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query.trim()
  )}&count=10&language=pt&format=json`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.results) return [];

    // Filter to Brazil prioritized or included
    return (data.results as GeocodingResult[]).filter(
      (item) => item.country_code === 'BR' || item.country?.toLowerCase() === 'brasil' || item.country?.toLowerCase() === 'brazil'
    );
  } catch (error) {
    console.warn('[Geocoding] Erro na busca de cidades:', error);
    return [];
  }
}
