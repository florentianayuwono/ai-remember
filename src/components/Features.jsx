import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { features } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon, description }) => {
  return (
    <Tilt
      className="m-6"
      options={{ max: 45, scale: 1, speed: 450 }}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full pink-gradient p-[1px] rounded-[20px] shadow-primary-purple shadow-lg"
      >
        <div className=" rounded-[20px] mx-12 min-h-[280px] flex flex-col justify-evenly items-center">
          <div className="flex-row flex items-center">
            <img src={icon} alt={title} className="h-40 object-contain" />
            <h3 className=" text-secondary-brown text-3xl font-bold text-center">
              {title}
            </h3>
          </div>
          <div className="text-black">
            {description}
          </div>

        </div>
      </motion.div>
    </Tilt>
  );
};

const Features = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Features.</h2>
        <p className={styles.sectionSubText}>How AI-Remember improves your life</p>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]"
      >
        
      </motion.p>

      <div className="mt-20 grid grid-cols-2">
        {features.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Features, "features");
