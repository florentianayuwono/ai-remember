import Hero from "../components/landing_page/Hero";
import Navbar from "../components/landing_page/Navbar";
import Features from "../components/landing_page/Features";
import OthersWords from "../components/landing_page/OthersWords";
import WhyUs from "../components/landing_page/WhyUs";
import Pricing from "../components/landing_page/Pricing";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary-purple">
      <div className="bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Features />
      <OthersWords />
      <WhyUs />
      <div className="relative z-0">
        <Pricing />
      </div>
    </div>
  );
};

export default Home;
