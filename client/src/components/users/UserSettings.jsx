import React, { useState } from "react";
import axios from "axios";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, message, Upload } from "antd";
import UserBasicInfo from "./UserBasicInfo";

const { Dragger } = Upload;

export default function UserSettings() {
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
                <div className="setting-header">
                    <h4>General Settings</h4>
                    <p>Change your basic account settings.</p>
                </div>

                <div className="avtar">
                    <p>Avatar</p>
                    <div className="avatar-img">
                        <Avatar size={64} icon={<UserOutlined />} />
                    </div>
                    <div className="avatar-btn">
                        <button className="btn-change">Change</button>
                        <button className="btn-remove">Remove</button>
                    </div>
                </div>

                <div className="upload-box">
                    <p>Cover Photo</p>
                    <Dragger {...props} customRequest={customRequest}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </div>

                <div className="Basic-info">
                    <div className="setting-header">
                        <h4>Basic information</h4>
                        <p>
                            Update some personal information. Your address will
                            never be publicly available..
                        </p>
                        <UserBasicInfo/>
                    </div>
                    
                </div>
            </div>

            <div className="change-password"></div>
        </div>
    );
}
