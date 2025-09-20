import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "tavda_console_access_token";

const api = axios.create({
  baseURL: import.meta.env.FSA_API_BASE_URL,
  withCredentials: true,
});

export interface JwtPayload {
  roles: string[];
  exp: number;
  iat: number;
  [key: string]: unknown;
}

let userRoles: string[] = [];

let accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userRoles = decoded.roles || [];
    } catch {
      userRoles = [];
    }
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    userRoles = [];
  }
}

function restoreUserRoles() {
  const token = getAccessToken();
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userRoles = decoded.roles || [];
    } catch {
      userRoles = [];
    }
  } else {
    userRoles = [];
  }
}

export function getUserRoles(): string[] {
  if (!userRoles || userRoles.length === 0) { restoreUserRoles(); }
  return userRoles;
}

export function hasRole(role: string): boolean {
  return getUserRoles().includes(role);
}

/**
 * Логин по username/password
 */
export async function login(username: string, password: string) {
  const res = await api.post("/login_check", { username, password });
  setAccessToken(res.data.token);
  return res.data.token;
}

/**
 * Обновление access token через refresh cookie
 */
export async function refreshToken() {
  const res = await api.post("/token/refresh");
  setAccessToken(res.data.token);
  return res.data.token;
}

/**
 * Logout
 */
export async function logout() {
  await api.post("/token/invalidate");
  setAccessToken(null);
}
