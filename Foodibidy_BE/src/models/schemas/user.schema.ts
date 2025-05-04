import { UserRole } from '~/constants/enums'
export interface UserType {
  user_id: string // Firestore document ID
  role_id?: UserRole
  name: string
  email: string
  password_hash: string
  date_of_birth?: Date
  phone_number?: string | ''
  avatar_url?: string | ''
  is_active?: boolean
  created_at?: Date
  updated_at?: Date
}
// Use class to use for type and create user object for db.
export default class User {
  user_id: string // Firestore document ID
  role_id: UserRole
  name: string
  email: string
  password_hash: string
  date_of_birth?: Date
  phone_number?: string | ''
  avatar_url?: string | ''
  is_active?: boolean
  created_at?: Date
  updated_at?: Date

  constructor(user: UserType) {
    this.user_id = user.user_id
    this.role_id = user.role_id || 1
    this.name = user.name || ''
    this.email = user.email || ''
    this.password_hash = user.password_hash || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.phone_number = user.phone_number || ''
    this.avatar_url = user.avatar_url || ''
    this.is_active = user.is_active || true
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
  }

  toObject(): UserType {
    const createdAt = this.created_at ? this.created_at : Date.now() // Or omit the field if you prefer
    const updatedAt = this.updated_at ? this.updated_at : Date.now()

    return {
      user_id: this.user_id,
      role_id: this.role_id,
      name: this.name,
      email: this.email,
      password_hash: this.password_hash,
      date_of_birth: this.date_of_birth,
      phone_number: this.phone_number, // Use nullish coalescing
      avatar_url: this.avatar_url, // Use nullish coalescing
      is_active: this.is_active,
      created_at: createdAt as Date,
      updated_at: updatedAt as Date
    }
  }
}
