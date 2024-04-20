import React, { useState } from "react";
import axios from "axios";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, message, Upload } from "antd";
import UserBasicInfo from "./UserBasicInfo";
import ChangePw from "./ChangePw";

const { Dragger } = Upload;

function UserSettings() {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append("image", file);

        axios
            .post(
                "https://api.imgbb.com/1/upload?key=700c61f2bf87cf203338efe206d7e66f",
                formData
            )
            .then((response) => {
                if (response.data.data) {
                    onSuccess();
                    message.success("Image uploaded successfully");
                    setFileList([
                        {
                            uid: "1",
                            name: "image.png",
                            status: "done",
                            url: response.data.data.url,
                        },
                    ]);
                    setLoading(false);
                } else {
                    onError();
                    message.error("Failed to upload image");
                }
            })
            .catch((error) => {
                onError();
                message.error("Error uploading image: " + error.message);
            });
    };

    const props = {
        name: "file",
        multiple: true,
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <div className="container">
            <div className="genral-setting">
                <div className="Basic-info">
                    <div className="setting-header">
                        <h4>Basic information</h4>
                        <p>
                            Update some personal information. Your address will
                            never be publicly available..
                        </p>
                        <UserBasicInfo />
                    </div>
                </div>
            </div>

            <div className="change-password">
                <div className="setting-header">
                    <h4>Change Password</h4>
                    <p>
                        Update your password. We recommend you use a strong
                        password that you aren't using elsewhere.
                    </p>
                </div>
                <div className="change-password-form">
                    <ChangePw />
                </div>

                <div className="pw-requirement">
                    <h4>Password requirements</h4>
                    <ul>
                        <li>
                            Minimum 8 characters long - the more, the better
                        </li>
                        <li>At least one lowercase character</li>
                        <li>At least one uppercase character</li>
                        <li>At least one number</li>
                    </ul>
                </div>

                <div className="save-btn">
                    <button>Save changes</button>
                </div>
                <div className="setting-header">
                    <h4>Deactivate Account</h4>

                    <p>
                        If you deactivate your account, you will lose access to
                        your profile and all your data will be permanently
                        deleted.
                    </p>
                </div>
                <button className="deactivate-acc">Deactivate Account</button>
            </div>
        </div>
    );
}

export default UserSettings;
