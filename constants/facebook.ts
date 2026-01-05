/**
 * Facebook OAuth Configuration Constants
 */

export const FACEBOOK_OAUTH = {
  POPUP_WIDTH: 600,
  POPUP_HEIGHT: 700,
  TIMEOUT_MS: 300000, // 5 minutes
  CHECK_INTERVAL_MS: 500,
  TOKEN_REQUEST_TIMEOUT_MS: 2000,
  CLOSE_DELAY_SUCCESS_MS: 2000,
  CLOSE_DELAY_ERROR_MS: 5000,
} as const

export const FACEBOOK_SCOPES = "pages_show_list,pages_manage_posts" as const

export const FACEBOOK_OAUTH_VERSION = "v18.0" as const

/**
 * Message types for postMessage communication between popup and parent
 */
export const FACEBOOK_MESSAGE_TYPES = {
  OAUTH_SUCCESS: "FACEBOOK_OAUTH_SUCCESS",
  OAUTH_ERROR: "FACEBOOK_OAUTH_ERROR",
  REQUEST_JWT_TOKEN: "REQUEST_JWT_TOKEN",
  JWT_TOKEN_RESPONSE: "JWT_TOKEN_RESPONSE",
} as const

export type FacebookMessageType =
  (typeof FACEBOOK_MESSAGE_TYPES)[keyof typeof FACEBOOK_MESSAGE_TYPES]

