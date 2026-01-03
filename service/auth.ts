import { clearTokens, setAccessToken } from "@/utils/storage"

import {
  GoogleLoginRequest,
  LoginResponse,
} from "@/types/auth"
import { api } from "@/lib/axios"

export default {

  // Login with Google Method
  loginWithGoogle: async (
    payload: GoogleLoginRequest
  ): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/google/login", payload)
    const { accessToken } = data
    if (accessToken) {
      setAccessToken(accessToken)
    }
    return data
  },

  // Logout Method
  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
    clearTokens()
  },


}
