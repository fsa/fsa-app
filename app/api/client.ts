import axios from "axios";
import {
    getAccessToken,
    getAccessExpiresAt,
    refreshAccessToken,
} from "./auth";

export const authApi = axios.create({
    baseURL: import.meta.env.FSA_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // нужно для refresh cookie
});

export const api = axios.create({
    baseURL: import.meta.env.FSA_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// таймаут для обновления заранее (например, за 30 сек до истечения)
const REFRESH_THRESHOLD = 30 * 1000;

// ====== Request interceptor ======
api.interceptors.request.use(async (config) => {
    let token = getAccessToken();
    const expiresAt = getAccessExpiresAt();

    if (token && expiresAt) {
        const now = Date.now();

        // Если скоро протухнет — обновляем заранее
        if (expiresAt - now < REFRESH_THRESHOLD) {
            token = await refreshAccessToken();
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ====== обработка 401 ======
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    if (token) {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                    }
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const newToken = await refreshAccessToken();

            if (!newToken) {
                isRefreshing = false;
                processQueue(error, null);
                return Promise.reject(error);
            }

            processQueue(null, newToken);
            isRefreshing = false;

            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);
