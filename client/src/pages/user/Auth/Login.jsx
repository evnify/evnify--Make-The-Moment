import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Form,
    Input,
    ConfigProvider,
    Row,
    Col,
    message,
} from "antd";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../../components/users/navBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    
   

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setProfile(res.data);
                    checkEmailExistence(res.data.email);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const checkEmailExistence = async (email) => {
        try {
            const response = await axios.post("/api/users/check-existing", {
                email,
            });
            const emailExists = response.data.exists;

            if (emailExists) {
                const user = {
                    email,
                };
                try {
                    setLoading(true);
                    const loginResponse = await axios.post(
                        "/api/users/loginGoogle",
                        user
                    );
                    setLoading(false);

                    const userData = loginResponse.data;

                    // Redirect based on userType
                    switch (userData.userType) {
                        case "Admin":
                            navigate("/admin");
                            break;
                        case "Employee":
                            navigate("/employee");
                            break;
                        case "Hr-Manager":
                            navigate("/admin");
                            break;
                        default:
                            navigate("/");
                            break;
                    }

                    // Store user data in local storage
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(userData)
                    );

                    // Reload the window
                    window.location.reload();
                } catch (error) {
                    setLoading(false);
                    console.error("Login error:", error);
                    setError(true);
                    message.error("Invalid email or password");
                }
            } else {
                // If email doesn't exist, display error message
                message.error(
                    "Email not registered. Cannot proceed with login."
                );
                console.log("Email not registered. Cannot proceed with login.");
            }
        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    };

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

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const handleLogin = async () => {
       
        try {
            setLoading(true);
            
            const user = {
                email,
                password,
            };
            
            // Proceed with login request
            const response = await axios.post("/api/users/login", user);
            setLoading(false);
    
            const userData = response.data;

    
            // Check if the user is suspended
            if (userData.status === "Suspended") {
                message.error("Your account has been suspended");
                navigate("/contactus");
                return; // Exit the function early
            }
    

            // Redirect based on userType
            switch (userData.userType) {
                case "Admin":
                    navigate("/admin");
                    break;
                case "Employee":
                    navigate("/employee");
                    break;
                case "Hr-Manager":
                    navigate("/admin");
                    break;
                default:
                    navigate("/");
                    break;
            }
    
            // Store user data in local storage
            localStorage.setItem("currentUser", JSON.stringify(userData));
    
            // Before redirecting, store scroll position
            localStorage.setItem("scrollPosition", window.pageYOffset);
        } catch (error) {
            setLoading(false);
            message.error("Invalid email or password");
        
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
                                colorPrimary: "#fffff",
                                defaultActiveBg: "#1890ff",
                            },
                            hover: {
                                color: "#1890ff",
                            },
                        },
                    }}
                >
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
                                placeholder="Email"
                                style={{ borderRadius: "5px" }}
                                size="large"
                                onChange={(e) => setemail(e.target.value)}
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
                                onChange={(e) => setpassword(e.target.value)}
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
                                href="/ForgetPassword"
                            >
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                                size="middle"
                                onClick={handleLogin}
                            >
                                Log in
                            </Button>
                            <div className="mt-3 ml-2 text-center">
                                Don't have an Account{" "}
                                <a href="/signup">Sign up!</a>
                            </div>
                        </Form.Item>
                    </Form>
                    <div
                        className="or-divider "
                        style={{ borderRadius: "5px" }}
                    >
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
                            onClick={() => login()}
                        >
                            Sign in with Google{" "}
                            <i className="fab fa-google"></i>
                        </button>
                        
                    </Grid>
                </ConfigProvider>
            </div>
        </>
    );
};

export default Login;
