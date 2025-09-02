import { authApi } from "./client";
import { jwtDecode } from "jwt-decode";

const ACCESS_KEY = "access_token";
const ACCESS_KEY_EXP = "access_token_exp";

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
