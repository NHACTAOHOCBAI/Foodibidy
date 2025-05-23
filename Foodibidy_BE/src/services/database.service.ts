import dotenv from 'dotenv'
import admin from 'firebase-admin'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Firestore, CollectionReference } from 'firebase-admin/firestore'
import { AddressType } from '~/models/schemas/address.schema'
import { CartType } from '~/models/schemas/cart.schema'
import { CartDetailsType } from '~/models/schemas/cartDetail.schema'
import { CategoryType } from '~/models/schemas/category.schema'
import { DishType } from '~/models/schemas/dish.schema'
import { NotificationType } from '~/models/schemas/notification.schema'
import { OrderType } from '~/models/schemas/order.schema'
import { OrderDetailType } from '~/models/schemas/orderDetail.schema'
import { RestaurantType } from '~/models/schemas/restaurant.schema'
import { ReviewType } from '~/models/schemas/review.schema'
import { UserType } from '~/models/schemas/user.schema'
import { getAuth } from 'firebase-admin/auth'
import { Restaurant_CategoryType } from '~/models/schemas/restaurant_category.schema'
import { User_DishType } from '~/models/schemas/user_dish.schema'

dotenv.config()

let credentials
try {
  const uri = process.env.FIREBASE_ADMINSDK as string
  if (uri.startsWith('{')) {
    credentials = JSON.parse(uri)
  } else {
    credentials = require(uri)
  }
} catch (error) {
  console.error('Error loading Firebase credentials:', error)
  throw error
}

// Khởi tạo Firebase App

if (Math.abs(Date.now() - new Date().getTime()) > 30000) {
  throw new Error('System clock is out of sync!')
}

initializeApp({
  credential: cert(credentials)
  // databaseURL: 'your-database-url' // Thêm nếu dùng Realtime Database
})

// Getter cho Firebase Auth
export const auth = getAuth()

class DatabaseService {
  private db: Firestore

  constructor() {
    this.db = getFirestore()
  }

  async connect(): Promise<void> {
    try {
      //test kết nối
      await this.db.collection('test').limit(1).get()
      console.log('Connected to Firestore')
    } catch (error) {
      console.error('Error connecting to Firestore:', error)
      throw error
    }
  }
  //#region Collections
  get users(): CollectionReference<UserType> {
    return this.db.collection('Users') as CollectionReference<UserType>
  }

  get addresses(): CollectionReference<AddressType> {
    return this.db.collection('Addresses') as CollectionReference<AddressType>
  }

  get restaurants(): CollectionReference<RestaurantType> {
    return this.db.collection('Restaurants') as CollectionReference<RestaurantType>
  }

  get categories(): CollectionReference<CategoryType> {
    return this.db.collection('Categories') as CollectionReference<CategoryType>
  }

  get restaurant_category(): CollectionReference<Restaurant_CategoryType> {
    return this.db.collection('Restaurant_Categories') as CollectionReference<Restaurant_CategoryType>
  }

  get dishes(): CollectionReference<DishType> {
    return this.db.collection('Dishes') as CollectionReference<DishType>
  }

  get user_dish(): CollectionReference<User_DishType> {
    return this.db.collection('User_Dish') as CollectionReference<User_DishType>
  }

  get carts(): CollectionReference<CartType> {
    return this.db.collection('Carts') as CollectionReference<CartType>
  }

  get cart_details(): CollectionReference<CartDetailsType> {
    return this.db.collection('Cart_details') as CollectionReference<CartDetailsType>
  }

  get orders(): CollectionReference<OrderType> {
    return this.db.collection('Orders') as CollectionReference<OrderType>
  }

  get order_details(): CollectionReference<OrderDetailType> {
    return this.db.collection('Order_details') as CollectionReference<OrderDetailType>
  }

  get reviews(): CollectionReference<ReviewType> {
    return this.db.collection('Reviews') as CollectionReference<ReviewType>
  }

  get notifications(): CollectionReference<NotificationType> {
    return this.db.collection('Notifications') as CollectionReference<NotificationType>
  }
}
//#endregion
const databaseService = new DatabaseService()
export default databaseService
export { admin }
