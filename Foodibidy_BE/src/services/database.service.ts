import dotenv from 'dotenv'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Firestore, CollectionReference } from 'firebase-admin/firestore'
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

  // Getter cho collection Users
  get users(): CollectionReference<UserType> {
    return this.db.collection('Users') as CollectionReference<UserType>
  }
}

const databaseService = new DatabaseService()
export default databaseService
