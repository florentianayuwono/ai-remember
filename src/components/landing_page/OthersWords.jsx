import { motion } from "framer-motion";
import { styles } from "../../styles";
import { testimonials } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";

const TestimonialCard = ({ testimonials }) => {
  return (
    <div className="w-96 h-96 pink-gradient p-[1px] rounded-2xl shadow text-center flex flex-col justify-center text-secondary-brown">
      <p className="m-6 ">{testimonials.testimonial}</p>

      <img
        src={testimonials.image}
        className="rounded-full border-2 content-center mx-auto w-32 "
      />
      <p className="mt-2 text-[24px] font-bold">{testimonials.name}</p>
    </div>
  );
};

const OthersWords = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>What others say.</h2>
        <p className="mt-3 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]">
          Don't just take our words for it. Check what other users got to say.
        </p>
      </motion.div>
      <div className="mt-10 flex flex-row space-x-6">
        {testimonials.map((testimonials, index) => (
          <TestimonialCard key={index} testimonials={testimonials} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(OthersWords, "othersWords");
