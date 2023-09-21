import Hero from "../components/landing_page/Hero";
import Navbar from "../components/landing_page/Navbar";
import Features from "../components/landing_page/Features";
import OthersWords from "../components/landing_page/OthersWords";
import WhyUs from "../components/landing_page/WhyUs";
import Pricing from "../components/landing_page/Pricing";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Landing = ({ user }) => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Landing Page" });
  }, [])

  return (
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
  );
};

export default Landing;
