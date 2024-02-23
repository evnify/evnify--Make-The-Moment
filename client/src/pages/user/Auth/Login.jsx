import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, ConfigProvider, Row, Col } from "antd";
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
            <h4 className="bold mt-4">Hi, Welcome back!</h4>
            <p>Enter your credentials to continue</p>
            <Form
                className="mt-4 w-100 login-form"
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>

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
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="#forgot-password">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    <div className="mt-3 ml-2 text-center">
                        Don't have an Account <a href="#signup">Sign up!</a>
                    </div>
                </Form.Item>
            </Form>
            <div className="or-divider">
                <div className="text-center mt">or login with</div>
            </div>

            <Row gutter={{ xs: 8, sm: 16 }} justify="center">
                <Col
                    className="gutter-row"
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 24 }}
                >
                    <Button className="mt-3 w-50 button mr-3" >
                        <Icon icon="devicon:google" />
                    </Button>
                    <Button className="w-50 button mr-3">
                        <Icon icon="logos:facebook" />
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
