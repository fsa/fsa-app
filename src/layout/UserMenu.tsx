import { Logout } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useAuth } from "@/shared/api/useAuth";
import { useNavigate } from "@tanstack/react-router";

export const UserMenu = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) return null;

  const handleLogout = async () => {
    await logout.mutateAsync(); // используем мутацию из useAuth
    navigate({to: "/"}); // редирект после выхода
  };

  return (
    <Button color="inherit" onClick={handleLogout} disabled={logout.isPending}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logout />
        <Typography>{logout.isPending ? "Выходим..." : "Выйти"}</Typography>
      </Stack>
    </Button>
  );
};
