import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { logo2 } from "../assets";

const Conversation = () => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/conversation", title: "Conversation Page" });
  }, [])

  const Bearly = () => {
    return (
    <div className="absolute mt-16 text-secondary-brown">
        <div className=" min-w-[100px] max-w-[300px] w-[100px] m-6 flex flex-col justify-center items-center">
          <img src={logo2} alt="AI-Bear"/>
          <div className=" pt-2 italic font-bold text-lg">
            Bearly
          </div>
        </div>
      </div>);
  }


  return (
    <div className="relative z-0 h-screen bg-contain bg-note-paper text-secondary-brown overflow-y-scroll">
      <HomeNavbar />
      <Bearly />


    </div>
  );
};

export default Conversation;
