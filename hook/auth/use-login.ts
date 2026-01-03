import authService from "@/service/auth" // Import toàn bộ service
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "@/components/context/auth-context"
import { LoginResponse, GoogleLoginRequest } from "@/types/auth"


// Hook cho login with Google
export const useMutationLoginWithGoogle = () => {
  return useMutation<LoginResponse, Error, GoogleLoginRequest>({
    mutationFn: authService.loginWithGoogle, // Sử dụng authService.loginWithGoogle
  })
}

// Hook cho Auth context
export function useAuth() {
  return useContext(AuthContext)
}
