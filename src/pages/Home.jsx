import Hero from "../components/home_page/Hero";
import Navbar from "../components/home_page/Navbar";
import Features from "../components/home_page/Features";
import OthersWords from "../components/home_page/OthersWords";
import WhyUs from "../components/home_page/WhyUs";
import Pricing from "../components/home_page/Pricing";

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
