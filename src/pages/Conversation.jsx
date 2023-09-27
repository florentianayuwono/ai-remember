import ReactGA from "react-ga4";
import { GiFairyWand } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import {auth,firestore, getHumanMsg} from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, query, onSnapshot, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import Loading from "./Loading";
import { Chat, ChatInput, DiaryModal, HomeNavbar } from "../components";
import { continueChat, startChat } from "../langchain_setup/ChatLangchainConfig";
import { diaryGenerator } from "../langchain_setup/DiaryLangChainConfig";

const Conversation = () => {
  const [user, loading] = useAuthState(auth);
  const bottomRef = useRef(null);
  let newDate = new Date();
  let displayDate = newDate.toLocaleDateString("en-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [chats, loadingc, error] = useCollection(
    collection(firestore, "users", user.email, "dates", displayDate, "chats")
  );

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/conversation",
      title: "Conversation Page",
    });
  }, []);

  useEffect(() => {
    
    //create message for today
    const getNewContent = async () => {
      await startChat(user.email, displayDate);
    };

    //get old chat content
    const getOldContent = async () => {
      await continueChat(user.email,displayDate);
    }

    if (chats?.docs.length == 0 && (!loadingc && !loading)) {
      getNewContent();
    } else {
      getOldContent();
    }
  }, [loadingc]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const DisplayDate = () => {
    return (
      <div className="mt-24 flex flex-col items-end mr-12">
        <div className=" font-handwriting-user text-2xl">{displayDate}</div>
      </div>
    );
  };

  return (loading || loadingc) ? (
    <Loading />
  ) : (
    <>
      <div className="relative z-0 h-screen justify-between flex flex-col bg-contain bg-note-paper text-secondary-brown overflow-hidden">
        <HomeNavbar />
        <DisplayDate />

        <div className=" overflow-auto">
          <Chat chats={chats} />
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-col">
          <DiaryButton />
          <ChatInput email={user?.email} date={displayDate} />
        </div>
      </div>
    </>
  );
};

const DiaryButton = () => {
  const [user, loading] = useAuthState(auth);
  const openState = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = openState;

  let newDate = new Date();
  let displayDate = newDate.toLocaleDateString("en-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Perform the asynchronous operation and update the state when it's done
    const fetchDiaryContent = async () => {
      try {
        const userChats = await getHumanMsg(user.email, displayDate);
        console.log("chat:"+ userChats)
        const content = await diaryGenerator(userChats);
        console.log(content)
        setContent(content);
        
      } catch (error) {
        // Handle errors if needed
        console.error("An error occurred:", error);
      }
    };

    fetchDiaryContent(); // Call the async function when the component mounts
  }, [displayDate, user.email]); 

  const handleClosePopup = () => {
    setIsDiaryModalOpen(false);
  };

  const openDiaryModal = () => {
    setIsDiaryModalOpen(true);
  };

  const handleRegenerateDiary = async () => {
    try {
      const userChats = await getHumanMsg(user.email, displayDate);
      const newContent = await diaryGenerator(userChats);
      setContent(newContent);
    } catch (error) {
      // Handle errors if needed
      console.error("An error occurred while regenerating the diary:", error);
    }
  }

  return (
    <div className="flex items-center justify-center cursor-pointer">
      {isDiaryModalOpen ? (
        // Step 2: Use the imported DiaryModal component
        <DiaryModal
        openState={openState}
        handleClosePopup={handleClosePopup}
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        email={user.email}
        handleRegenerateDiary={handleRegenerateDiary}
      />
      ) : (
        <div
          className="flex items-center justify-center mb-2 py-2 px-4 rounded-2xl bg-primary-pink bg-opacity-50 text-secondary-purple select-none"
          onClick={openDiaryModal}
        >
          <GiFairyWand />
          Generate Diary
        </div>
      )}
    </div>
  );
};

export default Conversation;
