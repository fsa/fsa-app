import { jwtDecode } from "jwt-decode";

export function getUserFromToken<T>(token: string | null) {
  if (!token) return null;
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}