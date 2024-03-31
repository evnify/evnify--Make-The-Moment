import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";

const UserProfileForm = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
        <><Space direction="vertical">
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Full Name</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "260px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="first name" />

                <Input
                    style={{
                        flex: "auto",
                        width: "260px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="last name" />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>User name</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "260px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Email Address</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Contact Number </label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>City</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>province</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Address Line 1</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Address Line 2</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Zip code</label>
                <Input
                    style={{
                        flex: "auto",
                        width: "360px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="Enter your email address" />
            </Space>


        </Space><button className="btn btn-primary"> Save Changes</button>
        
        </>
        
    );
};

export default UserProfileForm;
