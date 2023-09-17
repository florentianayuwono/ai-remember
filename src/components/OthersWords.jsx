import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { othersWords } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const OthersWordsCard = ({ othersWords }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#e4c1f9", color: "#6f2dbd" }}
      contentArrowStyle={{ borderRight: "7px solid #e4c1f9" }}
      date={othersWords.date}
      iconStyle={{ background: othersWords.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={othersWords.icon}
            alt={othersWords.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[#8338ec] text-[24px] font-bold">{othersWords.title}</h3>
        <p
          className="text-[#d90429] text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {othersWords.company_name}
        </p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {othersWords.points.map((point, index) => (
          <li
            key={`othersWords-point-${index}`}
            className="text-black-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const OthersWords = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>What others say.</h2>
        <p className="mt-3 text-primary-lightpink text-[17px] max-w-3xl leading-[30px]">Don't just take our words for it. Check what other users got to say.</p>
      </motion.div>

      <div className="mt-10 flex flex-col">
        <VerticalTimeline>
          {othersWords.map((othersWords, index) => (
            <OthersWordsCard key={index} othersWords={othersWords} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(OthersWords, "othersWords");
