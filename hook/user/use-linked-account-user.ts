import userService from "@/service/user-service"
import { useQuery } from "@tanstack/react-query"

import { UserLinkedAccount } from "@/types/interface/user"

export const useLinkedAccountUser = () => {
  return useQuery<UserLinkedAccount>({
    queryKey: ["linkedAccount", "me"],
    queryFn: userService.getLinkedAccountUser,
    staleTime: 5 * 60 * 1000, // cache 5 phút
    retry: 1, // retry 1 lần nếu lỗi
  })
}
