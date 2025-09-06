import { Container, Typography } from "@mui/material";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function Home() {
  return (
    <Container>
      <Typography>Welcome!</Typography>
    </Container>
  );
}
