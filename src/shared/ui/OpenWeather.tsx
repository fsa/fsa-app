import { Typography } from "@mui/material";
import { useWeather } from "../api/useWeather";

export const OpenWeather = () => {
  const { data, isLoading } = useWeather();
  if ( isLoading ) return <Typography>Загрузка данных о погоде</Typography>;
  const weather = data?.data;
  if ( weather === null ) return <Typography>Нет данных о погоде</Typography>;
  console.log('Данные о погоде: ' + JSON.stringify(data));
  const temp = weather.main.temp.toFixed(1);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;

  const pascalsToMmHg = (pascals: number, decimals: number = 1): number => {
    const MMHG_TO_HPASCAL = 1.33322;
    const result = pascals / MMHG_TO_HPASCAL;
    return Number(result.toFixed(decimals));
  };

  const pressure = pascalsToMmHg(weather.main.pressure, 0);
  const windSpeed = Math.round(weather.wind.speed);

  const getWindDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return "северный";
    if (deg >= 22.5 && deg < 67.5) return "северо-восточный";
    if (deg >= 67.5 && deg < 112.5) return "восточный";
    if (deg >= 112.5 && deg < 157.5) return "юго-восточный";
    if (deg >= 157.5 && deg < 202.5) return "южный";
    if (deg >= 202.5 && deg < 247.5) return "юго-западный";
    if (deg >= 247.5 && deg < 292.5) return "западный";
    if (deg >= 292.5 && deg < 337.5) return "северо-западный";
    return "";
  };

  const windDirection = getWindDirection(weather.wind.deg);

  const forecast = `Температура воздуха ${temp}°C, ощущается как ${feelsLike}°C. Относительная влажность ${humidity}%, ${weather.weather[0].description}, облачность ${weather.clouds.all}%. Атмосферное давление ${pressure} мм.рт.ст. Ветер ${windDirection}, ${windSpeed} м/с.`;

  return (
    <Typography>{forecast}</Typography>
  );
}