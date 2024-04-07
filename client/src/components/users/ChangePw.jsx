import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

const ChangePw = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
        <Space direction="vertical">
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px",marginTop: "10px", }}>Current password</label>
                <Input.Password
                    style={{
                        flex: "auto",
                        width: "492px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="input password"
                />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px",marginTop: "10px", }}>New password</label>
                <Input.Password
                    style={{
                        flex: "auto",
                        width: "492px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="input password"
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px" ,marginTop: "10px",}}>Confirm password</label>
                <Input.Password
                    style={{
                        flex: "auto",
                        width: "492px",
                        height: "36px",
                        flexShrink: 0,
                        marginTop: "10px",
                    }}
                    placeholder="input password"
                    visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                    }}
                />
            </Space>
        </Space>
    );
};

export default ChangePw;
