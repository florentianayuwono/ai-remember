import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";
import { styles } from "../../styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../common/AlertDialog";
import { sleepybear } from "../../assets";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, upgradeUserToPro } from "../../firebase_setup/FirebaseConfig";
import { PROMO_CODE } from "../../constants";
import toast from "react-hot-toast";

const Pricing = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Have an AI-Remember today!</h2>
        <p className="mt-3 text-black text-[17px] max-w-3xl leading-[30px]">
          It's free for everyone, and we have a pro for the special ones too.
        </p>
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
      <h3 className="flex text-black font-bold text-2xl sm:text-3xl justify-center">
        Free
      </h3>
      <p className="flex justify-center text-black text-lg font-medium">
        to explore
      </p>
      <p className="text-[80px] flex justify-center text-black">$0</p>
      <div className=" text-black">
        <p className="px-5 my-2"> ✔ Basic Messages (5 msg/day) </p>
        <p className="px-5 my-2"> ✔ Basic Diaries (5 diaries/day) </p>
        <p className="px-5 my-2"> ✔ Conversation History (7 days) </p>
        <p className="px-5 my-2"> ✔ Access to Community Features (7 days) </p>
      </div>
      <Link to="/login" className="flex flex-col">
        <button className="divide-inherit rounded-full p-5 mt-4 bg-secondary-brown">
          Try Now
        </button>
      </Link>
    </div>
  );
};

const ProPriceCard = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const openAlertDialog = () => {
    if (user) {
      setIsAlertOpen(true);
    } else {
      toast("Please login first", {
        icon: "⌛",
      });
    }
   
  };

  const closeAlertDialog = () => {
    setIsAlertOpen(false);
    setError("")
    setCode("")
  };

  const handleSubmit = async() => { 
    if (code == PROMO_CODE) {
      await upgradeUserToPro(user.email);
      toast.success("Upgraded to PRO 🐾")
      closeAlertDialog();
      //set user identity to pro
    } else {
      setError("Invalid code");
    }
  }

  return (
    <div className="min-w-[50%] max-w-[1000px] py-20 px-10 m-5 rounded-[20px] bg-primary-lightblue flex flex-col">
    
      <h3 className="flex text-black font-bold text-2xl sm:text-3xl justify-center">
        Pro
      </h3>
      <p className="flex justify-center text-black text-lg font-medium">
        to unlock a world of memories
      </p>
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
        <p className="px-5 my-2"> ✔ Unlimited Diaries </p>
        <p className="px-5 my-2"> ✔ Unlimited Conversation History </p>
        <p className="px-5 my-2"> ✔ Ad-Free Experience </p>
        <p className="px-5 my-2"> ✔ Full Customization Options </p>
        <p className="px-5 my-2"> ✔ Priority Customer Support </p>
        <p className="px-5 my-2"> ✔ Early Access to New Features </p>
      </div>
      <button className="rounded-full p-5 mt-4 bg-secondary-brown" onClick={openAlertDialog}>
        Upgrade Now
      </button>
      {isAlertOpen && (
        <AlertDialog
          title="Thanks for the enthusiasm!🤗"
          description="The Pro version is currently tucked away in a cozy bear den, accessible by invitation only. 🐻 Don't hibernate your interest! We promise to make it public soon."
          image={sleepybear}
          handleChange={closeAlertDialog}
          code={code}
          setCode={setCode}
          error={error}
          handleSubmit={handleSubmit}
        /> 
      )}
    </div>
  );
};

export default SectionWrapper(Pricing, "pricing");
