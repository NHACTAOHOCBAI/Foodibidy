  export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    RESTAURANT = 'restaurant',
    SHIPPER = 'shipper'
  }

export enum RestaurantStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CLOSED = 'closed'
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum AddressTypeName {
  HOME = 'home',
  WORK = 'work'
}

export enum TokenTypes {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  VerifiedEmailToken
}
export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
