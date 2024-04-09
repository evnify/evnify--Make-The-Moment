import React, { useState, useRef } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import UserTab from "./UserTab";

import {
    ConfigProvider,
    Modal,
    Select,
    DatePicker,
    Input,
    Button,
    Radio,
    Divider,
    Space,
    message,
    Upload,
} from "antd";

import axios from "axios";

let index = 0;

const { Search, TextArea } = Input;

function UsersInsights() {
    const [selectedType, setSelectedType] = useState("all");
    const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);

    // Type Selector
    const [items, setItems] = useState([
        "Photographer",
        "Event Manager",
        "Manager",
        "Designer",
    ]);
    const [name, setName] = useState("");
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    // Add user model use states
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [type, setType] = useState("sick leave");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const onSearch = (value) => console.log(value);

    // Image upload
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
                        },
                    ]);
                    setProfileImage(response.data.data.url);
                    console.log(profileImage);
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
        <>
            <div className="admin_user_welcome"></div>
            <div className="UsersInsights">
                <UserTab />
            </div>
            <div className="chart_container">
                <div className="admin_user_chart1"></div>

                <div className="admin_user_chart2"></div>
            </div>
            <div className="admin_user_list"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ConfigProvider
                    theme={{
                        components: {
                            Modal: {},
                        },
                    }}
                >
                
                </ConfigProvider>
            </div>
        </>
    );
}

export default UsersInsights;
