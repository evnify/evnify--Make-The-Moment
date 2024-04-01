import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import EmployeeListTable from "./UserListTable";
import {
    ConfigProvider,
    Modal,
    Select,
    Input,
    Button,
    Radio,
    Divider,
    Space,
    message,
    Upload,
} from "antd";

import axios from "axios";



const { Search, TextArea } = Input;

function UserList() {
    const [selectedType, setSelectedType] = useState("all");
    const [addUserModelOpen, setaddUserModelOpen] = useState(false);

    // Type Selector
    const [items] = useState(["Admin", "Hr-Manager", "Customer"]);


    // Add employee model use states
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setprofilePic] = useState("");

    const saveUser = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !address ||
            !type ||
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !username
        ) {
            return message.error("Please fill all the fields");
        } else if (!emailRegex.test(email)) {
            return message.error("Please enter a valid email address");
        }

        if (!profilePic || profilePic.trim() === "") {
            // Set default profile image
            setprofilePic(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
            );
            console.log(profilePic);
        } else {
            console.log("Profile image already set:", profilePic);
        }

        const userData = {
            address,
            type,
            firstName,
            lastName,
            email,
            phoneNumber,
            username,
            profilePic,
        };

        try {
            await axios.post("/api/User/addUser", userData);
        } catch (error) {
            console.log(error);
        }
    };

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
                    setprofilePic(response.data.data.url);
                    console.log(profilePic);
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
        <div style={{ display: "flex", flexDirection: "column" }}>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {},
                    },
                }}
            >
                <div className="admin_emp_list_container">
                    <div className="admin_emp_list_top_menu">
                        <div
                            style={{
                                marginRight: "auto",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <h5>All Users</h5>
                            <Search
                                placeholder="Search "
                                size="large"
                                onSearch={onSearch}
                                style={{
                                    width: 265,
                                    height: 40,
                                }}
                            />
                        </div>
                        <div
                            style={{ marginLeft: "auto", alignItems: "center" }}
                        >
                            <Radio.Group
                                value={selectedType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                }}
                                size="large"
                                style={{
                                    width: 250,
                                }}
                            >
                                <Radio.Button value="all">All</Radio.Button>
                                <Radio.Button value="active">
                                    Active
                                </Radio.Button>
                                <Radio.Button value="suspended">
                                    Suspended
                                </Radio.Button>
                            </Radio.Group>
                            <button
                                className="admin_emp_list_top_menu_button"
                                onClick={() => setaddUserModelOpen(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M8.5 2.75C8.5 2.55109 8.42098 2.36032 8.28033 2.21967C8.13968 2.07902 7.94891 2 7.75 2C7.55109 2 7.36032 2.07902 7.21967 2.21967C7.07902 2.36032 7 2.55109 7 2.75V7H2.75C2.55109 7 2.36032 7.07902 2.21967 7.21967C2.07902 7.36032 2 7.55109 2 7.75C2 7.94891 2.07902 8.13968 2.21967 8.28033C2.36032 8.42098 2.55109 8.5 2.75 8.5H7V12.75C7 12.9489 7.07902 13.1397 7.21967 13.2803C7.36032 13.421 7.55109 13.5 7.75 13.5C7.94891 13.5 8.13968 13.421 8.28033 13.2803C8.42098 13.1397 8.5 12.9489 8.5 12.75V8.5H12.75C12.9489 8.5 13.1397 8.42098 13.2803 8.28033C13.421 8.13968 13.5 7.94891 13.5 7.75C13.5 7.55109 13.421 7.36032 13.2803 7.21967C13.1397 7.07902 12.9489 7 12.75 7H8.5V2.75Z"
                                        fill="white"
                                    />
                                </svg>{" "}
                                &nbsp; Create New{" "}
                            </button>
                        </div>
                    </div>

                    <Modal
                        centered
                        open={addUserModelOpen}
                        onOk={() => setaddUserModelOpen(false)}
                        onCancel={() => setaddUserModelOpen(false)}
                        footer={null}
                        width={550}
                    >
                        <div className="request_leave_model_body_container">
                            <div className="add_employee_top_container">
                                <div className="avatar-container">
                                    <Upload
                                        customRequest={customRequest}
                                        listType="picture-circle"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={beforeUpload}
                                        onRemove={() => setFileList([])}
                                    >
                                        {fileList.length >= 1
                                            ? null
                                            : uploadButton}
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
                                <div
                                    style={{
                                        marginTop: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span
                                        style={{
                                            marginRight: "60px",
                                            marginBottom: "3px",
                                        }}
                                    >
                                        User Type
                                    </span>
                                    <Select
                                        style={{
                                            width: 220,
                                            height: 35,
                                        }}
                                        onChange={(value) => {
                                            setType(value);
                                            console.log(value);
                                        }}
                                        placeholder="Select"
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider
                                                    style={{
                                                        margin: "8px 0",
                                                    }}
                                                />
                                                <Space
                                                    style={{
                                                        padding: "0 8px 4px",
                                                    }}
                                                ></Space>
                                            </>
                                        )}
                                        options={items.map((item) => ({
                                            label: item,
                                            value: item,
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className="add_employee_popup_details_container">
                                <div className="add_employee_popup_details_container_left">
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: "3px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            First Name
                                        </span>
                                        <Input
                                            size="large"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: "3px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Email
                                        </span>
                                        <Input
                                            type="email"
                                            size="large"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: "3px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Phone Number
                                        </span>
                                        <Input
                                            size="large"
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="add_employee_popup_details_container_left">
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: "3px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Last Name
                                        </span>
                                        <Input
                                            size="large"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: "3px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Username
                                        </span>
                                        <Input
                                            size="large"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="add_emp_address_container">
                                <span>Address</span>
                                <TextArea
                                    style={{
                                        width: 520,
                                    }}
                                    rows={4}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="add_emp_popup_footer_container center">
                            <Button
                                onClick={() => setaddUserModelOpen(false)}
                                style={{
                                    width: "120px",
                                    height: "40px",
                                }}
                                danger
                            >
                                Cancel
                            </Button>
                            <button
                                className="add_emp_popup_footer_button"
                                onClick={saveUser}
                                style={{
                                    width: "120px",
                                    height: "40px",
                                }}
                            >
                                Add User
                            </button>
                        </div>
                    </Modal>

                    <div style={{ width: "100%" }}>
                        <EmployeeListTable />
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
}

export default UserList;
