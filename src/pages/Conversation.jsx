import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { GiFairyWand } from "react-icons/gi";
import { addDataForDay, auth, firestore } from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import Loading from "./Loading";
import Chat from "../components/chat_page/Chat";
import ChatInput from "../components/chat_page/ChatInput";

const Conversation = () => {
  const [user, loading] = useAuthState(auth);
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
    addDataForDay(user.email, displayDate);
  }, []);

  const DisplayDate = () => {
    return (
      <div className="mt-24 flex flex-col items-end mr-12">
        <div className=" font-handwriting-user text-2xl">{displayDate}</div>
      </div>
    );
  };

  const DiaryButton = () => (
    <div className="flex items-center justify-center cursor-pointer">
      <div className="flex items-center justify-center mb-2 py-2 px-4 rounded-2xl bg-primary-pink bg-opacity-50 text-secondary-purple select-none">
        <GiFairyWand />
        Generate Diary
      </div>
    </div>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen justify-between flex flex-col bg-contain bg-note-paper text-secondary-brown overflow-hidden">
      <div className=" overflow-auto">
        <HomeNavbar />
        <DisplayDate />
        <Chat chats={chats} />
      </div>
      <div className="flex flex-col">
        <DiaryButton />
        <ChatInput email={user?.email} date={displayDate} />
      </div>  
    </div>
  );
};

export default Conversation;
