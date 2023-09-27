import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";
import { styles } from "../../styles";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Have an AI-Remember today!</h2>
        <p className="mt-3 text-black text-[17px] max-w-3xl leading-[30px]">It's free for everyone, and we have a pro for the special ones too.</p>
      </motion.div>
      <div className="flex flex-wrap justify-center items-center mt-10">
        <FreePriceCard />
        <ProPriceCard />
      </div>
    </div>
  );
};

const FreePriceCard = () => {
  return (
    <div className="max-w-[500px] py-20 px-10 m-5 rounded-[20px] bg-secondary-lightgreen flex flex-col">
      <h3 className="flex text-black font-bold text-2xl sm:text-3xl justify-center">Free</h3>
      <p className="flex justify-center text-black text-lg font-medium">to explore</p>
      <p className="text-[80px] flex justify-center text-black">$0</p>
      <div className=" text-black">
        <p className="px-5 my-2"> ✔ Basic Messages (5 msg/day) </p>
        <p className="px-5 my-2"> ✔ Conversation History (7 days) </p>
        <p className="px-5 my-2"> ✔ Access to Community Features (7 days) </p>
      </div>
      <Link to="/login" className="flex flex-col">
        <button className="divide-inherit rounded-full p-5 mt-4 bg-secondary-brown">Try Now</button>
      </Link>
    </div>
  );
};

const ProPriceCard = () => {
  return (
    <div className="min-w-[50%] max-w-[1000px] py-20 px-10 m-5 rounded-[20px] bg-primary-lightblue flex flex-col">
      <h3 className="flex text-black font-bold text-2xl sm:text-3xl justify-center">Pro</h3>
      <p className="flex justify-center text-black text-lg font-medium">to unlock a world of memories</p>
      <p className="text-[60px] flex justify-center items-center text-black">
        $0.99
        <span className="text-sm">/month</span>
      </p>
      <p className="text-black flex justify-center">or</p>
      <p className="text-[60px] flex justify-center items-center text-black">
        $9.99
        <span className="text-sm">/lifetime</span>
      </p>
      <div className=" text-black flex flex-col">
        <p className="px-5 my-2"> ✔ Unlimited Messages </p>
        <p className="px-5 my-2"> ✔ Unlimited Conversation History </p>
        <p className="px-5 my-2"> ✔ Ad-Free Experience </p>
        <p className="px-5 my-2"> ✔ Full Customization Options </p>
        <p className="px-5 my-2"> ✔ Priority Customer Support </p>
        <p className="px-5 my-2"> ✔ Early Access to New Features </p>
      </div>
      <button className="rounded-full p-5 mt-4 bg-secondary-brown">Upgrade Now</button>
    </div>
  );
};

export default SectionWrapper(Pricing, "pricing");
