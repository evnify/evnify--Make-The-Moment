import React, { useEffect } from "react";
import { useState } from "react";
import { Upload, message, Modal } from "antd";
import { Icon } from "@iconify/react";
import { LoadingOutlined, PlusOutlined ,EditOutlined} from "@ant-design/icons";
import axios from "axios";
import { Input,Tag} from "antd";
import Link from "antd/es/typography/Link";
const { Search, TextArea } = Input;

function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [profileImage, setProfileImage] = useState();
    const [user, setUser] = useState({});
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);

    useEffect(() => {
        const fetchUserByID = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            const userID = { userID: user.userID };
    
            try {
                const res = await axios.post("/api/users/getUserById", userID);
                setUser(res.data);
                if (!res.data.profilePic) {
                    // Set default profile picture URL
                    const defaultProfilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png";
                    setFileList([
                        {
                            uid: "1",
                            name: "image.png",
                            status: "done",
                            url: defaultProfilePic,
                        },
                    ]);
                } else {
                    setFileList([
                        {
                            uid: "1",
                            name: "image.png",
                            status: "done",
                            url: res.data.profilePic,
                        },
                    ]);
                }
                setCoverPhoto(res.data.coverPic);
                console.log(res.data);
                setAllFieldsFilled(checkAllFieldsFilled(res.data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserByID();
    }, []);
    

    

    const checkAllFieldsFilled = (userData) => {
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "city",
            "province",
            "address1",
            "zipcode",
        ];

        let allFieldsFilled = true;

        for (const field of requiredFields) {
            if (!userData[field]) {
                allFieldsFilled = false;
                break; // Stop loop if any field is missing
            }
        }

        if (!allFieldsFilled) {
            message.error("Please fill out all required fields");
        }

        return allFieldsFilled;
    };

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
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
        try {
            await axios.post("/api/users/updateUserProfile", {
                userID: userID,
                profilePic: profilePic,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserCover = async (coverPhoto) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
        try {
            await axios.post("/api/users/updateUserCover", {
                userID: userID,
                coverPic: coverPhoto,
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

   
   



    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        try {
            const formData = new FormData();
            formData.append('image', file);
    
            const response = await axios.post(
                "https://api.imgbb.com/1/upload?key=700c61f2bf87cf203338efe206d7e66f",
                formData
            );
    
            if (response.data.data && response.data.data.url) {
                const imageUrl = response.data.data.url;
                updateUserCover(imageUrl);
                message.success("Image uploaded successfully,It will be display soon");
                fetchCoverPicUrl();
                
            } else {
                console.error('Failed to upload image');
                message.error("Failed to upload image");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error("Error uploading image");
        }
    };
    
    const fetchCoverPicUrl = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = { userID: user.userID };
        try {
            const res = await axios.post("/api/users/getUserById", userID); 
            setCoverPhoto(res.data.coverPic);
        } catch (error) {
            console.error(error);
        }
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
                            marginTop: "0.3px",
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
                onChange={handleUpload}
                // Add any other necessary props
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
                }}
                onClick={() => document.getElementById("upload").click()} // Trigger file input click
            >
                <EditOutlined />
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
                        <Link href="/userprofile/UserSettings" >
                        <button className="btn btn-primary edit">
                            Edit Profile
                        </button>
                    </Link>
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
            </div>

            <div className="banner_for_update_details">
                {!allFieldsFilled && (
                    <div className="banner" >
                        <Tag className= "tag" color="red">
                            
                            Please fill out all required fields. Click
                            <Link href="/userprofile/UserSettings"> here </Link>
                            to update your info.
                        </Tag>
                    </div>
                )}
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
                                value={user.address1}
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
                                value={user.phoneNumber}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}

export default UserProfile;
