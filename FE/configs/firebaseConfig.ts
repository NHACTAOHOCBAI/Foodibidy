import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVILF-mEhw1cJdCpRGVBavDusJtBrB_xQ",
    authDomain: "foodibidy.firebaseapp.com",
    databaseURL:
        "https://foodibidy-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "foodibidy",
    storageBucket: "foodibidy.firebasestorage.app",
    messagingSenderId: "83223546755",
    appId: "1:83223546755:web:76c09ebb24ef04b1fe84b6",
    measurementId: "G-6J4YYT6G4M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
