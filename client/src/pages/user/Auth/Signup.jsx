import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Row, Col, Space } from "antd";
import { UserAddOutlined, LockOutlined } from "@ant-design/icons";
import { Divider, Grid, Typography } from "@mui/material";
import FirebaseSocial from "./FirebaseSocial";
import Navbar from "../../../components/users/navBar";
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentModal, setCurrentModal] = useState(0);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onCheckboxChange = (e) => {
        console.log("Checkbox checked:", e.target.checked);
    };

    const passwordValidation = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Password is required"));
        }

        // Check if password meets complexity requirements
        const minLength = 8; // Minimum length requirement
        const hasUpperCase = /[A-Z]/.test(value); // At least one uppercase letter
        const hasLowerCase = /[a-z]/.test(value); // At least one lowercase letter
        const hasDigit = /\d/.test(value); // At least one digit
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); // At least one special character

        if (
            value.length < minLength ||
            !hasUpperCase ||
            !hasLowerCase ||
            !hasDigit ||
            !hasSpecialChar
        ) {
            return Promise.reject(
                new Error(
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
                )
            );
        }

        return Promise.resolve();
    };

    const termsValidation = (_, value) => {
        if (value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("You must agree to the terms"));
    };

    async function register() {
        setIsLoading(true);
        console.log("Register function called");
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            username: username,
        };

        try {
            const response = await axios.post("/api/users/register", user);
        } catch (error) {
            if (error.response) {
                console.log("Error1:", error.response.data); // Log the error message from the server
            } else {
                console.log("Error2:", error.message); // Log the general error message
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className="signup-container col-md-12 ">
                <h4 className="bold mt-4">Sign up!</h4>
                <p>Enter your credentials to continue</p>

                <Form
                    mt-4
                    w-100
                    name="signup"
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Row gutter={{ xs: 8, sm: 16 }}>
                        <Col
                            className="gutter-row"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            <Form.Item
                                hasFeedback
                                name="firstName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your first name.",
                                    },
                                    {
                                        min: 2,
                                        message:
                                            "Your first name must be at least 2 characters.",
                                    },
                                    {
                                        pattern: /^[A-Za-z]+$/,
                                        message:
                                            "Your first name can only contain letters.",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserAddOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="First Name"
                                    style={{ borderRadius: "5px" }}
                                    size="large"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            className="gutter-row"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            <Form.Item
                                hasFeedback
                                name="lastName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your last name.",
                                    },
                                    {
                                        min: 2,
                                        message:
                                            "Your last name must be at least 2 characters.",
                                    },
                                    {
                                        pattern: /^[A-Za-z]+$/,
                                        message:
                                            "Your last name can only contain letters.",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Last Name"
                                    size="large"
                                    style={{ borderRadius: "5px" }}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="username" 
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please input your username.",
                            },
                            {
                                min: 4,
                                message: "Your username must be at least 4 characters.",
                            },
                            {
                                pattern: /^[A-Za-z0-9]+$/,
                                message: "Your username can only contain letters and numbers.",
                            },
                        ]}
                    >
                        <Input

                            placeholder="Username"
                            size="large"
                            style={{ borderRadius: "5px" }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>


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
                            size="large"
                            style={{ borderRadius: "5px" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone number.",
                            },
                            {
                                pattern: /^[0-9+-]+$/,
                                message: "Please input a valid phone number.",
                            },

                            {
                                min: 9,
                                message: "Your phone number is too short.",
                            },

                            {
                                max: 10,
                                message: "Your phone number is too long.",
                            },
                        ]}
                    >
                        <Space direction="vertical" size="large">
                            <Space.Compact>
                                <Input
                                    style={{ width: "20%" }}
                                    defaultValue="+94"
                                    size="large"
                                />
                                <Input
                                    style={{
                                        width: "100%",
                                        borderRadius: "0 5px 5px 0",
                                    }}
                                    placeholder="7xxxxxxx"
                                    size="large"
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </Space.Compact>
                        </Space>
                    </Form.Item>

                    <Row gutter={{ xs: 8, sm: 16 }}>
                        <Col
                            className="gutter-row"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            <Form.Item
                                name="password"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password.",
                                    },
                                    {
                                        validator: passwordValidation,
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Password"
                                    size="large"
                                    style={{ borderRadius: "5px" }}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            className="gutter-row"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            <Form.Item
                                name="confirm"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Confirm your password.",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords that you entered do not match!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Confirm Password"
                                    size="large"
                                    style={{ borderRadius: "5px" }}
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Form.Item
                            name="agree"
                            valuePropName="checked"
                            noStyle
                            rules={[{ validator: termsValidation }]}
                        >
                            <Checkbox onChange={onCheckboxChange}>
                                I agree to{" "}
                                <a href="#">Terms of Use & Privacy policy</a>.
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="signup-form-button"
                            size="middle"
                            style={{ borderRadius: "5px" }}
                            disabled={
                                !form.isFieldsTouched(true) || // Disable button if any field hasn't been touched
                                form
                                    .getFieldsError()
                                    .filter(({ errors }) => errors.length) // Filter out fields with errors
                                    .length // If there are any fields with errors, disable the button
                            }
                            onClick={register}
                            
                        >
                            Sign Up
                        </Button>
                        <div className="mt-3 ml-2 text-center">
                            Already have an Account{" "}
                            <a href="./signin">Log in!</a>
                        </div>
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
                    <FirebaseSocial />
                </Grid>
            </div>
        </>
    );
};

export default Signup;
