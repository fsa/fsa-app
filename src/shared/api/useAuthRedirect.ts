import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "@tanstack/react-router";

export function useAuthRedirect({
  redirectIfAuthenticated,
  redirectIfUnauthenticated,
}: {
  redirectIfAuthenticated?: string;
  redirectIfUnauthenticated?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && redirectIfAuthenticated) {
      navigate({ to: redirectIfAuthenticated, replace: true })
    } else if (!isAuthenticated && redirectIfUnauthenticated) {
      navigate({ to: redirectIfUnauthenticated, replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, redirectIfAuthenticated, redirectIfUnauthenticated]);
}
