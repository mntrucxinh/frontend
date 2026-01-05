import { api } from "@/lib/axios"
import {
  FacebookLinkRequest,
  FacebookLinkResponse,
  FacebookStatusResponse,
} from "@/types/auth"

export default {
  // Link Facebook Page
  linkFacebook: async (
    payload: FacebookLinkRequest
  ): Promise<FacebookLinkResponse> => {
    const { data } = await api.post<FacebookLinkResponse>(
      "/auth/facebook/link",
      payload
    )
    return data
  },

  // Check Facebook Status
  getFacebookStatus: async (): Promise<FacebookStatusResponse> => {
    const { data } = await api.get<FacebookStatusResponse>(
      "/auth/facebook/status"
    )
    return data
  },
}

