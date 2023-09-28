import React, { useState, useEffect } from "react";
import { CHAT_PLACEHOLDER } from "../../constants";
import { BiSolidMicrophone } from "react-icons/bi";
import { getChatCount } from "../../firebase_setup/FirebaseConfig";
import toast from "react-hot-toast";
import { processHumanResponse } from "../../langchain_setup/ChatLangchainConfig";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import { AiOutlineClose, AiOutlineEnter } from "react-icons/ai";

const ChatInput = ({ email, date }) => {
  const [prompt, setPrompt] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setPrompt(transcript);
  }, [transcript]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    //get chat count
    const count = await getChatCount(email, date);

    //send only if ai has sent and user less than 5 msgs
    if (count % 2 == 1 && count < 10) {
      // get mood based on content
      const response = prompt.trim();
      setPrompt("");

      await processHumanResponse(email, date, response, count.toString());
    } else if (count % 2 == 0) {
      //toast notification to wait
      toast("paw paw is sorry for being slow... please BEAR it", {
        icon: "⌛",
      });
    } else if (count >= 10) {
      //alert dialogue to upgrade to pro
      toast.error("Please upgrade to pro to send more than 5 messages per day");
    }
  };

  return (
    <form onSubmit={sendMessage} className="flex justify-center mb-10">
      <div className="flex items-center rounded-2xl p-4 my-2 w-2/3 bg-secondary-brown text-white ">
        <input
          className="flex w-full outline-none placeholder:text-gray-300 bg-transparent"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={CHAT_PLACEHOLDER}
        />
        <div
          onClick={() => {
            setPrompt("");
            resetTranscript();
          }}
          className="cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-secondary-brown rounded-2xl p-4 m-2"
      >
        <AiOutlineEnter size={20}/>
      </button>
      {!browserSupportsSpeechRecognition ? (
        <></>
      ) : (
        <div
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              SpeechRecognition.startListening();
              setPrompt("");
            }
          }}
          className={
            listening
              ? "text-white rounded-2xl flex p-4 my-2 justify-center items-center bg-red-400"
              : "text-white rounded-2xl p-4 flex my-2 justify-center items-center bg-secondary-brown"
          }
        >
          <BiSolidMicrophone size={20} />
        </div>
      )}
    </form>
  );
};

export default ChatInput;
