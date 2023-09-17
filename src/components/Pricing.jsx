import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";


const Pricing = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Pricing.</h2>
        <p className="mt-3 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]">Pick a Plan. Make Memories!</p>
      </motion.div>

      
    </div>
  )
};

export default SectionWrapper(Pricing, "pricing");
