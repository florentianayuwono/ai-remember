import React, { useState } from "react";
import { CHAT_PLACEHOLDER } from "../../constants";
import { BsFillPencilFill } from "react-icons/bs";
import { serverTimestamp } from "firebase/firestore";
import { getChatCount } from "../../firebase_setup/FirebaseConfig";
import toast from "react-hot-toast";
import { processHumanResponse } from "../../langchain_setup/ChatLangchainConfig";

const ChatInput = ({email,date}) => {

  const [prompt, setPrompt] = useState("");


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    //get chat count
    const count = await getChatCount(email,date);

    //send only if ai has sent and user less than 5 msgs
    if (count % 2 == 1 && count < 10) {
      // get mood based on content
      const response = prompt.trim();
      setPrompt("");
      
      await processHumanResponse(email, date, response, count.toString());
    } else if (count % 2 == 0) {
      //toast notification to wait
      toast('paw paw is sorry for being slow... please BEAR it', {
        icon: '⌛',
      });
    } else if (count >= 10) {
      //alert dialogue to upgrade to pro
      toast.error("Please upgrade to pro to send more than 5 messages per day")
    }    
  };

  return (
    <form onSubmit={sendMessage} className="flex justify-center mb-10">
      <input
        className=" rounded-2xl p-4 my-2 w-2/3 bg-secondary-brown text-white placeholder:text-gray-300"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={CHAT_PLACEHOLDER}
      />
      <button
        type="submit"
       className="text-white bg-secondary-brown rounded-2xl p-4 m-2">
        <BsFillPencilFill />
      </button>
    </form>
  );
};

export default ChatInput;
