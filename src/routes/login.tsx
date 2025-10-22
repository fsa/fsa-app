import Container from "@mui/material/Container";
import { LoginForm } from "@/layout/LoginForm";
import { useAuthRedirect } from "@/shared/api/useAuthRedirect";

export default function Component() {
  useAuthRedirect({ redirectIfAuthenticated: "/" });

  return (
    <Container maxWidth="xs">
      <LoginForm />
    </Container>
  );
}
