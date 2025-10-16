import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

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
      navigate(redirectIfAuthenticated, { replace: true });
    } else if (!isAuthenticated && redirectIfUnauthenticated) {
      navigate(redirectIfUnauthenticated, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectIfAuthenticated, redirectIfUnauthenticated]);
}
