import React, { useState } from "react";
import { Button, Form, Input, ConfigProvider, message } from "antd";
import { Divider, Grid, Typography } from "@mui/material";
import FirebaseSocial from "./FirebaseSocial";
import Navbar from "../../../components/users/navBar";
import axios from "axios";



const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const handleSubmit = async () => {
        const user = {
            email,
        };
        try {
            const response = await axios.post("/api/users/forgot-password", user);
            const data = response.data;
            if (data.status === "User Not Exists!!") {
                message.error("User not found");
            } else {
                message.success("Email sent successfully");
                
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <>
            <Navbar />

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
                        <Input
                            placeholder="Email"
                            size="middle"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="submit"
                            htmlType="button" // Change htmlType to button
                            className="login-form-button"
                            onClick={handleSubmit} // Fix the typo here
                        >
                            Verify
                        </Button>
                    </Form.Item>
                </Form>
                <div className="or-divider">
                    <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption">
                                Sign up with
                            </Typography>
                        </Divider>
                    </Grid>
                </div>

                <Grid item xs={12} className="mt-3 ml-2 text-center">
                        <button
                            className="login-with-google-btn"
                           // onClick={() => login()}
                        >
                            Sign in with Google{" "}
                            <i className="fab fa-google"></i>
                        </button>
                       
                    </Grid>
            </div>
        </>
    );
};

export default ForgetPassword;
