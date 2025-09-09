import ProtectedRoute from "~/components/ProtectedRoute";
import type { Route } from "./+types/movie";
import { Container, Typography } from "@mui/material";
import MovieList from "~/components/MovieList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сериалы" },
    { name: "description", content: "Список сериалов" },
  ];
}

export default function Movie() {
  return (
    <ProtectedRoute>
      <Container maxWidth="lg">
        <MovieList />
      </Container>
    </ProtectedRoute>
  )
}
