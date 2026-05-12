// API — Respuestas genéricas
// ----------------------------
export interface ApiError {
  error: string;
  details?: string;
}

export interface ApiDeleteResponse {
  message: string;
}
