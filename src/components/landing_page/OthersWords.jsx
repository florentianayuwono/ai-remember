import { motion } from "framer-motion";
import { styles } from "../../styles";
import { testimonials } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";
import { Tilt } from "react-tilt";

const TestimonialCard = ({ testimonials }) => {
  return (
    <Tilt
      className="m-2 max-w-[350px]"
      options={{ max: 45, scale: 1, speed: 450 }}
    >
      <div className="w-full flex pink-gradient p-[1px] rounded-[20px] shadow-primary-purple shadow-lg">
        <div className="rounded-[20px] mx-12 min-h-[280px] flex flex-col justify-evenly items-center py-5">
          <div className="text-secondary-brown py-5 text-center">{testimonials.testimonial}</div>
          <img src={testimonials.image} className="w-30 mx-auto content-center rounded-full border-2" />
          <div className="text-secondary-brown font-bold text-[24px] py-5">{testimonials.name}</div>
        </div>
      </div>
    </Tilt>
  );
};

const OthersWords = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>What users remember</h2>
        <p className="mt-3 text-black text-[17px] max-w-3xl leading-[30px]">
          Don't just take our words for it. Check what other users got to say.
        </p>
      </motion.div>
      <div className="mt-10 flex flex-wrap">
        {testimonials.map((testimonials, index) => (
          <TestimonialCard key={index} testimonials={testimonials} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(OthersWords, "othersWords");
