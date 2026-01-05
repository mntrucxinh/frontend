/**
 * Error types for API error handling
 */

export interface ApiErrorResponse {
  code?: string
  message?: string
  error?: string
  fields?: Record<string, string[]>
}

export interface AxiosErrorResponse {
  response?: {
    status?: number
    data?: ApiErrorResponse
  }
  message?: string
  code?: string
}

export interface FacebookApiError extends AxiosErrorResponse {
  response?: {
    status?: number
    data?: ApiErrorResponse & {
      code?: "facebook_token_expired" | "facebook_not_linked" | string
    }
  }
}

