import React from 'react'
import { Button, Form, Input, Typography, message } from 'antd'
import { useLocation, useNavigate } from "react-router-dom";
import auth from '../../services/auth'
const NewPassword = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleChangePassword = async (data) => {
        if (data.password !== data.confirmPassword) {
            message.warning("Password and confirm password are mismatched")
            return;
        }
        const urlSearcher = new URLSearchParams(location.search);
        const token = urlSearcher.get("token");
        auth.resetPassword({ ...data, token })
            .then(res => {
                if (res.statusCode === 200) {
                    message.success("Your password has been changed")
                    navigate("/signin")
                    return;
                }
                message.error(res.msg || "Unable to change password or Token has been expired")
            })
    }

    return (
        <section style={{ display: "flex", height: "80vh", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "350px", padding: "50px 30px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Typography.Title level={3}>
                    Choose new password
                </Typography.Title>
                <Form layout="vertical" onFinish={handleChangePassword}>
                    <Form.Item label="New Password" name="password" rules={[{ message: "Password is required", required: true }]}>
                        <Input.Password size='large' />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ message: "Password is required", required: true }]}>
                        <Input.Password size='large' />
                    </Form.Item>
                    <Button size='large' htmlType='submit' type='primary'>
                        Save Password
                    </Button>
                </Form>
            </div>
        </section>
    )
}

export default NewPassword
