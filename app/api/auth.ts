import { authApi } from "./client";
import { jwtDecode } from "jwt-decode";

const ACCESS_KEY = "access_token";
const ACCESS_KEY_EXP = "access_token_exp";

const REFRESH_THRESHOLD = 30000;

interface AccessResponse {
    token: string;
}

export function saveAccessToken(token: string) {
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.exp) {
        return;
    }
    localStorage.setItem(ACCESS_KEY, token);
    localStorage.setItem(ACCESS_KEY_EXP, (decodedToken.exp * 1000).toString());
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
}

export function getAccessExpiresAt(): number | null {
    const expStr = localStorage.getItem(ACCESS_KEY_EXP);
    if (!expStr) return null;
    const exp = parseInt(expStr, 10);
    return isNaN(exp) ? null : exp;
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(ACCESS_KEY_EXP);
}

export async function login(username: string, password: string) {
    const response = await authApi.post<AccessResponse>(
        "/login_check",
        { username, password },
        { withCredentials: true }
    );
    saveAccessToken(response.data.token);
}

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await authApi.post<AccessResponse>(
            "/token/refresh",
            {},
            { withCredentials: true }
        );

        saveAccessToken(response.data.token);
        return response.data.token;
    } catch (e) {
        clearAccessToken();
        return null;
    }
}

export function logout() {
    clearAccessToken();
    authApi.post("/token/invalidate", {}, { withCredentials: true }).catch(() => { });
}

export async function initSession(): Promise<string | null> {
    const token = localStorage.getItem(ACCESS_KEY);
    const expStr = localStorage.getItem(ACCESS_KEY_EXP);

    if (!token || !expStr) {
        return null;
    }

    const exp = parseInt(expStr, 10);
    if (isNaN(exp)) {
        return null;
    }

    const now = Date.now();

    if (exp - now > REFRESH_THRESHOLD) {
        return token;
    }

    // если осталось мало времени или токен истёк → обновляем
    const newToken = await refreshAccessToken();
    if (!newToken) {
        clearAccessToken();
        return null;
    }

    return newToken;
}
