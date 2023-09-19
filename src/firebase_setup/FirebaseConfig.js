import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBzRAQygXp7iL6oepOig6sTxubfTHW7nOc",
  authDomain: "ai-remember.firebaseapp.com",
  projectId: "ai-remember",
  storageBucket: "ai-remember.appspot.com",
  messagingSenderId: "60106174976",
  appId: "1:60106174976:web:af79f5c1819fff32e65ee5",
  measurementId: "G-P3ZGZ14ZR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };