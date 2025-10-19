import type { Route } from "./+types/_index";
import { OpenWeather } from "~/shared/ui/OpenWeather";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function HomePage() {
  return (
    <>
      <OpenWeather />
    </>
  );
}
