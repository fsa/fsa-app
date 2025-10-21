import axios from "axios";
import { getAccessToken, setAccessToken, refreshToken } from "./auth";
import { API_BASE_URL } from "@/config/env";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // важно! чтобы cookie (refresh) отправлялись
});

// === перехватчик запросов ===
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === перехватчик ответов ===
let refreshingPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если access токен истёк
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Чтобы не дублировать несколько refresh запросов параллельно
      if (!refreshingPromise) {
        refreshingPromise = refreshToken()
          .then((newToken) => {
            setAccessToken(newToken);
          })
          .finally(() => {
            refreshingPromise = null;
          });
      }

      await refreshingPromise;
      // Повторяем запрос с новым access токеном
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
