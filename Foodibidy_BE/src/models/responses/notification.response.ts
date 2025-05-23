import { UserType } from '../schemas/user.schema'

export interface GetNotificationRes {
  id?: string
  user: Pick<UserType, 'id' | 'fullName'>
  content: string
  read?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}
