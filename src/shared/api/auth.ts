import axios from "axios";
import { API_BASE_URL } from "~/config/env";

let accessToken: string | null = null;

// Экземпляр axios для API с базовым URL
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // обязательно для refresh cookie
});

// getter/setter для токена
export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

// 🔹 Обновление токена через refresh cookie
export async function refreshToken(): Promise<string> {
  try {
    const { data } = await api.post("/token/refresh");
    accessToken = data.token;
    return accessToken!;
  } catch {
    throw new Error("Failed to refresh token");
  }
}

// 🔹 Вход в систему
export async function login(username: string, password: string) {
  try {
    const { data } = await api.post(
      "/login_check",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    setAccessToken(data.token);
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error("Неверное имя пользователя или пароль");
    }
    throw err;
  }
}

// 🔹 Выход из системы
export async function logout() {
  try {
    await api.post("/token/invalidate");
  } finally {
    setAccessToken(null);
  }
}
