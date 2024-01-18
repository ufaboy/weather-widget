import { LocationData, GeoData } from '../interfaces/Geo';
import { WeatherResponse } from '../interfaces/Weather';

async function getWeather<T>(position: LocationData): Promise<T> {
    const { latitude, longitude, city } = position;
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    const params = new URLSearchParams();
    if (city) {
      params.append('q', city);
    } else if (latitude !== undefined && longitude !== undefined) {
      params.append('lat', latitude.toString());
      params.append('lon', longitude.toString());
    }
    params.append('lang', navigator.language);
    params.append('units', 'metric');
    params.append('appid', import.meta.env.VITE_APP_ID);
    url.search = params.toString();
    const response = await fetch(url);
    return await response.json();
}

async function getLocationsData<T>(searchString: string): Promise<T> {
    const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    const params = new URLSearchParams();
    params.append('q', searchString);
    params.append('limit', '12');
    params.append('appid', import.meta.env.VITE_APP_ID);
    url.search = params.toString();
    const response = await fetch(url);
    return await response.json();
}

export { getWeather, getLocationsData };
