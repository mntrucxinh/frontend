export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface GoogleLoginRequest {
  idToken?: string
  accessToken?: string
  accessTokenExpiresIn?: number
  refreshToken?: string
  scope?: string
}

export interface SignUpRequest {
  email: string
  password: string
}

export interface SignUpResponse {
  message: string
}

export interface VerifyOtpRequest {
  email: string
  code: string
}

export interface VerifyOtpResponse {
  accessToken: string
  refreshToken: string
}

export interface ChangePasswordRequest {
  newPassword: string
}

export interface ChangeEmailRequest {
  newEmail: string
}

export interface UpdateEmailRequest {
  newEmail: string
}

export interface UpdateEmailResponse {
  message: string
}

export interface UpdatePasswordRequest {
  newPassword: string
}

export interface UpdatePasswordResponse {
  message: string
}
