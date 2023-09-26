import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { GiFairyWand } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import {
  addDataForDay,
  auth,
  firestore,
} from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import Loading from "./Loading";
import Chat from "../components/chat_page/Chat";
import ChatInput from "../components/chat_page/ChatInput";
import DiaryModal from "../components/diary/DiaryModal";
import toast from "react-hot-toast";
import { startChat } from "../langchain_setup/ChatLangchainConfig";

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
    let content = {};

    const getContent = async() => {
      content = await startChat();
      addDataForDay(user.email, displayDate, content);
    }
    if (chats?.docs.length == 0 && !loadingc) {
      getContent();
    } 
  }, [loadingc])

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
  );
};

const DiaryButton = () => {
  const openState = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = openState;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleClosePopup = () => {
    setIsDiaryModalOpen(false);
  };

  const handleSubmitDiary = async (e) => {
    e.preventDefault();

    // try {
    //   if (title !== "" && content !== "") {
    //     await addDoc(postsCollectionRef, {
    //       title,
    //       content,
    //       author_uid: user?.uid,
    //       // logo: user?.photoURL,
    //       // name: user?.displayName || userData?.name,
    //       // email: user?.email || userData?.email,
    //       timestamp: serverTimestamp(),
    //     });
    //     handleClosePopup();
    //     setTitle("");
    //     setContent("");
    //     toast.success("Successful created post!");
    //   } else {
    //     toast.error("Title and content can't be empty!");
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    // }
  };

  const openDiaryModal = () => {
    setIsDiaryModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center cursor-pointer">
      {isDiaryModalOpen ? (
        // Step 2: Use the imported DiaryModal component
        <DiaryModal
        openState={openState}
        handleClosePopup={handleClosePopup}
        title={title}
        content={content}
        handleSubmitDiary={handleSubmitDiary}
        setTitle={setTitle}
        setContent={setContent}
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
