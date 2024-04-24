import React, { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, ConfigProvider, message } from "antd";
import Navbar from "../../../components/users/navBar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reset = () => {
    const { id, token } = useParams();

    console.log(id, token);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/users/reset-password/${id}/${token}`,
                {
                    password,
                }
            );
            const data = response.data;
            
            message.success("Password Updated Successfully");
            
        } catch (error) {
            console.error(error);
            message.error("Failed to update password");
        }
    };

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: "#1890ff",
                            },
                        },
                    }}
                ></ConfigProvider>
                <h4 className="bold mt-4">Set a Password</h4>
                <p>
                    Your previous password has been reset. Please set a new
                    password for your account.
                </p>
                <Form
                    className="mt-4 w-100 login-form"
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="New Password"
                            size="large"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Confirm Password"
                            size="large"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                            onClick={changePassword}
                        >
                            Set Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Reset;
