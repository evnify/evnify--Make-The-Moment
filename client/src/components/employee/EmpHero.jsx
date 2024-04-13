import React, { useState, useEffect, useRef } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Avatar,
    DatePicker,
    message,
    Input,
    Select,
    Divider,
    Modal,
    Upload,
    Button,
} from "antd";
import axios from "axios";
import moment from "moment";

function EmpHero() {
    let index = 0;

    const { TextArea } = Input;

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDaytime, setIsDaytime] = useState(true);
    const [editEmployeeModel, setEditEmployeeModel] = useState(false);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        setIsDaytime(currentHour >= 6 && currentHour < 18);
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // Fetch Employee Data
    const [loggedInUserID, setLoggedInUserID] = useState();
    const [employee, setEmployee] = useState();

    const [editAddress, setEditAddress] = useState("");
    const [editDob, setEditDob] = useState("");
    const [editType, setEditType] = useState("sick leave");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhoneNumber, setEditPhoneNumber] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editProfileImage, setEditProfileImage] = useState("");
    const [editEmpID, setEditEmpID] = useState("");
    const [fileListEdit, setFileListEdit] = useState([]);

    const [profileImage, setProfileImage] = useState("");
    const [userImg, setUserImg] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const FetchEmployeeByUserID = async (userID) => {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/getEmployeeByUserID`,
                {
                    userID: userID,
                }
            );
            setEmployee(response.data);
            setEditAddress(response.data.address);
            setEditDob(response.data.dob);
            setEditType(response.data.type);
            setEditFirstName(response.data.firstName);
            setEditLastName(response.data.lastName);
            setEditEmail(response.data.email);
            setEditPhoneNumber(response.data.phoneNumber);
            setEditUsername(response.data.username);
            setEditProfileImage(response.data.profileImage);
            setUserImg(response.data.profileImage);
            setEditEmpID(response.data.empID);
            setFileListEdit([
                {
                    uid: "1",
                    name: "image.png",
                    status: "done",
                    url: response.data.profileImage,
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const emp = JSON.parse(localStorage.getItem("currentUser"));
        setLoggedInUserID(emp.userID);
        FetchEmployeeByUserID(emp.userID);
    }, []);

    const customRequestEdit = ({ file, onSuccess, onError }) => {
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
                    setFileListEdit([
                        {
                            uid: "1",
                            name: "image.png",
                            status: "done",
                            url: response.data.data.url,
                        },
                    ]);
                    setEditProfileImage(response.data.data.url);
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

    const saveEditEmployee = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !editAddress ||
            !editDob ||
            !editType ||
            !editFirstName ||
            !editLastName ||
            !editEmail ||
            !editPhoneNumber ||
            !editPhoneNumber
        ) {
            return message.error("Please fill all the fields");
        } else if (!emailRegex.test(editEmail)) {
            return message.error("Please enter a valid email address");
        }

        if (!editProfileImage || editProfileImage.trim() === "") {
            // Set default profile image
            setProfileImage(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
            );
        }
        const empData = {
            address: editAddress,
            dob: editDob,
            type: editType,
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail,
            phoneNumber: editPhoneNumber,
            username: editUsername,
            profileImage: editProfileImage,
            empID: employee.empID,
            _id: employee._id,
        };

        console.log(empData);

        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/editEmployee`,
                empData
            );
            await axios.post(`${process.env.PUBLIC_URL}/api/users/editUser`, {
                userID: employee.userID,
                username: editUsername,
                profilePic: editProfileImage,
                firstName: editFirstName,
                lastName: editLastName,
                email: editEmail,
                phoneNumber: editPhoneNumber,
                address1: editAddress,
            });
            message.success("Your changes is successfully saved");
            setEditEmployeeModel(false);
            FetchEmployeeByUserID(loggedInUserID);
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className="employee_dashboard_hero">
            {/* Edit employee model */}
            <Modal
                centered
                open={editEmployeeModel}
                onOk={() => setEditEmployeeModel(false)}
                onCancel={() => setEditEmployeeModel(false)}
                footer={null}
                width={550}
            >
                <div className="request_leave_model_body_container">
                    <div className="add_employee_top_container">
                        <div className="avatar-container">
                            <Upload
                                customRequest={customRequestEdit}
                                listType="picture-circle"
                                fileList={fileListEdit}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={beforeUpload}
                                onRemove={() => {
                                    setFileListEdit([]);
                                    setEditProfileImage(
                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
                                    );
                                }}
                            >
                                {fileListEdit.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal
                                open={previewOpen}
                                footer={null}
                                onCancel={handleCancel}
                                title={"Preview: "}
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
                                Employee Type : {editType}
                            </span>
                            <span
                                style={{
                                    marginRight: "60px",
                                    marginBottom: "3px",
                                }}
                            >
                                Employee ID : {editEmpID}
                            </span>
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
                                        setEditFirstName(e.target.value)
                                    }
                                    value={editFirstName}
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
                                        setEditEmail(e.target.value)
                                    }
                                    value={editEmail}
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
                                        setEditPhoneNumber(e.target.value)
                                    }
                                    value={editPhoneNumber}
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
                                        setEditLastName(e.target.value)
                                    }
                                    value={editLastName}
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
                                        setEditUsername(e.target.value)
                                    }
                                    value={editUsername}
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
                                    Date of Birth
                                </span>
                                <DatePicker
                                    style={{
                                        width: 205,
                                        height: 40,
                                    }}
                                    defaultValue={moment(editDob)}
                                    onChange={(date, dateString) => {
                                        setEditDob(dateString);
                                    }}
                                />
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
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="add_emp_popup_footer_container center">
                    <Button
                        onClick={() => setEditEmployeeModel(false)}
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
                        onClick={saveEditEmployee}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </Modal>
            <div className="emp_hero_container_main">
                <Avatar
                    className="emp_hero_dp"
                    size={168}
                    src={<img src={userImg} alt="avatar" />}
                />
                <div className="emp_hero_name_container">
                    <h1>Hello,</h1>
                    <h2>
                        {editFirstName} {editLastName}
                    </h2>
                    <h4>{editType}</h4>
                </div>
                <div className="emp_hero_edit_btn_container">
                    <button
                        className="emp_hero_edit_btn"
                        onClick={() => {
                            setEditEmployeeModel(true);
                        }}
                    >
                        edit
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                        >
                            <path
                                d="M10.037 3.88408L11.2076 5.05461M10.7895 2.85288L7.62296 6.01946C7.45934 6.18285 7.34775 6.39102 7.30226 6.61773L7.00977 8.08186L8.4739 7.78882C8.7006 7.74348 8.9085 7.63234 9.07217 7.46867L12.2388 4.30209C12.3339 4.20693 12.4094 4.09396 12.4609 3.96963C12.5124 3.84531 12.5389 3.71205 12.5389 3.57748C12.5389 3.44291 12.5124 3.30966 12.4609 3.18533C12.4094 3.061 12.3339 2.94803 12.2388 2.85288C12.1436 2.75772 12.0306 2.68224 11.9063 2.63074C11.782 2.57924 11.6487 2.55273 11.5141 2.55273C11.3796 2.55273 11.2463 2.57924 11.122 2.63074C10.9977 2.68224 10.8847 2.75772 10.7895 2.85288Z"
                                stroke="white"
                                stroke-width="1.10585"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M11.4345 9.18792V10.8467C11.4345 11.14 11.318 11.4212 11.1106 11.6286C10.9032 11.836 10.6219 11.9525 10.3286 11.9525H4.24647C3.95318 11.9525 3.67191 11.836 3.46452 11.6286C3.25713 11.4212 3.14063 11.14 3.14062 10.8467V4.76454C3.14062 4.47125 3.25713 4.18997 3.46452 3.98259C3.67191 3.7752 3.95318 3.65869 4.24647 3.65869H5.90524"
                                stroke="white"
                                stroke-width="1.10585"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <div className="emp_hero_notification_container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="28"
                        viewBox="0 0 23 24"
                        fill="none"
                    >
                        <path
                            d="M2.8125 8.20019L10.2099 13.1318C10.8397 13.5517 11.6603 13.5517 12.2901 13.1318L19.6875 8.20019M4.6875 18.5127H17.8125C18.848 18.5127 19.6875 17.6732 19.6875 16.6377V7.2627C19.6875 6.22716 18.848 5.3877 17.8125 5.3877H4.6875C3.65197 5.3877 2.8125 6.22716 2.8125 7.26269V16.6377C2.8125 17.6732 3.65197 18.5127 4.6875 18.5127Z"
                            stroke="#3F3F46"
                            stroke-width="1.08"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 23 23"
                        fill="none"
                    >
                        <path
                            d="M14.0625 15.9375H18.75L17.4329 14.6204C17.0757 14.2632 16.875 13.7787 16.875 13.2735V10.3125C16.875 7.86334 15.3097 5.77977 13.125 5.00758V4.6875C13.125 3.65197 12.2855 2.8125 11.25 2.8125C10.2145 2.8125 9.375 3.65197 9.375 4.6875V5.00758C7.19026 5.77977 5.625 7.86334 5.625 10.3125V13.2735C5.625 13.7787 5.42433 14.2632 5.06712 14.6204L3.75 15.9375H8.4375M14.0625 15.9375V16.875C14.0625 18.4283 12.8033 19.6875 11.25 19.6875C9.6967 19.6875 8.4375 18.4283 8.4375 16.875V15.9375M14.0625 15.9375H8.4375"
                            stroke="#3F3F46"
                            stroke-width="1.08"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <Avatar
                        size={40}
                        src={<img src={userImg} alt="avatar" />}
                    />
                </div>
                <div className="emp_hero_realtime_insights_container center">
                    {isDaytime ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 69 69"
                            fill="none"
                        >
                            <path
                                d="M34.5 53.3182C29.5091 53.3182 24.7226 51.3356 21.1935 47.8065C17.6644 44.2774 15.6818 39.4909 15.6818 34.5C15.6818 29.5091 17.6644 24.7226 21.1935 21.1935C24.7226 17.6644 29.5091 15.6818 34.5 15.6818C39.4909 15.6818 44.2774 17.6644 47.8065 21.1935C51.3356 24.7226 53.3182 29.5091 53.3182 34.5C53.3182 39.4909 51.3356 44.2774 47.8065 47.8065C44.2774 51.3356 39.4909 53.3182 34.5 53.3182ZM34.5 47.0455C37.8273 47.0455 41.0182 45.7237 43.371 43.371C45.7237 41.0182 47.0455 37.8273 47.0455 34.5C47.0455 31.1727 45.7237 27.9818 43.371 25.629C41.0182 23.2763 37.8273 21.9545 34.5 21.9545C31.1727 21.9545 27.9818 23.2763 25.629 25.629C23.2763 27.9818 21.9545 31.1727 21.9545 34.5C21.9545 37.8273 23.2763 41.0182 25.629 43.371C27.9818 45.7237 31.1727 47.0455 34.5 47.0455ZM31.3636 0H37.6364V9.40909H31.3636V0ZM31.3636 59.5909H37.6364V69H31.3636V59.5909ZM7.88796 12.3228L12.3228 7.88796L18.975 14.5402L14.5402 18.975L7.88796 12.3228ZM50.025 54.4598L54.4598 50.025L61.112 56.6772L56.6772 61.112L50.025 54.4598ZM56.6772 7.88482L61.112 12.3228L54.4598 18.975L50.025 14.5402L56.6772 7.88796V7.88482ZM14.5402 50.025L18.975 54.4598L12.3228 61.112L7.88796 56.6772L14.5402 50.025ZM69 31.3636V37.6364H59.5909V31.3636H69ZM9.40909 31.3636V37.6364H0V31.3636H9.40909Z"
                                fill="#FFD600"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18 2.75C17.5858 2.75 17.25 2.41421 17.25 2C17.25 1.58579 17.5858 1.25 18 1.25H22C22.3034 1.25 22.5768 1.43273 22.6929 1.71299C22.809 1.99324 22.7449 2.31583 22.5304 2.53033L19.8107 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H18C17.6967 6.75 17.4232 6.56727 17.3071 6.28701C17.191 6.00676 17.2552 5.68417 17.4697 5.46967L20.1894 2.75H18ZM13.5 8.75C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.5C16.8034 7.25 17.0768 7.43273 17.1929 7.71299C17.309 7.99324 17.2449 8.31583 17.0304 8.53033L15.3107 10.25H16.5C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75H13.5C13.1967 11.75 12.9232 11.5673 12.8071 11.287C12.691 11.0068 12.7552 10.6842 12.9697 10.4697L14.6894 8.75H13.5Z"
                                fill="#1C274C"
                            />
                            <path
                                opacity="0.5"
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="#1C274C"
                            />
                        </svg>
                    )}

                    <div className="emp_hero_date_container">
                        <h1>{formattedTime}</h1>
                        <h2>Realtime Insight</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpHero;
