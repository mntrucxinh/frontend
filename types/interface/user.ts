export interface UserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface LinkedAccountSummaryDto {
  id: string
  type: string
  account: string
  createdAt: Date
  updatedAt: Date
}

export interface UserLinkedAccount {
  id: string
  email: string
  firstName: string
  lastName: string
  linkedAccounts: LinkedAccountSummaryDto[]
}
