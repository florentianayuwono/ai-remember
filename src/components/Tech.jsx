import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((techstack) => (
        <div className="w-28 h-28" key={techstack.name}>
          <BallCanvas icon={techstack.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
