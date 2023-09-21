import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Diary = () => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/diary", title: "Diary Page" });
  }, [])

  return (
    <>
      <HomeNavbar />
      <div>Diary</div>
    </>
  );
};

export default Diary;
