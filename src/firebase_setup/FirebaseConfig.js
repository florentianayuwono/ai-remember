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
          isUser: false,
          content: "Hello! How's your day going?",
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

// Function to update diary content for a specific date
const updateDiaryContent = async (email, date, diaryContent) => {
  try {
    const todayDocRef = doc(firestore, 'users', email, 'dates', date);
    const todayDocSnap = await getDoc(todayDocRef);

    if (todayDocSnap.exists()) {
      // Update the diary content
      await updateDoc(todayDocRef, {
        diary: diaryContent,
      });

      console.log('Diary content updated for date: ', date);
    } else {
      console.log('Document for this date does not exist.');
    }
  } catch (error) {
    console.error('Error updating diary content: ', error);
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

//not very safe for public repo
const getOpenAIAPIKey = async() => {
  const docRef = doc(firestore,"api_key","openai_api_key");
  const docSnap = await getDoc(docRef);
  return docSnap?.data().api_key;
  
}


export { auth, firestore, getOpenAIAPIKey, addDataForDay, updateDiaryContent, getChatCount, addMsg };