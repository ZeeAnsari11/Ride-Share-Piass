import React, { useEffect, useState } from "react";
import { BsArrowLeft as ArrowBack } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import ChatAPI from "../../services/chat";
import localStorageManager from "../../utils/localStorageManager";
import MessageContainer from "./components/MessageContainer";
import MessageTypeBar from "./components/MessageInputBar";
import "./chat.css"
const Chat = ({ MessageRecieved }) => {
  const [currentChat, setCurrentChat] = useState();
  const [conversations, setConversations] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const user = useSelector(state=> state.user.user)

  const getConservations = async () => {
    await ChatAPI.getConservations(user?.id).then((res) => {
      if (res && res.statusCode === 200) {
        setConversations(res.data);
      }
    });
  };

  useEffect(() => {
    getConservations();
  }, [MessageRecieved, user]);


  const getChatName = (data)=>{
    return data?.members[0]?.id === user?.id ? data?.members[1]?.fullName : data?.members[0]?.fullName
  }

  const ChatHead = ({ data }) => {
    return (
      <div
        className="ChatHead"
        onClick={() => handleChatClick(data)}
        style={{
          borderLeft: currentChat?.id === data?.id ? "2px solid var(--theme-color)" : "none",
          backgroundColor: currentChat?.id === data?.id ? "#f5f5f5" : "none",
        }}
      >
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            paddingRight: "60px",
            whiteSpace: "nowrap"
          }}>
          {getChatName(data)}
        </p>
        <small
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "block",
            paddingRight: "30px",
            whiteSpace: "nowrap"
          }}>
          {data.lastMessage?.message || ""}
        </small>
      </div>
    );
  };

  const SpraguChat = () => {
    return (
      <div className="SpragueChat">
        <input
          className="SpragueChatInput"
          placeholder="search for chat"
        />
      </div>
    );
  };

  const ChatHeader = () => {
    return (
      <div className="ChatHeader">
        <p>
          <ArrowBack className="pointer chat-back-btn" onClick={() => setShowChat(false)} />
          &nbsp;
          {getChatName(currentChat)}
        </p>
      </div>
    );
  };

  const handleChatClick = (data) => {
    setCurrentChat(data);
    setShowChat(true);
  };

  return (
    <div className="page-container" style={{ overflowY: "hidden", padding: "0px" }}>
      <div className="rootContainer">
        <div className="desktop-chat">
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "30%" }}>
              <SpraguChat />
              <div className="AllChats">
                {conversations.map((el, i) => (
                  <ChatHead key={i} data={el} />
                ))}
              </div>
            </div>
            <div style={{ width: "70%" }}>
              <ChatHeader />
              <MessageContainer channelData={currentChat} />
              <MessageTypeBar channelData={currentChat} />
            </div>
          </div>
        </div>
        <div className="mobile-chat">
          {!showChat ?
            <>
              <SpraguChat />
              <div className="AllChats">
                {conversations.map((el, i) => (
                  <ChatHead key={i} data={el} />
                ))}
              </div>
            </>
            :
            <>
              <ChatHeader />
              <MessageContainer channelData={currentChat} />
              <MessageTypeBar channelData={currentChat} />
            </>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  MessageRecieved: state.MessageRecieved.msg,
  ...ownProps,
});

export default connect(mapStateToProps)(Chat);
