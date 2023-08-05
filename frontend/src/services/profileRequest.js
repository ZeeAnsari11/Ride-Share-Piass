import axios from "axios";
import { serverEndpoint } from "../utils/serverEndpoint";


const submitProfileRequest = async (data)=>{

    return await axios.post(`${serverEndpoint}users/profile-request/`, data)
    .then(res=> res.data)
    .catch(err=> err?.response?.data || err);
}

const ProfileRequestAPI = {
    submitProfileRequest,
}

export default ProfileRequestAPI;