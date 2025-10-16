import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken, login as loginApi, logout as logoutApi, refreshToken } from "~/shared/api/auth";
import { getUserFromToken } from "~/shared/lib/jwt";

// Тип данных пользователя, который декодируется из токена
interface User {
  username: string;
  roles: string[];
  exp: number;
  iat: number;
}

// Основной хук
export function useAuth() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User | null> => {
      try {
        const token = getAccessToken();
        if (!token) {
          // Пытаемся обновить токен, если его нет
          const newToken = await refreshToken();
          return getUserFromToken<User>(newToken);
        }
        return getUserFromToken<User>(token);
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });

  const login = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      await loginApi(data.username, data.password);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await logoutApi();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    user: userQuery.data,
    isAuthenticated: !!userQuery.data,
    isLoading: userQuery.isLoading,
    login,
    logout,
  };
}
