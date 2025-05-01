import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TMDB_ERROR_MESSAGES } from "./errorMessages";
import { AxiosError } from "axios";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
});

export interface TMDBError {
  status_code?: number;
  status_message?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// 處理 TMDB API 的 response
export async function handleApiResponse<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const res = await promise;
    return { data: res.data };
  } catch (err) {
    const error = err as AxiosError<{
      status_code: number;
      status_message: string;
    }>;
    const code = error?.response?.data?.status_code;
    const fallback = error?.response?.data?.status_message ?? "Unknown error";
    const msg =
      code && TMDB_ERROR_MESSAGES[code] ? TMDB_ERROR_MESSAGES[code] : fallback;

    console.error("API Error:", msg);
    return { data: null as unknown as T, error: msg };
  }
}

//  GET
export function createGetRequest<T>(path: string) {
  return (
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    handleApiResponse<T>(client.get(path, { ...config, params }));
}
