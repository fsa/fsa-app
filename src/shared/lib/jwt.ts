import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  username?: string;
  [key: string]: any;
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}

export function getTokenLifetimeMs(token: string | null): number {
  if (!token) return 0;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Math.max(exp * 1000 - Date.now(), 0);
  } catch {
    return 0;
  }
}
