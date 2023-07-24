import './signup.scss'

import {
  message as AntMessage,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

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
  }
  return (
    <>
      <div className='parent'>
        <Card className='form-card'>
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
              <Button type="primary" shape='round' htmlType="submit" style={{ width: '100%' }} loading={loading}>
                Submit
              </Button>
              <Button type='link' danger style={{ marginTop: '15px' }} onClick={() => navigate("/signin")}>
                Already have account! Login
              </Button>
            </Form.Item>
          </Form>
        </Card>


      </div>
    </>
  )
}

export default Register;
