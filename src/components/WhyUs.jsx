import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { reasons } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ReasonCard = ({
  index,
  name,
  description,
  image,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className=" bg-secondary-beige p-5 rounded-2xl w-full my-5"
      >
      <div className="flex">
      <div className="text-[100px] mx-10">{image}</div>
        <div className="mt-5">
          <h3 className="text-purple-900 font-bold text-2xl sm:text-3xl">{name}</h3>
          <p className="mt-2 text-secondary-brown text-md sm:text-lg">{description}</p>
        </div>
      </div>

        
      </Tilt>
    </motion.div>
  );
};

const WhyUs = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Why AI-Remember?</h2>
        <p className="mt-3 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]">Because it's incredible! Here is why we love it...</p>
      </motion.div>

      <div className="mt-20 flex flex-col">
        {reasons.map((reason, index) => (
          <ReasonCard key={`reason-${index}`} index={index} {...reason} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(WhyUs, "whyus");
