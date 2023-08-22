import React from "react";
import axios from "axios"
import {
  message as AntMessage,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from "antd";
import { serverEndpoint } from '../../utils/serverEndpoint';
import {useNavigate} from "react-router-dom"
import Styles from "./Login.module.css";
import localStorageManager from "../../utils/localStorageManager";
const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = async (payload) => {
    await axios.post(`${serverEndpoint}admin/login`, payload)
    .then(res=>{
      if (res.data.statusCode === 200) {
        AntMessage.success("Login Success");
        localStorageManager.setUser(res.data.data);
        navigate("/Admin");
        return;
      }
    })
    .catch(err=>{
      AntMessage.error(err?.response?.data?.msg || "Login Error");
    });
  };
  return (
    <>
      <div className={Styles.mainDiv}>
        <Card className={Styles.cardstyle}>
          <Typography.Title style={{ color: "#1677ff" }}>
            Hello Admin
          </Typography.Title>
          <Form name="signup" layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: "Please input your UserName!",
                  required: true,
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div style={{ width: "50%", height: "2rem" }}>
                <Button type="primary" size="large" htmlType="submit" >
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
