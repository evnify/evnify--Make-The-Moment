import React from "react";
import { Button, Form, Input, ConfigProvider } from "antd";
import { Icon } from "@iconify/react";

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
            <h4 className="bold mt-4">Forgot Your password?</h4>
            <p>
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
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
                    name="email"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input your email.",
                        },
                        {
                            type: "email",
                            message: "Your email is invalid.",
                        },
                    ]}
                >
                    <Input placeholder="Email" size="middle" />
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
            <div className="or-divider">
                <div className="text-center mt">or login with</div>
            </div>

            <Button className="mt-3 mb-3 social-login-button">
                <Icon icon="devicon:google" />
            </Button>
            <Button className="social-login-button">
                <Icon icon="logos:facebook" />
            </Button>


        </div>
    );
};

export default Login;
