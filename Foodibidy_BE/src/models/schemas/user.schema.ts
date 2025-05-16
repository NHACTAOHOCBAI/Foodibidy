import { UserRole } from '~/constants/enums'
export interface UserType {
  id?: string
  role_id?: UserRole
  name: string
  email: string
  password_hash: string
  date_of_birth?: Date
  phone_number?: string | ''
  avatar_url?: string | ''
  created_at?: Date | string
  updated_at?: Date | string
}

export default class User {
  id: string
  role_id: UserRole
  name: string
  email: string
  password_hash: string
  date_of_birth?: Date
  phone_number?: string | ''
  avatar_url?: string | ''
  created_at?: Date | string
  updated_at?: Date | string

  constructor(user: UserType) {
    this.id = user.id || ''
    this.role_id = user.role_id || 1
    this.name = user.name || ''
    this.email = user.email || ''
    this.password_hash = user.password_hash || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.phone_number = user.phone_number || ''
    this.avatar_url = user.avatar_url || ''
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
  }

  toObject(): UserType {
    const createdAt = this.created_at ? this.created_at : Date.now()
    const updatedAt = this.updated_at ? this.updated_at : Date.now()

    return {
      id: this.id,
      role_id: this.role_id,
      name: this.name,
      email: this.email,
      password_hash: this.password_hash,
      date_of_birth: this.date_of_birth,
      phone_number: this.phone_number,
      avatar_url: this.avatar_url,
      created_at: createdAt as Date,
      updated_at: updatedAt as Date
    }
  }
}
