import { Card, CardContent, Box, Typography, Stack, Chip, LinearProgress } from "@mui/material";
import { Thermostat, Air, WaterDrop, Compress, Cloud } from "@mui/icons-material";
import { useWeather } from "../api/useWeather";

export const OpenWeather = () => {
  const { data, isLoading } = useWeather();

  if (isLoading) {
    return (
      <Card sx={{ maxWidth: 400, m: 2 }}>
        <CardContent>
          <Typography>Загрузка данных о погоде</Typography>
          <LinearProgress sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    );
  }

  const weather = data?.data;
  if (!weather) {
    return (
      <Card sx={{ maxWidth: 400, m: 2 }}>
        <CardContent>
          <Typography color="error">Нет данных о погоде</Typography>
        </CardContent>
      </Card>
    );
  }

  const temp = weather.main.temp.toFixed(1);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const pressure = Math.round(weather.main.pressure / 1.33322);
  const windSpeed = Math.round(weather.wind.speed);

  const getWindDirection = (deg: number) => {
    const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
    return directions[Math.round(deg / 45) % 8];
  };

  const windDirection = getWindDirection(weather.wind.deg);

  const weatherIcon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <Card sx={{ maxWidth: 400, m: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Заголовок и основная температура */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {temp}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ощущается как {feelsLike}°C
            </Typography>
          </Box>
          <Box textAlign="center">
            <Box
              component="img"
              src={iconUrl}
              alt={weather.weather[0].description}
              sx={{
                width: 80,
                height: 80,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
              }}
            />
            <Typography variant="body2" fontWeight="medium" textTransform="capitalize">
              {weather.weather[0].description}
            </Typography>
          </Box>
        </Box>

        {/* Детали погоды */}
        <Stack spacing={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <Thermostat color="action" />
            <Typography variant="body2">Температура:</Typography>
            <Chip label={`${temp}°C`} size="small" variant="outlined" />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <WaterDrop color="action" />
            <Typography variant="body2">Влажность:</Typography>
            <Chip label={`${humidity}%`} size="small" variant="outlined" />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Compress color="action" />
            <Typography variant="body2">Давление:</Typography>
            <Chip label={`${pressure} мм рт.ст.`} size="small" variant="outlined" />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Air color="action" />
            <Typography variant="body2">Ветер:</Typography>
            <Chip
              label={`${windDirection} ${windSpeed} м/с`}
              size="small"
              variant="outlined"
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Cloud color="action" />
            <Typography variant="body2">Облачность:</Typography>
            <Chip label={`${weather.clouds.all}%`} size="small" variant="outlined" />
          </Box>
        </Stack>

        {/* Дополнительная информация */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Видимость: {(weather.visibility / 1000).toFixed(1)} км
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Восход: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};