export enum UserRole {
  ADMIN = 0,
  USER = 1,
  RESTAURANT = 2,
  SHIPPER = 3
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
