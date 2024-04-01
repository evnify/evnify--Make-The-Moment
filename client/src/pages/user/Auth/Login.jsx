import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, ConfigProvider, Row, Col } from "antd";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirebaseSocial from "./FirebaseSocial";
import Navbar from "../../../components/users/navBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../../components/admin";

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        {
            const user = {
                email,
                password,
            };
            try {
                setLoading(true);
                const response = await axios.post("/api/users/login", user);
                setLoading(false);

                const userData = response.data;

                localStorage.setItem("currentUser", JSON.stringify(userData));
                window.location.reload();

                // Redirect to the home page
                navigate("/home");
            } catch (error) {
                setLoading(false);
                console.error("Login error:", error);
                setError(true);
            }
        }
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
                            style={{ borderRadius: "5px" }}
                            size="large"
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
                            style={{ borderRadius: "5px" }}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a
                            className="login-form-forgot"
                            href="#forgot-password"
                        >
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ borderRadius: "5px" }}
                            size="middle"
                        >
                            Log in
                        </Button>
                        <div className="mt-3 ml-2 text-center">
                            Don't have an Account <a href="#signup">Sign up!</a>
                        </div>
                    </Form.Item>
                </Form>
                <div className="or-divider " style={{ borderRadius: "5px" }}>
                    <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption">
                                Sign up with
                            </Typography>
                        </Divider>
                    </Grid>
                </div>

                <Grid item xs={12} className="mt-3 ml-2 text-center">
                    <FirebaseSocial />
                </Grid>
            </div>
        </>
    );
};

export default Login;
