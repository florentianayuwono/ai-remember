import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Communities = () => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/communities", title: "Communities Page" });
  }, [])

  return (
    <>
      <HomeNavbar />
      <div>Communities</div>
    </>
  );
};

export default Communities;
