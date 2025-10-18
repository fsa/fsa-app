import { api } from "../api"

export const fetchWeather = () => {
  return api.get('/weather/now');
}