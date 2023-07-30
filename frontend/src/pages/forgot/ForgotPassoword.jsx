import React from 'react'
import { message, Form, Input, Button, Typography } from "antd";
import auth from '../../services/auth';

const ForgotPassword = () => {

  const sendForgotToken = async ({ email }) => {
    let res = await auth.sendForgotPasswordToken(email, `${window.location.origin}/new-password`);
    if (res.statusCode === 200) {
      message.info("Check your email")
      return;
    }
    message.error(res.msg || "Unable to send email")
  }
  return (
    <section id="login" style={{ display: "flex", height: "80vh", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "350px", padding: "50px 30px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <Typography.Title level={3}>
          Forgot Passowrd
        </Typography.Title>
        <Form layout='vertical' onFinish={sendForgotToken}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type='email' size='large' />
          </Form.Item>
          <Button htmlType='submit' size='large' type='primary' >
            Continue
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default ForgotPassword
