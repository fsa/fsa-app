import { authApi } from "./client";
import { jwtDecode } from 'jwt-decode';

const ACCESS_KEY = "access_token";
const ACCESS_KEY_EXP = "access_token_exp";

interface AccessResponse {
    token: string;
}

// глобальная ссылка на таймер
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleRefresh(expiresIn: number) {
    if (refreshTimer) clearTimeout(refreshTimer);

    // обновляем за 30 секунд до истечения
    const refreshDelay = Math.max(expiresIn * 1000 - 30_000, 5_000);

    refreshTimer = setTimeout(async () => {
        const ok = await refreshAccessToken();
        if (!ok) {
            clearAccessToken();
        }
    }, refreshDelay);
}

export function saveAccessToken(token: string) {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp || !decodedToken.iat) {
        return;
    }
    localStorage.setItem(ACCESS_KEY, token);
    localStorage.setItem(ACCESS_KEY_EXP, (decodedToken.exp*1000).toString())

    scheduleRefresh(decodedToken.exp - decodedToken.iat);
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
}

export function getAccessExpiresAt(): number | null {
    return localStorage.getItem(ACCESS_KEY_EXP) as number | null;
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }
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
            "/login_refresh",
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
    authApi.post("/logout", {}, { withCredentials: true }).catch(() => { });
}
