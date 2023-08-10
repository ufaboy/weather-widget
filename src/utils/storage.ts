import { LocationData } from '../interfaces/Geo'

function saveLocationsFromStorage(data: LocationData[]) {
    localStorage.setItem('weather_locations', JSON.stringify(data))
}
function loadLocationsFromStorage(): LocationData[]|[] {
    const result = localStorage.getItem('weather_locations')
    return result ? JSON.parse(result) : []
}

export {saveLocationsFromStorage, loadLocationsFromStorage}