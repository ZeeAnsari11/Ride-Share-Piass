import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import socketio from "socket.io-client";
import {
  MessageRecieved,
} from "../redux/slices/messages";
import localStorageManager from "../utils/localStorageManager";
import { assetsEndpoint } from "../utils/serverEndpoint";
var io = null;
const Sockets = (props) => {

  const userData = useSelector(state=>state.user.user);
  useEffect(() => {
    const user = localStorageManager.getUser();
    if (user) {
      if (io) {
        disconnectSocket();
      }
      setupConnection();
      return;
    }

    if(!user && io){
      disconnectSocket();
    }
  }, [userData]);

  const setupConnection = () => {

    io = socketio(`${assetsEndpoint}`, {
      reconnectionDelayMax: 10000,
      secure: true,
      reconnectionAttempts: 5,
      // auth:{
      //   Headers: {
      //     Authorization: "Bearer "
      //   }
      // }
    });

    io.on("connection", (data) => {
      // console.log(data);
    });

    io.on("reconnect", (attemptNo) => {
      console.log("attempt no", attemptNo);
    });

    io.on("connected", () => {
      const user = localStorageManager.getUser();
      io.emit("subscribe_user", user);
    });
    io.on("message", (data) => {
      const user = localStorageManager.getUser();
      if (data.conversation && data.conversation.members && data.conversation.members.includes(user?.id)) {
        props.dispatch(MessageRecieved(data));
      }
    });
  };

  const disconnectSocket = () => {
    io.disconnect();
  };

  return null;
};
const sendMessage = (data) => {
  if(io?.emit){
    io.emit("message", data, (err, data) => {
      if (err) {
        console.log("Message send err", err);
      }
    });
    return;
  }
  window.location.reload();
};

export default connect()(Sockets);
export { sendMessage };
