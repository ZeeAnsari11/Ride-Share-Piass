import "./login.scss"

import {
    message as AntMessage,
    Button,
    Card,
    Form,
    Input,
    Typography,
} from 'antd'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/slices/userSlice';
import localStorageManager from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';

const Login = ({displayImage=true}) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        console.log(data);
        let promise = dispatch(login(data));
        promise?.unwrap()
            .then(data => {
                if (data.statusCode === 200) {
                    AntMessage.success("Login Success")
                    localStorageManager.setUser(data.data)
                    navigate("/")

                    return;
                }
                AntMessage.error(data.msg || "Login Error")

            })
    }
    return (
        <div className="flex justify-evenly items-center py-8">
            {displayImage && <img className="w-[30%]" src={'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000'} alt="login sample" />}
            <Card className={`border-0 ${displayImage ? 'w-1/3' : 'w-full'}`}>
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
                    <Form.Item>
                        <div style={{ width: '50%', height: '2rem' }}>
                            <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 font-semibold text-white py-2 px-4 border border-blue-500 rounded" loading={loading}>
                                Submit
                            </button>
                        </div>

                        <div className="space-x-2 py-4" >
                            Don't have an account! <span onClick={() => navigate("/signup")} className="text-red-500 transition-all cursor-pointer hover:text-red-400 ">Register</span>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
