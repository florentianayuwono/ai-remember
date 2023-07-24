import { styles } from "../styles";
import Dinogame from "./Dinogame";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-secondary" />
          <div className="w-1 sm:h-80 h-40 pink-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hello, I'm <span className="text-secondary">Floren</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-500`}>
            Currently a penultimate Computer Science{" "}
            <br className="sm:block hidden" />
            student at NUS. Nice to meet you!😄
          </p>

          <div className="flex flex-col justify-center items-start mt-5">
            <Dinogame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
