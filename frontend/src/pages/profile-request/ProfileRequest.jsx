import React, { useState } from 'react'
import { Button, Form, Input, message, theme, Modal } from 'antd'
import Camera from '../../Components/camerra/Camera';
import PhoneInput from '../../Components/phoneInput/PhoneInput';
import ProfileRequestAPI from '../../services/profileRequest';
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./profile.css"
import { userSignIn } from '../../redux/slices/userSlice';
import localStorageManager from '../../utils/localStorageManager';

function Profile() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [imageUrl, setImageUrl] = useState("");
  const [cnicFront, setCnicFront] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [getPicture, setGetPicture] = useState({
    show: false,
    type: "",
  });
  const [data, setData] = useState({
    profile: "",
    cnicFront: "",
    cnicBack: "",
  })

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleInputs = (e) => {
    let name = e.target.name, value = e.target.value;

    setData({
      ...data,
      [name]: value,
    })
  }


  const handleChange = (img) => {
    getBase64(img, (baset64) => {
      if (getPicture.type === "profile") {
        setImageUrl(baset64);
      }
      if (getPicture.type === "cnicFront") {
        setCnicFront(baset64);
      }
      if (getPicture.type === "cnicBack") {
        setCnicBack(baset64);
      }

      setGetPicture({
        show: false,
        type: "",
      })
      setData({
        ...data,
        [getPicture.type]: img,
      })
    })
  };
  const handSubmit = (fields) => {
    if (!data.profile) {
      return message.error("Profile is required!");
    }
    if (!data.cnicFront) {
      return message.error("CNIC Front image is required!");
    }
    if (!data.cnicBack) {
      return message.error("CNIC Back image is required!");
    }

    const formData = new FormData();

    Object.keys(fields).map(el => {
      formData.append(el, fields[el]);
    })

    Object.keys(data).map(el => {
      formData.append("image", data[el]);
    })

    Modal.confirm({
      title: "Make sure your profile and CNIC front & back image are clearly visible?",
      okText: "Submit Request",
      cancelText: "Review",
      onOk: async () => {
        let res = await ProfileRequestAPI.submitProfileRequest(formData);
        if (res?.statusCode === 200) {
          message.success(res.msg || "Successfully Submitted");
          let data = { ...user, requestStatus: "pending" };
          localStorageManager.setUser(data);
          dispatch(userSignIn(data))
          return;
        }
        message.error(res.msg || "Unable to submit");
      }
    });

  }

  if (user?.requestStatus === "pending") {
    return <Navigate to="/request-status" />
  }
  const { token } = theme.useToken()
  return (
    <section className='profile-section' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      {
        getPicture.show &&
        <Camera getCompressedImage={handleChange} />
      }

      <div style={{ boxShadow: token.boxShadowSecondary, width: "60%", padding: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div className='image-container' onClick={() => setGetPicture({ show: true, type: "profile" })}>
            {
              imageUrl ?
                <img src={imageUrl} /> :
                "Take Picture"
            }
          </div>
          <div className='image-container' onClick={() => setGetPicture({ show: true, type: "cnicFront" })}>
            {
              cnicFront ?
                <img src={cnicFront} /> :
                "CNIC front image"
            }
          </div>
          <div className='image-container' onClick={() => setGetPicture({ show: true, type: "cnicBack" })}>
            {
              cnicBack ?
                <img src={cnicBack} /> :
                "CNIC back image"
            }
          </div>
        </div>
        <Form layout='vertical' onFinish={handSubmit}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input type='text' size='large' />
          </Form.Item>
          <Form.Item label="Phone No">
            <PhoneInput name='phone' onChange={handleInputs} />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input type='text' size='large' />
          </Form.Item>
          <Button htmlType='submit' type="primary" size="large">Submit</Button>
        </Form>

      </div>
    </section>
  )
}

export default Profile
