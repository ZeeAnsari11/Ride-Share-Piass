import "./PostRide.scss";

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Typography,
  message,
} from 'antd';
import React, { useState } from 'react';

import { postRide } from '../../redux/slices/RideSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const PostRide = () => {
  
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const postData = (data) => {
    if(!file){
      message.error("Please insert ride picture")
      return;
    }
    if(!(file.size <= 2 * 1024 * 1024)){
      message.error("Ride Picture size must be smaller than 2MB")
      return;
    }
    if(!["image/png", "image/jpg", "image/jpeg"].includes(file.type)){
      message.error("Ride Picture type must be PNG, JPG, JPEG")
      return;
    }
    let formData = new FormData();
    Object.keys(data).map(el=>{
      if(el === "ridePicture"){
        formData.append(el, file);
      } else {
        formData.append(el, data[el]);
      }
    })
    const postPromise = dispatch(postRide(formData));
    postPromise?.unwrap()
    .then(res=>{
      if(res?.statusCode === 201){
        navigate("/");
      }
    })
  }
  return (
    <>
      <div className='parent1'>
        <Card className='form-card'>
          <p >Post your Ride</p>
          <Form name="signup" layout='vertical' onFinish={postData}>
            <Form.Item
              label="Ride Type"
              name="rideType"
            >
              <Select
                size="large"
                placeholder="Select Ride Type"

                options={[
                  {
                    value: 'car',
                    label: 'Car',
                  },
                  {
                    value: 'bike',
                    label: 'Bike',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="rideNumber"
              label="Ride Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your Ride Number Here!',
                },
              ]}
            >
              <Input
                type='text'
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="date"
              label="Dispatch Date"
              rules={[
                {
                  required: true,
                  message: 'Please input your Dispatch Date Here!',
                },
              ]}
            >
              {/* <input type="datetime-local" name="" id="" /> */}
              <Input
                type="datetime-local"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="rideColor"
              label="Ride Color"
              rules={[
                {
                  required: true,
                  message: 'Please input your Ride Color!',
                },
              ]}
            >
              <Input
                type='text'
                size="large"
              />
            </Form.Item>
            <Form.Item
              name='ridePicture'
              label="Ride Picture"
              rules={[
                {
                  required: true,
                  message: 'Please Insert your Ride Picture Here!',
                },
              ]}
            >
              <Input
                type="file"
                accept='image/*'
                size="large"
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </Form.Item>

            <Form.Item
              name="startLocation"
              label="Start Location"
              rules={[
                {
                  required: true,
                  message: 'Please Input Your Start Location!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="endLocation"
              label="End Location"
              rules={[
                {
                  required: true,
                  message: 'Please Input Your End Location!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="noofPassenger"
              label="No of Passenger"
              rules={[
                {
                  required: true,
                  message: 'Please Input Your Number of passenger!',
                },
              ]}
            >
              <Input type="number" defaultValue={"0"} size="large" />
            </Form.Item>
            <Form.Item
              label="Ride Routes"
              name="rideRoutes"
            >
              <Select
                size="large"
                placeholder="Select Routes and Enter Hit"
                mode="tags"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary"  htmlType="submit" style={{backgroundColor:"green" }} size="large">Post Ride</Button>
            </Form.Item>
          </Form>
        </Card>


      </div>
    </>
  )
}

export default PostRide
