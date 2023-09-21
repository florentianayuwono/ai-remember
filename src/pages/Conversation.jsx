import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Conversation = () => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/conversation", title: "Conversation Page" });
  }, [])


  return (
    <>
      <HomeNavbar />
      <div>Conversation</div>
    </>
  );
};

export default Conversation;
