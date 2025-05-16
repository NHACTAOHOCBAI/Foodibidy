// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase-admin/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVILF-mEhw1cJdCpRGVBavDusJtBrB_xQ',
  authDomain: 'foodibidy.firebaseapp.com',
  projectId: 'foodibidy',
  storageBucket: 'foodibidy.firebasestorage.app',
  messagingSenderId: '83223546755',
  appId: '1:83223546755:web:76c09ebb24ef04b1fe84b6',
  measurementId: 'G-6J4YYT6G4M'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
const analytics = getAnalytics(app)
