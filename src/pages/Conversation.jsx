import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { logo2 } from "../assets";
import VaraText from "../components/chat_page/VaraText";
import { addDataForToday, auth } from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

const Conversation = () => {
  const [user, loading] = useAuthState(auth);
  let newDate = new Date()
  let displayDate = newDate.toLocaleDateString('en-En',{ year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/conversation", title: "Conversation Page" });
    addDataForToday(user.email, displayDate);
  }, [])


  const Bearly = () => {
    return (
    <div className=" text-secondary-brown min-w-[100px] max-w-[300px] w-[100px]">
          <img src={logo2} alt="AI-Bear"/>
          <div className=" pt-2 italic font-bold text-lg">
            Bearly
          </div>
      </div>);
  }

  const DisplayDate = () => {
    return(
      <div className="">
        <VaraText text={displayDate}/>
      </div>
    );
  }


  return ( loading ? < Loading /> :
    <div className="relative z-0 h-screen bg-contain bg-note-paper text-secondary-brown overflow-y-scroll">
      <HomeNavbar />
      <div className="mt-24 mx-6 flex justify-between items-start">
        <Bearly />
        <DisplayDate />
      </div>
      


    </div>
  );
};

export default Conversation;
