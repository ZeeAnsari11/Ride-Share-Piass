import axios from "axios";
import { serverEndpoint } from "../utils/serverEndpoint";

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

const auth = {
    sendForgotPasswordToken,
    resetPassword,
}
export default auth;