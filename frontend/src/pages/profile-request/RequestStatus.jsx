import { Image } from 'antd'
import React from 'react'
import image from "../../assets/Images/wait.jpg"
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const RequestStatus = () => {

  const { user } = useSelector(state => state.user);

  if (user?.requestStatus !== "pending") {
    return <Navigate to="/" />
  }
  return (
    <div className='request_conatiner'>
        <Image src={image} height={"400px"} preview={false}/>
        <div className='text-container'>
        <p>Your Request is Submited, Please wait for response</p>
      </div>
    </div>
  )
}

export default RequestStatus
