import React, { useEffect } from "react";
import { useState } from "react";
import { Upload, message, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [profileImage, setProfileImage] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserByID = async () => {
            const userID = localStorage.getItem("userID");
            try {
                const res = await axios.post("/api/users/getUserById", userID);
                setUser(res.data);
                setFileList([{
                    uid: "1",
                    name: "image.png",
                    status: "done",
                    url: res.data.profilePic,
                }]);
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

    return (
        <div className="container">
            <div className="bg-image ">
                <div className="profile-card">
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
                    <h2>John Doe</h2>
                    <p>
                        <strong>Email:</strong>
                        <span>
                            <a href="mailto:  [email protected]">
                                [email protected]
                            </a>
                        </span>
                    </p>
                </div>
                <button className="btn btn-primary edit">Edit Profile</button>
            </div>

            <div className="profile-details"></div>
        </div>
    );
}

export default UserProfile;
