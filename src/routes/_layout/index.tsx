import { OpenWeather } from "@/shared/ui/OpenWeather";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'FSA',
      },
      {
        name: 'description',
        content: 'Добро пожаловать в приложение FSA!',
      },
    ],
  }),
});

export function meta() {
  return [
    { title: "" },
    { name: "description", content: "" },
  ];
}

function HomePage() {
  return (
    <>
      <OpenWeather />
    </>
  );
}
