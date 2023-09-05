import axios from "axios";
import { serverEndpoint } from "../utils/serverEndpoint";
import localStorageManager from "../utils/localStorageManager";

const sendForgotPasswordToken = async (email, url) => {
    if (email) {
        return await axios.post(`${serverEndpoint}auth/send-forgot-password-code`, { email, url })
            .then(res => res?.data)
            .catch(err => err?.response?.data)
    }
    return null;
}

const resetPassword = async (data) => {

    return await axios.post(`${serverEndpoint}auth/reset-password`, data)
        .then(res => res?.data)
        .catch(err => err?.response?.data)
}

const verify = async ()=>{
    let token = localStorageManager.getUser()?.token || "";
    if(token){
        return await axios.post(`${serverEndpoint}auth/verify`, {token})
        .then(res=>res?.data)
        .catch(err=> err.response.data);
    }
    return null;
}

const auth = {
    sendForgotPasswordToken,
    resetPassword,
    verify
}
export default auth;