import { MovieList } from "~/features/movie/list";
import type { Route } from "./+types/MoviePage";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сериалы" },
    { name: "description", content: "Список сериалов" },
  ];
}

export default function MoviePage() {
  return (
    <MovieList />
  )
}
