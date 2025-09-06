import ProtectedRoute from "~/components/ProtectedRoute";
import type { Route } from "./+types/about";
import { Container } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "О приложении" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function About() {
  return (
    <ProtectedRoute>
      <Container>
        <h1>О сайте!</h1>
        <p>Это просто демонстрационный сайт на React.</p>
      </Container>
    </ProtectedRoute>
  )
}
