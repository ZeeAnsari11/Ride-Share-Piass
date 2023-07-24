import "./login.scss"

import {
    message as AntMessage,
    Button,
    Card,
    Form,
    Input,
    Typography,
} from 'antd'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";

import localStorageManager from '../../utils/localStorageManager';
import { login } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        console.log(data);
        let promise = dispatch(login(data));
        promise?.unwrap()
        .then(data=>{
            if(data.statusCode === 200){
                AntMessage.success("Login Success")
                localStorageManager.setUser(data.data)
                navigate("/")
                
                return;
            }
            AntMessage.error(data.msg || "Login Error")
            
        })
    }

    return (
        <>
            <div className='parent'>
                <Card className='form-card'>
                    <Typography.Title style={{ color: '#1677ff' }}>Login</Typography.Title>
                    <Form name="signup" layout='vertical' onFinish={handleSubmit} >
                        <Form.Item
                            label="Email"
                            name='email'
                            rules={[
                                {
                                    message: 'Please input your UserName!',
                                    required: true,
                                },
                            ]}
                        >
                            <Input type='text' />
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
                            <Input.Password />
                        </Form.Item>
                        <div style={{ display: "flex", justifyContent: "right", marginTop: "-20px", marginBottom: "15px" }}>
                            <Button danger type="link" onClick={() => navigate("/forgot-password")}>
                                Forgot Password
                            </Button>

                        </div>

                        <Form.Item
                        >
                            <div style={{width:'50%', height:'2rem'}}>
                            <Button type="primary" shape='round' htmlType="submit" style={{ width: '100%', height:'100%', borderRadius: '' }} loading={loading}>
                                Submit
                            </Button>
                            </div>
                            <Button danger type='link' style={{ marginTop: '15px' }} onClick={() => navigate("/signup")}>
                                Don't have an account! Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>


            </div>
        </>
    )
}

export default Login
