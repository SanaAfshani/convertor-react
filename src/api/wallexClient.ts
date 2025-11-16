import axios, { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { getToken } from "../utils/authStorage";

export interface ApiErrorShape {
    message: string;
    status?: number;
    code?: string;
}

const baseURL =
    import.meta.env?.VITE_WALLEX_BASE_URL?.toString() || "/api/wallex";

const wallexClient = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: (status) => status >= 200 && status < 300
});

wallexClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const runtimeToken = getToken();
        if (runtimeToken) {
            config.headers.set('Authorization', `Bearer ${runtimeToken}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

wallexClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const normalized: ApiErrorShape = {
            message: "Network error",
            status: error.response?.status,
            code: error.code
        };

        if (error.response?.data && typeof error.response.data === "object") {
            const anyData = error.response.data as { message?: string; error?: string };
            if (anyData.message) normalized.message = anyData.message;
            else if (anyData.error) normalized.message = anyData.error;
        }

        return Promise.reject(normalized);
    }
);

export default wallexClient;