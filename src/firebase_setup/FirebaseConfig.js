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
const addDataForDay = async (email, date, content) => {
  try {
    const todayDocRef = doc(firestore, 'users', email,'dates',date);
    const todayDocSnap = await getDoc(todayDocRef)
    if (todayDocSnap.data() == undefined) {
      const msg = {
        createdAt: serverTimestamp(),
          isUser: false,
          content: content.text,
          mood: "happy"
      }
      await setDoc(todayDocRef,{
        diary: ""
      })
      addMsg(email,date,msg,'0');
      console.log('Today data added with ID: ', todayDocRef.id);
    } 
    const msg = {
      createdAt: serverTimestamp(),
        isUser: false,
        content: "Hello! How's your day going?",
        mood: "happy"
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

const addMsg = async (email, date, msg, chatId) => {
  const coll = collection(firestore, 'users', email,'dates',date, "chats");
  const ref = doc(coll,chatId);
  await setDoc(ref, msg);
}

const getAllMsg = async() => {
  const coll = collection(firestore, 'users', email,'dates',date, "chats");

}

//not very safe for public repo
const getOpenAIAPIKey = async(docName) => {
  const docRef = doc(firestore,"api_key",docName);
  const docSnap = await getDoc(docRef);
  return docSnap?.data().api_key;
  
}


export { auth, firestore, getOpenAIAPIKey, addDataForDay, getChatCount, addMsg };