import { TMDB_ERROR_MESSAGES } from "./errorMessages";

export interface ApiError {
  status_code?: number;
  response?: {
    data?: {
      status_code?: number;
    };
  };
  status_message?: string;
}

export function handleApiError(error: ApiError): string {
  const code = error?.status_code ?? error?.response?.data?.status_code;
  const fallback = error?.status_message ?? "未知錯誤，請稍後再試";

  if (code && TMDB_ERROR_MESSAGES[code]) {
    return TMDB_ERROR_MESSAGES[code];
  }

  return fallback;
}
