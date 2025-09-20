import { useState } from "react";
import { useNavigate } from 'react-router';
import { login, logout, getAccessToken } from "~/services/auth";
import type { Route } from "./+types/login";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Вход" },
    { name: "description", content: "Войти!" },
  ];
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/');
    } catch {
      alert("Ошибка входа");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {!getAccessToken() ? (
        <Container maxWidth="xs">
          <Paper elevation={10} sx={{ margin: 8, padding: 2 }}>
            <Avatar sx={{
              mx: "auto",
              bgcolor: "secondary.main",
              textAlign: "center",
              mb: 1
            }}>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Войти</Typography>
            <Box component="form">
              <TextField
                placeholder="Имя пользователя"
                label="Логин"
                fullWidth
                required
                autoFocus
                sx={{ mb: 2 }}
                variant="outlined"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                placeholder="Пароль"
                label="Пароль"
                fullWidth
                required
                sx={{ mb: 2 }}
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" fullWidth onClick={handleLogin}>Войти</Button>
            </Box>
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="xs">
          <Paper elevation={10} sx={{ margin: 8, padding: 2 }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Выход</Typography>
            <Button variant="contained" fullWidth onClick={handleLogout}>Выйти</Button>
          </Paper>
        </Container>
      )}
    </>
  );
};
