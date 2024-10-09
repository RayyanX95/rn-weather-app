import axios from "axios";
export class MeteoAPI {
  static async fetchWeatherByCoords(coords) {
    return (
      await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      )
    ).data;
  }

  static async fetchCityByCoords(coords) {
    const { address } = (
      await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
      )
    ).data;

    const {
      road,
      city,
      state } = normalizeAddress(address);
    return city || state || road;
  }
}

function normalizeAddress(address) {
  return {
    road: address.road || '',
    suburb: address.suburb || '',
    city: address.city || address.city_district || address.village || address.town || '',
    county: address.county || address.province || '',
    state: address.state || address.region || '',
    postcode: address.postcode || '',
    country: address.country || '',
    country_code: address.country_code || ''
  };
}