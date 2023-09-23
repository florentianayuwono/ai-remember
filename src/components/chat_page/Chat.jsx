import React from "react";
import ChatRow from "./ChatRow";

const Chat = ({ chats }) => {
  
  return (
    <div className="flex flex-col">
      {chats?.docs.slice(0).reverse().map((chat) => (
        <ChatRow chat={chat.data()} key={chat.data().chatId} />
      ))}
    </div>
  );
};

export default Chat;
