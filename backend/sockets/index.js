const MessagesModel = require("../model/message");

const initializeSockets = (expressInstance)=>{
  const io = require("socket.io")(expressInstance, {cors: {
    origin: "*"
  }});
  io.on("connection", (socket) => {
    socket.emit("connected");
    socket.on("subscribe_user", (data) => {
      //data ====> user data
      console.log("user_subscribed");
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  
    socket.on("message", async (data) => {
      try {
        console.log("message recieved");
        let m__ = new MessagesModel(data);
        let doc = await m__.save();
        let mDoc = await doc.populate("conversation");
        broadcastMessage(mDoc);
  
      } catch (err) {
        console.log(err);
      }
    });
  });
  
  const broadcastMessage = (data) => {
    io.emit("message", data);
  };
}


module.exports = initializeSockets;

