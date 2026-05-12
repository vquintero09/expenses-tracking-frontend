import type { ApiError } from "@domain/apiError.interface";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const expensesApi = axios.create({ baseURL: BASE_URL });

expensesApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.set(`Authorization Bearer: ${token}`);
    }

    return config;
  },
  (err: AxiosError<ApiError>) => {
    return Promise.reject(err);
  },
);
