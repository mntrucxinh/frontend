import { UserInfo, UserLinkedAccount } from "@/types/interface/user"
import { api } from "@/lib/axios"

const getUserInfo = async (): Promise<UserInfo> => {
  const res = await api.get("/users/me")
  return res.data
}

const getLinkedAccountUser = async (): Promise<UserLinkedAccount> => {
  const res = await api.get("/users/me/linked-accounts")
  return res.data
}

export default {
  getUserInfo,
  getLinkedAccountUser,
}
