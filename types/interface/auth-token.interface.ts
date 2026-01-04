// import { type TUserProfileRes } from '~/shared/validators'

import { type ETokenType } from '@/types/enum/token.enum'

export interface IAuthTokenPayload {
  exp: number
  iat: number
  id: string
  // userInfo: TUserProfileRes
  tokenType: ETokenType
  resourcePermissions: string[]
  actionPermissions: string[]
  [key: string]: unknown
}
