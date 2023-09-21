import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import Calendar from "../components/diary/Calendar";

const Diary = ({ user }) => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/diary", title: "Diary Page" });
  }, []);

  return (
    <div className="relative z-0 bg-primary-lightpink">
      <HomeNavbar/>
      <Calendar/>
    </div>
  );
};

export default Diary;
