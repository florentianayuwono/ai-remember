import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import { styles } from "../../styles";


const Pricing = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Pricing.</h2>
        <p className="mt-3 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]">Start for Free, Unlock Greater Benefits with Pro Upgrade.</p>
      </motion.div>
      <div className="flex justify-center items-center mt-20">
        <FreePriceCard />
        <ProPriceCard />
      </div>

    </div>
  )
};

const FreePriceCard = () => {
  return(
    <div className="w-[40%] p-5 rounded-[20px] bg-primary-purple flex flex-col">
      <h3 className="flex text-purple-900 font-bold text-2xl sm:text-3xl justify-center">Free</h3>
      <p className="flex justify-center text-purple-800 text-lg font-medium">to explore</p>
      <p className="text-[80px] flex justify-center text-purple-900">$0</p>
      <div className=" text-[rgb(87,55,93)]">
        <p className="px-5 my-2"> ✔ Basic Messages (5 msg/day) </p>
        <p className="px-5 my-2"> ✔ Conversation History (7 days) </p>
        <p className="px-5 my-2"> ✔ Access to Community Features (7 days) </p>
      </div>
      <button className="rounded-full p-5 mt-4 bg-[#57375D]">Try Now</button>
    </div>
  )
}

const ProPriceCard = () => {
  return(
    <div className="w-[60%] p-5 rounded-[20px] bg-white flex flex-col">
      <h3 className="flex text-purple-900 font-bold text-2xl sm:text-3xl justify-center">Pro</h3>
      <p className="flex justify-center text-purple-800 text-lg font-medium">to unlock a world of memories</p>
      <p className="text-[80px] flex justify-center items-center text-purple-900">
        $0.99
        <span className="text-sm">/month</span>
      </p>
      <p className="text-[#57375D] flex justify-center">or</p>
      <p className="text-[80px] flex justify-center items-center text-purple-900">
        $9.99
        <span className="text-sm">/lifetime</span>
      </p>
      <div className=" text-[#57375D] flex flex-col">
        <p className="px-5 my-2"> ✔ Unlimited Messages </p>
        <p className="px-5 my-2"> ✔ Unlimited Conversation History </p>
        <p className="px-5 my-2"> ✔ Ad-Free Experience </p>
        <p className="px-5 my-2"> ✔ Full Customization Options </p>
        <p className="px-5 my-2"> ✔ Priority Customer Support </p>
        <p className="px-5 my-2"> ✔ Early Access to New Features </p>
      </div>
      <button className="rounded-full p-5 mt-4 bg-[#57375D]">Upgrade Now</button>
    </div>
  )
}

export default SectionWrapper(Pricing, "pricing");
