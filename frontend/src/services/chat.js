import axios from "axios"
import {serverEndpoint} from "../utils/serverEndpoint";
import localStorageManager from "../utils/localStorageManager";
const getConservations = async () => {
  let u = localStorageManager.getUser();
  if(u){
    return await axios.get(`${serverEndpoint}chats/conversations/${u.id}`)
      .then(res => res.data)
      .catch(err => err.response.data)
  }
  return null;
};
const createConservation = async (id, firstName = "Chat", lastName = "") => {
    return await axios.post(`${serverEndpoint}chats/conversations/`, {id, name: firstName + " "+ lastName})
      .then(res => res.data)
      .catch(err => err.response.data)
};

const getAllMessages = async (id) => {
  return await axios.get(`${serverEndpoint}chats/messages/${id}`)
    .then(res => res.data)
    .catch(err => err.response.data)
};

const ChatAPI = {
  createConservation,
  getConservations,
  getAllMessages,
};

export default ChatAPI;
