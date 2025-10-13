import { useApiClient } from "@/shared/api/apiClient";

export function sessionApi() {
  const client = useApiClient();

  return {
    login: async (data: { username: string; password: string }) => {
      const response = await client.post<{ token: string }>("/api/login_check", data);
      return response.data.token;
    },
    refresh: async () => {
      const response = await client.post<{ token: string }>("/api/token/refresh");
      return response.data.token;
    },
    invalidate: async () => {
      await client.post("/api/token/invalidate");
    },
  };
}
