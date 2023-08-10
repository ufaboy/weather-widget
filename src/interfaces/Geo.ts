interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
}

interface LocationData {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}
interface GeoData {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

export type { LocationData, GeolocationPosition, GeoData };
