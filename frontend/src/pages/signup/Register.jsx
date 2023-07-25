import './signup.scss'

import {
  message as AntMessage,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { signup } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = ({displayImage=true}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user)


  const postData = async (data) => {
    console.log(data);
    let promise = dispatch(signup(data));
    promise?.unwrap()
    .then(data=>{
        AntMessage.info(data.msg)
    })
    navigate("/signin")
  }
  return (
    <>
      <div className='flex justify-evenly items-center py-8'>
        <Card className={`border-0 ${displayImage ? 'w-1/2' : 'w-full'}`}>
          <Typography.Title style={{ color: '#1677ff' }}>Register</Typography.Title>
          <Form name="signup" layout='vertical' onFinish={postData}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Full Name!',
                },
              ]}
            >
              <Input
                type='text'
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                type='email'
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Please Enter Phone Number here!',
                },
              ]}
            >
              <Input
                type='number'
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please Enter password!',
                },
              ]}
            >
              <Input.Password type='password' />
            </Form.Item>

            <Form.Item
            >
              <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 font-semibold text-white py-2 px-4 border border-blue-500 rounded" loading={loading}>
                Sign Up
              </button>
              <div className="space-x-2 py-4" >
                  Alrady have an account! <span onClick={() => navigate("/signin")} className="text-red-500 transition-all cursor-pointer hover:text-red-400 ">Login</span>
              </div>
            </Form.Item>
          </Form>
        </Card>
        {displayImage && <img className="w-[30%]" src={'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000'} alt="login sample" />}
      </div>
    </>
  )
}

export default Register;
