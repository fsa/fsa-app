import axios, { AxiosError, type AxiosInstance } from "axios";
import { queryClient } from "@/app/providers/query/QueryProvider";
import { sessionApi } from "./sessionApi";
import { useAccessToken, useSetToken, useClearSession } from "../model/sessionStore";
import { API_BASE_URL } from "@/shared/config/env";

const baseApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export function useApiClient() {
  const token = useAccessToken();
  const setToken = useSetToken();
  const clearSession = useClearSession();

  const client = baseApi;

  client.interceptors.request.use((config) => {
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (r) => r,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        try {
          const newToken = await sessionApi().refresh();
          setToken(newToken);
          const retryConfig = error.config!;
          retryConfig.headers = retryConfig.headers ?? {};
          retryConfig.headers.Authorization = `Bearer ${newToken}`;
          return client.request(retryConfig);
        } catch (e) {
          clearSession();
          queryClient.clear();
          throw e;
        }
      }
      throw error;
    }
  );

  return client;
}
