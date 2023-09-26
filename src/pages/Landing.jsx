import Hero from "../components/landing_page/Hero";
import Navbar from "../components/landing_page/Navbar";
import Features from "../components/landing_page/Features";
import OthersWords from "../components/landing_page/OthersWords";
import WhyUs from "../components/landing_page/WhyUs";
import Pricing from "../components/landing_page/Pricing";
import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import { AlertDialog } from "../components";

const Landing = ({ user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleChange = (state) => {
    setOpenDialog(state);
  }

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Landing Page" });
  }, []);

  return (
    <>
      {openDialog && <AlertDialog handleChange={handleChange} title={"Under development..."} description={"coming soon... or will it?"}/>}
      <div className="relative z-0 bg-primary-purple">
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar loggedIn={user} />
          <Hero />
        </div>
        <Features />
        <WhyUs />
        <OthersWords />
        <div className="relative z-0">
          <Pricing />
        </div>
      </div>
    </>
  );
};

export default Landing;
