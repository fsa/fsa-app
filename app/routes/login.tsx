import { useState } from "react";
import { useNavigate } from 'react-router';
import { login, logout, getAccessToken } from "../api/auth";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
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
    <div style={{ padding: 20 }}>
      <h1>Вход</h1>

      {!getAccessToken() ? (
        <div>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      )}

    </div>
  );
};
