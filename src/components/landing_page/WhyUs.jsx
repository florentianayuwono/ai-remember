import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { reasons } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";

const ReasonCard = ({ index, name, description, image }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className=" bg-white bg-opacity-90 p-5 rounded-2xl w-full m-5"
      >
        <div className="flex m-5">
          <div className="text-[100px]">{image}</div>
          <div className="m-2">
            <h3 className="text-purple-900 font-bold text-2xl sm:text-3xl">
              {name}
            </h3>
            <p className="mt-2 text-secondary-brown text-md sm:text-lg">
              {description}
            </p>
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
        <p className="mt-3 text-black text-[17px] max-w-3xl leading-[30px]">
          Because it's incredible! Here is why we ❤️ it.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-col">
        {reasons.map((reason, index) => (
          <ReasonCard key={`reason-${index}`} index={index} {...reason} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(WhyUs, "whyus");
