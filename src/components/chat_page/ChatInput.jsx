import React, { useState } from "react";
import { CHAT_PLACEHOLDER } from "../../constants";
import { BsFillPencilFill } from "react-icons/bs";
import { getCountFromServer, serverTimestamp } from "firebase/firestore";
import { getChatCount, addMsg } from "../../firebase_setup/FirebaseConfig";

const ChatInput = ({email,date}) => {
  const [prompt, setPrompt] = useState("");


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const count = await getChatCount(email,date);

    const input = prompt.trim();
    setPrompt("");
    const msg = {
      createdAt: serverTimestamp(),
      chatId: count, //after getting number of docs
      isUser: true,
      content: input,
      mood: "", //chatai api generated
    };
    
    await addMsg(email,date,msg);

    //toast notification

    //send to backend api
    
  };

  return (
    <div className="flex flex-row justify-center mb-10">
      <input
        className=" rounded-2xl p-4 my-2 w-2/3 bg-secondary-brown text-white placeholder:text-gray-300"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={CHAT_PLACEHOLDER}
      />
      <button
        onClick={sendMessage}
       className="text-white bg-secondary-brown rounded-2xl p-4 m-2">
        <BsFillPencilFill />
      </button>
    </div>
  );
};

export default ChatInput;
