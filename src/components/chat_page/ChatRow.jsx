import React from "react";
import { logo2 } from "../../assets";
import { BsPersonCircle } from "react-icons/bs";

const ChatRow = ({ chat }) => {
  const Bearly = () => {
    return (
      <div className=" text-secondary-brown min-w-[100px] flex flex-col justify-center items-center max-w-[300px] w-[100px] mr-2">
        <img src={logo2} alt="AI-Bear" />
        <div className="italic font-bold text-lg ">paw paw</div>
      </div>
    );
  };

  const Userly = () => {
    return (
      <div className=" text-secondary-brown min-w-[100px] flex flex-col justify-center items-center max-w-[300px] w-[100px]">
        <BsPersonCircle size={40}/>
      </div>
    );
  }

  //user chatbox
  if (chat.isUser) {
    return (
      <div id={chat.chatId} key={chat.chatId} className="flex flex-row justify-end items-center mx-6 my-4">
        <div className=" font-handwriting-user text-2xl">{chat.content}</div>
        <Userly />
      </div>
    );
  }

  //bearly chatbox
  return (
    <div
      id={chat.chatId}
      key={chat.chatId}
      className="flex flex-row justify-start items-center mx-6 my-4"
    >
      <Bearly />
      <div className=" font-handwriting-bear text-2xl">{chat.content}</div>
    </div>
  );
};

export default ChatRow;
