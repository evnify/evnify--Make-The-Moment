import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space, message } from "antd";
import axios from "axios";

const ChangePw = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (newPassword === currentPassword) {
            setError("New password must be different from current password");
            return;
        }


    
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
    
        try {
            const response = await axios.post("/api/users/change-password", {
                userId: userID,
                currentPassword: currentPassword,
                newPassword: newPassword,
            });
            console.log(response.data);
            message.success("Password changed successfully");
            // Clear password fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
        } catch (error) {
            console.error("Error changing password:", error);
            
        }
    };
    


    return (
        <Space direction="vertical">
            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Current password</label>
                <Input.Password
                    style={{ flex: "auto", width: "492px", height: "36px", flexShrink: 0, marginTop: "10px" }}
                    placeholder="Input password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>New password</label>
                <Input.Password
                    style={{ flex: "auto", width: "492px", height: "36px", flexShrink: 0, marginTop: "10px" }}
                    placeholder="Input password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Space>

            <Space direction="horizontal" align="center">
                <label style={{ width: "200px", marginTop: "10px" }}>Confirm password</label>
                <Input.Password
                    style={{ flex: "auto", width: "492px", height: "36px", flexShrink: 0, marginTop: "10px" }}
                    placeholder="Input password"
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Space>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="save-btn">
                    <button onClick={handleChangePassword}>Save changes</button>
                </div>

        </Space>
    );
};

export default ChangePw;
