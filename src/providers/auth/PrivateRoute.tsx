import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "~/shared/api/useAuth";
import { CircularProgress, Box, Typography } from "@mui/material";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // список ролей, которым разрешён доступ
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !user?.roles.some(role => allowedRoles.includes(role))) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          У вас нет доступа к этой странице
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};
