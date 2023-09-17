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
          <h1 className={`${styles.heroHeadText}`}>
            Hello, We are Your{" "}
            <TypeAnimation
              sequence={[
                "AI-Remember 🌟 😊",
                2000,
                "Memory's Best Friend 🐻 📒",
                2000,
                "Bridge to Shared Stories 🌉 📚",
                2000,
                "AI-Remember 🌟 😊",
                2000
              ]}
              speed={50}
              repeat={0}
              className="text-white"
            />
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-500`}>
          Turning Conversations into Cherished Memories.{" "}
            <br className="sm:block hidden" />
            Your Personal Diary Assistant in Action.
          </p>
        </div>
      </div>
      {/*TODO - Perhaps a demo video here*/}
    </section>
  );
};

export default Hero;
