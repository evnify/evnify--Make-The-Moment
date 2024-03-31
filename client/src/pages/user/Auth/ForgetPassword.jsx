import React from "react";
import { Button, Form, Input, ConfigProvider } from "antd";
import { Divider, Grid, Typography } from "@mui/material";
import FirebaseSocial from "./FirebaseSocial";
import Navbar from "../../../components/users/navBar";

const Login = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <><Navbar />
        
        <div className="forget-container">
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
                <Grid item xs={12}>
                    <Divider>
                        <Typography variant="caption">Sign up with</Typography>
                    </Divider>
                </Grid>
            </div>

            <Grid item xs={12} className="mt-3 ml-2 text-center">
                <FirebaseSocial />
            </Grid>


        </div></>
    );
};

export default Login;
