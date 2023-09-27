import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  query,
  updateDoc,
  where,
  getCountFromServer,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  collection,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzRAQygXp7iL6oepOig6sTxubfTHW7nOc",
  authDomain: "ai-remember.firebaseapp.com",
  projectId: "ai-remember",
  storageBucket: "ai-remember.appspot.com",
  messagingSenderId: "60106174976",
  appId: "1:60106174976:web:af79f5c1819fff32e65ee5",
  measurementId: "G-P3ZGZ14ZR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Function to create a document for each day
const addDataForDay = async (email, date, content) => {
  try {
    const todayDocRef = doc(firestore, "users", email, "dates", date);
    const todayDocSnap = await getDoc(todayDocRef);
    if (todayDocSnap.data() == undefined) {
      await setDoc(todayDocRef, {
        diary: "",
      });
      addMsg(email, date, content.text, "0",false);
      console.log("Today data added with ID: ", todayDocRef.id);
    }
    const msg = {
      createdAt: serverTimestamp(),
      isUser: false,
      content: "Hello! How's your day going?",
    };
  } catch (error) {
    console.error("Error adding user: ", error);
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


const getChatCount = async (email, date) => {
  const coll = collection(firestore, "users", email, "dates", date, "chats");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

const addMsg = async (email, date, content, chatId, isUser) => {
  const coll = collection(firestore, "users", email, "dates", date, "chats");
  const ref = doc(coll, chatId);
  const msg = {
    createdAt: serverTimestamp(),
    isUser: isUser,
    content: content,
  };
  await setDoc(ref, msg);
};

const getAllMsg = async (email, date) => {
  let chats = [];
  const coll = collection(firestore, "users", email, "dates", date, "chats");
  const q = query(
    collection(firestore, "users", email, "dates", date, "chats")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    chats.push(doc.data());
  });
  return chats;
};

//getAllMsg("xuyi9272@gmail.com","September 26, 2023")

const getHumanMsg = async (email, date) => {
  let chats = [];
  const q = query(
    collection(firestore, "users", email, "dates", date, "chats"),
    where("isUser", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    chats.push(doc.data());
  });
  // Extract the content strings
  const contentStrings = chats.map((chat) => chat.content);

  // Combine the content strings into one long string
  const combinedContent = contentStrings.join(' ');
  return combinedContent;
};

//getHumanMsg("xuyi9272@gmail.com","September 26, 2023")

//not very safe for public repo
const getOpenAIAPIKey = async (docName) => {
  const docRef = doc(firestore, "api_key", docName);
  const docSnap = await getDoc(docRef);
  return docSnap?.data().api_key;
};

export {
  auth,
  firestore,
  getOpenAIAPIKey,
  getAllMsg,
  getHumanMsg,
  addDataForDay,
  getChatCount,
  addMsg,
  updateDiaryContent
};
