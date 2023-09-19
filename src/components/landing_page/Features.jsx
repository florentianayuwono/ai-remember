import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { features } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";

const ServiceCard = ({ index, title, icon, description }) => {
  return (
    <Tilt className="m-6 max-w-[500px]" options={{ max: 45, scale: 1, speed: 450 }}>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full flex pink-gradient p-[1px] rounded-[20px] shadow-primary-purple shadow-lg"
      >
        <div className="rounded-[20px] mx-12 min-h-[280px] flex flex-col justify-evenly items-center">
          <div className="flex-row flex items-center">
            <img src={icon} alt={title} className="w-20 object-contain" />
            <div className="flex-col flex items-start mx-5">
              <h3 className=" text-secondary-purple text-3xl font-semibold text-left py-2">
                {title}
              </h3>
              <div className="text-black py-2">{description}</div>
            </div>
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
        <h2 className={styles.sectionHeadText}>What AI-Remember do?</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]"
      ></motion.p>

      <div className="mt-10 flex flex-wrap">
        {features.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service}/>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Features, "features");
