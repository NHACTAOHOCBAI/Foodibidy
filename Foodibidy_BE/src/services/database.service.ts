import dotenv from 'dotenv'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Firestore, CollectionReference } from 'firebase-admin/firestore'
import { CategoryType } from '~/models/schemas/category.schema'
import { UserType } from '~/models/schemas/user.schema'
dotenv.config()
let credentials
try {
  const uri = process.env.FIREBASE_ADMINSDK

  credentials = require(uri as string)
} catch (error) {
  console.error('Error loading Firebase credentials:', error)
  throw error
}

// Khởi tạo Firebase App
initializeApp({
  credential: cert(credentials)
  // databaseURL: 'your-database-url' // Thêm nếu dùng Realtime Database
})

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

  get users(): CollectionReference<UserType> {
    return this.db.collection('Users') as CollectionReference<UserType>
  }

  get addresses(): CollectionReference<UserType> {
    return this.db.collection('Addresses') as CollectionReference<UserType>
  }

  get restaurants(): CollectionReference<UserType> {
    return this.db.collection('Restaurants') as CollectionReference<UserType>
  }

  get categories(): CollectionReference<CategoryType> {
    return this.db.collection('Categories') as CollectionReference<UserType>
  }

  get foods(): CollectionReference<UserType> {
    return this.db.collection('Foods') as CollectionReference<UserType>
  }

  get carts(): CollectionReference<UserType> {
    return this.db.collection('Carts') as CollectionReference<UserType>
  }

  get cart_details(): CollectionReference<UserType> {
    return this.db.collection('Cart_details') as CollectionReference<UserType>
  }

  get orders(): CollectionReference<UserType> {
    return this.db.collection('Orders') as CollectionReference<UserType>
  }

  get order_details(): CollectionReference<UserType> {
    return this.db.collection('Order_details') as CollectionReference<UserType>
  }

  get reviews(): CollectionReference<UserType> {
    return this.db.collection('Reviews') as CollectionReference<UserType>
  }

  get announcements(): CollectionReference<UserType> {
    return this.db.collection('Announcements') as CollectionReference<UserType>
  }
}

const databaseService = new DatabaseService()
export default databaseService
