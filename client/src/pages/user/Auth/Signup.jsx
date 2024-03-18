import React from "react";
import { Form, Input, Checkbox, Button, Row, Col, Space } from "antd";
import { UserAddOutlined, LockOutlined } from "@ant-design/icons";
import { Divider, Grid, Typography } from "@mui/material";
import FirebaseSocial from "./FirebaseSocial";

const Signup = () => {

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [form] = Form.useForm();

    const onCheckboxChange = (e) => {
        console.log("Checkbox checked:", e.target.checked);
    };

    const validation = (_, value) => {
        if (value && value.length > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("You must agree to the terms"));
    };

    return (
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
                                    message: "Please input your first name.",
                                },
                                {
                                    min: 2,
                                    message:
                                        "Your first name must be at least 2 characters.",
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
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserAddOutlined className="site-form-item-icon" />
                                }
                                placeholder="Last Name"
                                size="large"
                                style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

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
                                    min: 6,
                                    message:
                                        "Password must be minimum 6 characters.",
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
                                            getFieldValue("password") === value
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
                                placeholder=" Confirm Password"
                                size="large"
                                style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Form.Item
                        name="agree"
                        valuePropName="checked"
                        noStyle
                        rules={[{ validator: validation }]}
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
                        size="large"
                        style={{ borderRadius: "5px" }}
                    >
                        {" "}
                        Sign Up
                    </Button>
                    <div className="mt-3 ml-2 text-center">
                        Already have an account? <a href="#signup">Login</a>
                    </div>
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
        </div>
    );
};

export default Signup;