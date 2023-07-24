import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    Button,
    Form,
    Input,
    message as AntMessage,
} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import { login } from '../../redux/slices/userSlice';
import "./login.scss"
import localStorageManager from '../../utils/localStorageManager';

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
                    <Typography.Title style={{ color: 'var(--theme-color)' }}>Login</Typography.Title>
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
                            <Button type="primary" shape='round' htmlType="submit" style={{ width: '100%' }} loading={loading}>
                                Submit
                            </Button>
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
