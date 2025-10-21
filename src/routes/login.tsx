import { createFileRoute } from "@tanstack/react-router"
import Container from "@mui/material/Container";
import { LoginForm } from "@/layout/LoginForm";
import { useAuthRedirect } from "@/shared/api/useAuthRedirect";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  head: () => ({
    meta: [
      {
        title: 'Вход на сайт',
      },
      {
        name: 'description',
        content: 'Войти в свою учётную запись на сайте',
      },
    ],
  }),
});

function LoginPage() {
  useAuthRedirect({ redirectIfAuthenticated: "/" });

  return (
    <Container maxWidth="xs">
      <LoginForm />
    </Container>
  );
}
