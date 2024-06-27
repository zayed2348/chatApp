// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuBKfn8nNZMN0PqBRb89NyIVCn_RbdMFw",
  authDomain: "whatzapp-2ee18.firebaseapp.com",
  projectId: "whatzapp-2ee18",
  storageBucket: "whatzapp-2ee18.appspot.com",
  messagingSenderId: "423924323490",
  appId: "1:423924323490:web:4449d39905aa85754073fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage = getStorage();
export const db = getFirestore();
