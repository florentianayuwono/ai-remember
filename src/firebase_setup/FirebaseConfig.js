import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getCountFromServer,setDoc, getDoc, addDoc, serverTimestamp,collection } from "@firebase/firestore"
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

// Function to create a document for each day
const addDataForDay = async (email, date) => {
  try {
    const todayDocRef = doc(firestore, 'users', email,'dates',date);
    const todayDocSnap = await getDoc(todayDocRef)
    if (todayDocSnap.data() == undefined) {
      const msg = {
        createdAt: serverTimestamp(),
          chatId: 0,
          isUser: false,
          content: "Hello! How's your day going?",
          mood: "happy"
      }
      addMsg(email, date, msg);
      await setDoc(todayDocRef,{
        diary: ""
      })
      console.log('Today data added with ID: ', todayDocRef.id);
    } 
  } catch (error) {
    console.error('Error adding user: ', error);
  }
  
};

const getChatCount = async (email,date) => {
  const coll = collection(firestore, 'users', email,'dates',date, "chats");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count
};

const addMsg = async (email, date, msg) => {
  await addDoc(collection(firestore, 'users', email,'dates',date, "chats"), msg);
}


export { auth, firestore, addDataForDay, getChatCount, addMsg };