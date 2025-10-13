import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { logout } from "~/services/auth";

export const UserMenu = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Button color="inherit" onClick={handleLogout}>
      Выйти
    </Button>
  );
}