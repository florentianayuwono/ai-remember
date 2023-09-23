import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import VaraText from "../components/chat_page/VaraText";
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
      <div className="mt-24 flex justify-end">
        <VaraText text={displayDate} />
      </div>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen justify-between flex flex-col bg-contain bg-note-paper text-secondary-brown overflow-hidden">
      <div>
        <HomeNavbar />  
        <DisplayDate />
        <Chat chats={chats}/>
      </div>
      
      <ChatInput />
      
    </div>
  );
};

export default Conversation;
