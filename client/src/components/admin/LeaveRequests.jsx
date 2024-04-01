import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import axios from "axios";

function LeaveRequests() {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const handleCancel = () => setPreviewOpen(false);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const handleChange = (info) => {
        console.log(info);
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
    };


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

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
                        }
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

    return (
        <div style={{ padding: "50px" }}>
            <Upload
                customRequest={customRequest}
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onRemove={() => setFileList([])}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
}

export default LeaveRequests;
