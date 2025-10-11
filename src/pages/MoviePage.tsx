import type { Route } from "./+types/MoviePage";
import { Container, Typography } from "@mui/material";
import MovieList from "~/components/MovieList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сериалы" },
    { name: "description", content: "Список сериалов" },
  ];
}

export default function MoviePage() {
  return (
    <Container maxWidth="lg">
      <MovieList />
    </Container>
  )
}
