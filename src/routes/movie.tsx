import type { Route } from "./+types/movie";
import { PrivateRoute } from "@/providers";
import { MovieList } from "@/features/movie/list";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сериалы" },
    { name: "description", content: "Список сериалов" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <MovieList />
    </PrivateRoute>
  );
}
