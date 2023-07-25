import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localStorageManager from "../../../utils/localStorageManager";
import ChatAPI from "../../../services/chat";
import { EScrollThresholdType, useChatScroll, useDataLoader } from 'use-chat-scroll';
const options = {
  reverseInfiniteScroll: {
    scrollThreshold: {
      type: EScrollThresholdType.pixels,
      value: 20,
    },
    enabled: true,
  },
  stickyScroll: {
    enabled: true,
  },
}

const MessageContainer = ({ channelData = {}, MessageRecieved = {} }) => {
  const [allMessages, setAllMessages] = useState([]);
  const containerRef = useRef();
  const loadAdditionalData = () => {
    // paginated message will load here
    console.log("load more data")
    return [];
  }
  const loader = useDataLoader(loadAdditionalData, allMessages, setAllMessages);
  useChatScroll(containerRef, allMessages, loader, options)
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorageManager.getUser();
    if (user) {
      setUser(user);
    }
  }, []);


  useEffect(() => {
    if (channelData.id) {
      getAllMessages();
    }
  }, [MessageRecieved, channelData.id]);


  const getAllMessages = async () => {
    await ChatAPI.getAllMessages(channelData.id)
      .then(res => {
        if (res.statusCode === 200) {
          setAllMessages(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const RenderMessage = ({ data, index }) => {
    return (
      <div style={{ marginBlock: "10px" }}>
        <div
          className={
            data.sentBy === user.id
              ? "RightMessage"
              : "LeftMessage"
          }
        >
          {data.message}
          <small
            style={{
              fontSize: "10px",
              display: "block",
              textAlign: "right",
              paddingLeft: "10px",
              marginTop: "15px",
              float: "right",
            }}>
            {moment(data.createdAt).format('LT')}
          </small>
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  };
  return (
    <div className={"MessagesContainer"} ref={containerRef}>
      {allMessages.map((el, i) => (
        <RenderMessage data={el} key={i} index={i} />
      ))}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  MessageRecieved: state.MessageRecieved.msg,
  ...ownProps,
});
export default connect(mapStateToProps)(MessageContainer);
