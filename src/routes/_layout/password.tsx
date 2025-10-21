import { createFileRoute } from "@tanstack/react-router"
import { PasswordHashForm } from "@/shared/ui/PasswordHashForm";
import { PrivateRoute } from "@/providers";

export const Route = createFileRoute('/_layout/password')({
  component: Component,
  head: () => ({
    meta: [
      {
        title: 'Пароли',
      },
      {
        name: 'description',
        content: 'Создание хеша пароля',
      },
    ],
  }),
});

function Component() {
  return (
    <PrivateRoute>
      <PasswordHashForm />
    </PrivateRoute>
  );
}
