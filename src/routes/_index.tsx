import { Typography } from "@mui/material";
import type { Route } from "./+types/_index";
import { OpenWeather } from "~/shared/ui/OpenWeather";
import { fetchWeather } from "~/shared/api/endpoints/weather.now";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function HomePage() {
  return (
    <>
      <Typography>Добро пожаловать на fsa.su</Typography>
      <OpenWeather />
    </>
  );
}
