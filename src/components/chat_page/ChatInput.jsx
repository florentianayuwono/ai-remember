import React, { useState } from "react";
import { CHAT_PLACEHOLDER } from "../../constants";
import { BsFillPencilFill } from "react-icons/bs";

const ChatInput = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-row justify-center mb-10">
      <input
        className=" rounded-2xl p-4 my-2 w-2/3 bg-secondary-brown text-primary-white placeholder:text-gray-300"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={CHAT_PLACEHOLDER}
      />
      <button className="text-white bg-secondary-brown rounded-2xl p-4 m-2">
        <BsFillPencilFill />
      </button>
    </div>
  );
};

export default ChatInput;
