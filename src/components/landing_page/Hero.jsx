import { styles } from "../../styles";
import { TypeAnimation } from "react-type-animation";

import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { logo2 } from "../../assets";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto hero-background">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-secondary-brown" />
          <div className="w-1 sm:h-80 h-40 brown-gradient" />
        </div>

        <div className="w-2/3">
          <h1 className={`${styles.heroHeadText} text-secondary-purple`}>
            AI-Remember{" "}
            <TypeAnimation
              sequence={[
                "your stories📒",
                2000,
                "memories🐻",
                2000,
                "you😊",
                2000,
              ]}
              speed={50}
              repeat={0}
              className="text-secondary-blue"
            />
          </h1>
          <p className={`${styles.heroSubText} mt-2`}>
            Discover your everyday cherished memories.{" "}
            <br className="sm:block hidden" />
            {/* Your Personal Diary Assistant in Action. */}
          </p>
        </div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-1/3 align-middle flex-auto"
        >
          <img src={logo2} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
