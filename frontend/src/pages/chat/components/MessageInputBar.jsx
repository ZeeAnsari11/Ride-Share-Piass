import React, { useState, useRef } from "react";
import localStorageManager from "../../../utils/localStorageManager";
import { sendMessage as EmitMessage } from "../../../sockets/index";

const MessageTypeBar = ({ channelData = {}, ...props }) => {
  const [message, setMessage] = useState("");

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    let u = localStorageManager.getUser();
    if (message.trim() && u) {
      const data = {
        fullName: u.firstName + " " + u.lastName,
        sentBy: u.id,
        message,
        conversationId: channelData.id,
        mesageType: 1,
      };

      EmitMessage(data);
      setMessage("");
    }
  };

  return (
    <div className={"MessageTypeBoxContainer"}>
      <textarea
        className={"MessageInput"}
        placeholder="Type message..."
        onChange={handleMessageInput}
        disabled={!channelData.id}
        value={message}
      />
      <button className={"SendIcon"} onClick={sendMessage} disabled={!channelData.id}>
        Send
      </button>
    </div>
  );
};

export default MessageTypeBar;
