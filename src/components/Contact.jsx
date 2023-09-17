import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { loveletter } from "../assets";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();

  const email_templateid = "template_gxednwi";
  const email_serviceid = "service_0q6iimo";
  const email_pubkey = "o3iEaA1qkVkXXi_xS";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        email_serviceid,
        email_templateid,
        {
          from_name: form.name,
          to_name: "Florentiana",
          from_email: form.email,
          to_email: "florentianayuwono2003@gmail.com",
          message: form.message,
        },
        email_pubkey
      )
      .then(
        () => {
          setLoading(false);
          alert("A letter to me, why thank you!");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Oh noes! Seems like the letter is lost😟.");
        }
      );
  };

  const placeholderMessage =
    "Dear Alex,\nI'm drunk in the back of the car\nAnd I cried like a baby coming home from the bar (oh)\nSaid, 'I'm fine, ' but it wasn't true\nI don't wanna keep secrets just to keep you\nAnd I snuck in through the garden gate\nEvery night that summer just to seal my fate (oh)\nAnd I screamed for whatever it's worth\n'I love you, ' ain't that the worst thing you ever heard?";

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden justify-items-center">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-fuchsia-800 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Your sign to write a</p>
        <h3 className={styles.sectionHeadText}>Letter.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="HRH Prince Henry of Who Cares"
              className="bg-fuchsia-700 py-4 px-6 placeholder:text-primary-lightpink text-rose-200 rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="henry@kensington.com"
              className="bg-fuchsia-700 py-4 px-6 placeholder:text-primary-lightpink text-rose-200 rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="9"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={placeholderMessage}
              className="bg-fuchsia-700 py-4 px-6 placeholder:text-primary-lightpink text-rose-200 rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-purple-600 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-purple-400 rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[50px] flex-1"
      >
        <img src={loveletter} />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "pricing");
