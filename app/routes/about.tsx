import ProtectedRoute from "~/components/ProtectedRoute";
import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "О приложении" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function About() {
  return (
    <ProtectedRoute>
      <main>
        <h1>О сайте!</h1>
        <p>Это просто демонстрационный сайт на React.</p>
      </main>
    </ProtectedRoute>
  )
}
