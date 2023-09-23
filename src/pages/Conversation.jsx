import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
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
    collection(firestore, "users", user.email,"dates",displayDate,"chats")
  )

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
      <div className="mt-24 flex justify-end mr-6">
        <div className=" font-handwriting-user text-2xl">{displayDate}</div>
      </div>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen justify-between flex flex-col bg-contain bg-note-paper text-secondary-brown overflow-hidden">
      <div className=" overflow-auto">
        <HomeNavbar />  
        <DisplayDate />
        <Chat chats={chats}/>
      </div>
      
      <ChatInput email={user?.email} date={displayDate} />
      
    </div>
  );
};

export default Conversation;
