import { PasswordHashForm } from "~/shared/ui/PasswordHashForm";
import type { Route } from "./+types/movie";
import { PrivateRoute } from "~/providers";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Пароли" },
    { name: "description", content: "Создание хэша пароля" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <PasswordHashForm />
    </PrivateRoute>
  );
}
