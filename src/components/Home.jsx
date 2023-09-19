import Hero from "./Hero";
import Navbar from "./Navbar";
import Features from "./Features";
import OthersWords from "./OthersWords";
import WhyUs from "./WhyUs";
import Pricing from "./Pricing";

const Home = () => {
  return (
    <div className="relative z-0 bg-[#57375D]">
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
