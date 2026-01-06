import userService from "@/service/user-service"
import { useQuery } from "@tanstack/react-query"

import { UserInfo } from "@/types/interface/user"

export const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: ["user", "me"],
    queryFn: userService.getUserInfo,
    staleTime: 5 * 60 * 1000, // cache 5 phút
    retry: 1, // retry 1 lần nếu lỗi
  })
}
