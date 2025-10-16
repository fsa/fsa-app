import { useEffect } from "react";
import { setAccessToken, refreshToken } from "~/shared/api/auth";
import { useQueryClient } from "@tanstack/react-query";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      try {
        const token = await refreshToken();
        setAccessToken(token);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } catch {
        setAccessToken(null);
      }
    })();
  }, [queryClient]);

  return <>{children}</>;
}
