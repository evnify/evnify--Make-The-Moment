import React, { useEffect } from "react";
import { useState } from "react";
import { Upload, message, Modal } from "antd";
import { Icon } from "@iconify/react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Input, Select, Divider, Space } from "antd";
import { Link } from "react-router-dom";
const { Search, TextArea } = Input;

function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [profileImage, setProfileImage] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserByID = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            const userID = { userID: user.userID };
            console.log(userID);

            try {
                const res = await axios.post("/api/users/getUserById", userID);
                setUser(res.data);
                setFileList([
                    {
                        uid: "1",
                        name: "image.png",
                        status: "done",
                        url: res.data.profilePic,
                    },
                ]);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserByID();
    }, []);

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
    };

    const updateUserProfile = async (profilePic) => {
        const userID = localStorage.getItem("userID");
        try {
            await axios.post("/api/users/updateUserProfile", {
                userID: userID,
                profilePic: profilePic,
            });
        } catch (error) {
            console.error(error);
        }
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
                    updateUserProfile(response.data.data.url);
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

    const [coverPhoto, setCoverPhoto] = useState(null);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const customCoverRequest = ({ file, onSuccess, onError }) => {
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
                    message.success("Cover photo uploaded successfully");
                    setCoverPhoto(response.data.data.url);
                    console.log("Cover photo URL:", response.data.data.url);
                } else {
                    onError();
                    message.error("Failed to upload cover photo");
                }
            })
            .catch((error) => {
                onError();
                message.error("Error uploading cover photo: " + error.message);
            });
    };

    return (
        <div className="container">
            <div className="bg-image ">
                <div className="profile-card">
                    <div style={{ position: "relative" }}>
                        <label htmlFor="upload" style={{ cursor: "pointer" }}>
                            {coverPhoto ? (
                                <img
                                    src={coverPhoto}
                                    alt="Cover"
                                    style={{
                                        width: "963px",
                                        height: "152px",
                                        arginTop: "0.3px",
                                        marginLeft: "0.3px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        marginTop: "0.3px",
                                        marginLeft: "0.3px",
                                        width: "963px",
                                        height: "152px",
                                        backgroundColor: "#ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                    }}
                                >
                                    <span>No cover photo selected</span>
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            style={{ display: "none" }}
                            customRequest={customCoverRequest}
                            onPreview={handlePreview}
                        />
                        <button
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                                padding: "8px 16px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                onclick: "handleUpload",
                            }}
                        >
                            <Icon icon="uil:trash-alt" />
                        </button>
                    </div>

                    <div className="avatarImg-container">
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
                            title={"Preview: "}
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
                </div>

                <div className="profile-info">
                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>
                    <p>
                        <strong>Email:</strong>
                        <span>
                            <a href="mailto:  [email protected]">
                                {user.email}
                            </a>
                        </span>
                    </p>
                </div>
                <Link to="/usersettings">
                    <button className="btn btn-primary edit" style={{}}>
                        Edit Profile
                    </button>
                </Link>
            </div>

            <div
                className="add_user_details_container_right"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "40px",
                }}
            >
                {/* First Name and Last Name */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.firstName}
                            />

                            {/* Adjust width here */}
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.lastName}
                            />
                        </div>
                    </div>
                </div>
                {/* Email and Phone Number */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.email}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                user Id
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.userID}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                {/* Username and Password */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.username}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                Status
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.status}
                            />
                        </div>
                    </div>
                </div>
                {/* User Type and City */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                User Type
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.userType}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                City
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.city}
                            />
                        </div>
                    </div>
                </div>
                {/* Province and Address 1 */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                Province
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.province}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                Address
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.address}
                            />
                        </div>
                    </div>
                </div>
                {/* Zipcode and Status */}
                <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ marginRight: "8px", flex: 1 }}>
                        <div
                            style={{
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
                                Zip Code
                            </span>
                            <Input
                                size="large"
                                style={{ width: "340px", marginRight: "40px" }}
                                value={user.zipcode}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
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
                                style={{ width: "340px", marginRight: "40px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
