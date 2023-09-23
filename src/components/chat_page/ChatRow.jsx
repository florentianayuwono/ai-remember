import React from "react";
import { logo2 } from "../../assets";

const ChatRow = ({ chat }) => {
  const Bearly = () => {
    return (
      <div className=" text-secondary-brown min-w-[100px] mx-6 flex flex-col justify-center items-center max-w-[300px] w-[100px]">
        <img src={logo2} alt="AI-Bear" />
        <div className=" pt-2 italic font-bold text-lg">Bearly</div>
      </div>
    );
  };
  //user chatbox
  if (chat.isUser) {
    return (
      <div id={chat.chatId} key={chat.chatId}>
        {chat.content}
      </div>
    );
  }

  //bearly chatbox
  return (
    <div
      id={chat.chatId}
      key={chat.chatId}
      className="flex flex-row justify-start items-center"
    >
      <Bearly />
      <div className=" font-handwriting text-2xl">{chat.content}</div>
    </div>
  );
};

export default ChatRow;
