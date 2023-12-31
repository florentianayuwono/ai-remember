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
  orderBy,
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
        generateDiaryCount: 0,
      });
      addMsg(email, date, content, "0",false);
    }
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

// Function to update diary count for a specific date
const updateDiaryCount = async (email, date, count) => {
  try {
    const todayDocRef = doc(firestore, 'users', email, 'dates', date);
    const todayDocSnap = await getDoc(todayDocRef);

    if (todayDocSnap.exists()) {
      // Update the diary content
      await updateDoc(todayDocRef, {
        generateDiaryCount: count
      });

      console.log('Diary count updated for date: ', date);
    } else {
      console.log('Document for this date does not exist.');
    }
  } catch (error) {
    console.error('Error updating diary count: ', error);
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
  const q = query(coll, orderBy('createdAt'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    chats.push(doc.data());
  });
  return chats;
};

const getHumanMsg = async (email, date) => {
  let chats = [];
  const q = query(
    collection(firestore, "users", email, "dates", date, "chats"),
    where("isUser", "==", true), orderBy('createdAt')
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

const getSevenDaysDiary = async (email) => {
  let diaries = [];
  const diaryCollectionRef = collection(firestore, "users", email, 'dates');
  const q = query(diaryCollectionRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    diaries.push(doc.data().diary);
  });
  const results = diaries.slice(-7)
  return results;
}

const upgradeUserToPro = async (email) => {
  const userDoc = doc(firestore, "users", email);
  await setDoc(userDoc,{
    isPro: true
  })
}

const isUserPro = async (email) => {
  const userDoc = doc(firestore, "users", email);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    if (data.isPro == true) {
      return true;
    }
  }
  return false;
}

const canPerformSearch = async (email,date) => {
  const dateDoc = doc(firestore, "users", email, "dates", date);
  const dateDocSnap = await getDoc(dateDoc);
  if (dateDocSnap.exists()) {
    const data = dateDocSnap.data();
    //max of 1 generation
    if (data.generateSearchCount == undefined) {
      updateDoc(dateDoc,{
        generateSearchCount: 1
      })
      return true;
    }
  }
  return false;
}

export {
  auth,
  firestore,
  getOpenAIAPIKey,
  getAllMsg,
  getHumanMsg,
  addDataForDay,
  canPerformSearch,
  getSevenDaysDiary,
  getChatCount,
  addMsg,
  updateDiaryContent,
  updateDiaryCount,
  upgradeUserToPro,
  isUserPro
};
