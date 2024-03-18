import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, ConfigProvider } from "antd";

const Login = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
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
            <h4 className="bold mt-4">Verify Code</h4>
            <p>An authentication code has been sent to your email.</p>
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
                        
                        placeholder="Enter Code here"
                    />

                    <div className="mt-3  text-center">
                    Didn’t receive a code? <a href="#signup">Resend</a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;