import { styles } from "../styles";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto hero-background">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-primary-lightpink" />
          <div className="w-1 sm:h-80 h-40 pink-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hello, I'm{" "}
            <TypeAnimation
              sequence={[
                "Floren 👋",
                1000,
                "raised by Taylor Swift 💜",
                1000,
                "in my Barbie era 🩰",
                1000,
                "a proud Gen Z ofc 💅",
                1000,
                "an aspiring Rich Auntie 👑",
                1000,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-primary-lightpink"
            />
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-500`}>
            Currently a penultimate Computer Science{" "}
            <br className="sm:block hidden" />
            student at NUS. Nice to meet you!😄
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
