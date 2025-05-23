import { UserRole } from '~/constants/enums'
import { AddressType } from './address.schema'
export interface UserType {
  id?: string
  roleId?: UserRole
  fullName: string
  email: string
  passwordHash: string
  dateOfBirth?: Date | string
  phoneNumber?: string | ''
  avatar?: string | ''
  address?: Omit<AddressType, 'userId'>[] | []
  cartId?: string | ''

  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class User {
  id: string
  roleId: UserRole
  fullName: string
  email: string
  passwordHash: string
  dateOfBirth?: Date | string
  phoneNumber?: string | ''
  avatar?: string | ''
  address?: Omit<AddressType, 'userId'>[] | []
  cartId?: string | ''
  createdAt?: Date | string
  updatedAt?: Date | string

  constructor(user: UserType) {
    this.id = user.id || ''
    this.roleId = user.roleId || UserRole.USER
    this.fullName = user.fullName || ''
    this.email = user.email || ''
    this.passwordHash = user.passwordHash || ''
    this.dateOfBirth = user.dateOfBirth || new Date()
    this.phoneNumber = user.phoneNumber || ''
    this.avatar = user.avatar || ''
    this.address = user.address || []
    this.cartId = user.cartId || ''
    this.createdAt = user.createdAt || new Date()
    this.updatedAt = user.updatedAt || new Date()
  }

  toObject(): UserType {
    return {
      id: this.id,
      roleId: this.roleId,
      fullName: this.fullName,
      email: this.email,
      passwordHash: this.passwordHash,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      avatar: this.avatar,
      address: this.address,
      cartId: this.cartId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
