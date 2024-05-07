import React, { useEffect, useState, useRef } from "react";
import { LoadingOutlined, PlusOutlined,PrinterOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";

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
    Table,
    Tag,
    Avatar,
} from "antd";

import axios from "axios";
import Loader from "./Loader";
import { Icon } from "@iconify/react";

var index = 0;

// searcj user
const { Search, TextArea } = Input;

function UserList() {
    const [searchkey, setsearchkey] = useState("");
    const { confirm } = Modal;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const conformSuspend = () => {
        setIsConformModalOpen(true);
        fetchUserList();
    };

    const conformActive = () => {
        setIsActiveModalOpen(true);
        fetchUserList();
    };

    async function handleDelete(userID) {
        try {
            const res = await axios.post("/api/users/deleteUser", { userID });
            message.success("User deleted successfully");
            fetchUserList();
        } catch (error) {
            console.log("Error deleting user: ", error);
        }
    }

    const [addUserModelOpen, setaddUserModelOpen] = useState(false);
    const [tableModelOpen, setTableModelOpen] = useState(false);
    const [tableModelContent, setTableModelContent] = useState();

    // Type Selector
    const [items, setItems] = useState(["Admin", "Hr-Manager", "Customer"]);

    const [name, setName] = useState("");
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    // Add user model use states
    const [address1, setaddress1] = useState("");
    const [userType, setuserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("Active");
    const [profilePic, setprofilePic] = useState("");

    //Edit user model use states
    const [editAddress, setEditAddress] = useState("");
    const [editType, setEditType] = useState("sick Type");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhoneNumber, setEditPhoneNumber] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editProfilePic, setEditProfilePic] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [fileListEdit, setFileListEdit] = useState([]);

    const fetchUserList = async () => {
        try {
            const response = await axios.get("/api/users/getUser");
            // Sort inventories by date in descending order
            const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sortedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await axios.get("/api/users/getUser");
                setUserList(response.data);
            } catch (error) {
                console.log("Error fetching user list: ", error);
            }
        };
    }, [fetchUserList]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const saveUser = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !address1 ||
            !userType ||
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !username ||
            !profilePic ||
            !status
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
        }

        const userData = {
            address1,
            userType,
            firstName,
            lastName,
            email,
            phoneNumber,
            username,
            profilePic,
            status,
        };

        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/users/addUser`,
                userData
            );

            if (response.status === 200) {
                message.success("User added successfully");
                setaddUserModelOpen(false);
                fetchUserList();

                // Reset form fields after successful submission
                setaddress1("");
                setuserType("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNumber("");
                setUsername("");
                setprofilePic("");
                setStatus("");
                setFileList([]);
            } else {
                message.error("Failed to add user");
            }
        } catch (error) {
            console.log(error);
            message.error("An error occurred while adding user");
        }
    };

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
                    setEditProfilePic(response.data.data.url);
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

    const saveEditUser = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !editAddress ||
            !editType ||
            !editFirstName ||
            !editLastName ||
            !editEmail ||
            !editPhoneNumber ||
            !editPhoneNumber ||
            !editStatus ||
            !editProfilePic
        ) {
            return message.error("Please fill all the fields");
        } else if (!emailRegex.test(editEmail)) {
            return message.error("Please enter a valid email address");
        }

        if (!editProfilePic || editProfilePic.trim() === "") {
            // Set default profile image
            setprofilePic(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
            );
        } else {
            console.log("Profile image already set:", editProfilePic);
        }

        const userData = {
            address1: editAddress,
            userType: editType,
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail,
            phoneNumber: editPhoneNumber,
            username: editUsername,
            profilePic: editProfilePic,
            userID: tableModelContent.userID,
            status: editStatus,
            _id: tableModelContent._id,
        };

        console.log(userData);

        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/users/editUser`,
                userData
            );
            message.success("User edit successfully");
            setTableModelOpen(false);
            fetchUserList();
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "user_ID",
            dataIndex: "userID",
            key: "userID",
        },
        {
            title: "",
            dataIndex: "profilePic",
            key: "profilePic",
            render: (_, record) => (
                <Avatar size={35} src={record.profilePic} alt="avatar" />
            ),
        },
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Email Address",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Type",
            dataIndex: "userType",
            key: "userType",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                let color = "green";
                if (status === "Suspended") {
                    color = "red";
                }
                return (
                    <Tag color={color}>
                        {status ? status.toUpperCase() : ""}
                    </Tag>
                );
            },
        },
        {
            title: "Address",
            dataIndex: "address1",
            key: "address1",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <button
                        onClick={() => showDeleteConform(record.userID)}
                        style={{
                            fontSize: "20px",
                            color: "#9D9D9D",
                            border: "none",
                            background: "transparent",
                        }}
                    >
                        <Icon icon="uil:trash-alt" />
                    </button>
                    {record.status === "active" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => showModal(record)}
                            >
                                <Icon icon="uil:setting" />
                            </button>
                        </>
                    ) : (
                        <button
                            style={{
                                fontSize: "20px",
                                color: "#9D9D9D",
                                border: "none",
                                background: "transparent",
                            }}
                            onClick={() => showModal(record)}
                        >
                            <Icon icon="uil:setting" />
                        </button>
                    )}
                </Space>
            ),
        },
    ];

    const showModal = (record) => {
        setTableModelContent(record);
        setTableModelOpen(true);
        setEditAddress(record.address1);
        setEditType(record.userType);
        setEditFirstName(record.firstName);
        setEditLastName(record.lastName);
        setEditEmail(record.email);
        setEditPhoneNumber(record.phoneNumber);
        setEditUsername(record.username);
        setEditProfilePic(record.profilePic);
        setEditStatus(record.status);
        console.log(record.state);
        setFileListEdit([
            {
                uid: "1",
                name: "image.png",
                status: "done",
                url: record.profilePic,
            },
        ]);
    };

    const onSearch = (value) => console.log(value);

    // Image upload

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

    const [isConformModalOpen, setIsConformModalOpen] = useState(false);
    const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);

    const suspendUser = async () => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/users/suspendUser`,
                { userID: tableModelContent.userID }
            );
            message.success("User suspended successfully");
            setTableModelOpen(false);
            setIsConformModalOpen(false);
            fetchUserList();
        } catch (error) {
            console.log(error);
        }
    };

    const activeUser = async () => {
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/users/activeUser`, {
                userID: tableModelContent.userID,
            });
            message.success("User activated successfully");
            setTableModelOpen(false);
            setIsActiveModalOpen(false);
            fetchUserList();
        } catch (error) {
            console.log(error);
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

    const [searchKey, setSearchKey] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [filteredUserList, setFilteredUserList] = useState([]);

    useEffect(() => {
        let tempList = data;

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.username
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()) ||
                    item.userID.toLowerCase().includes(searchKey.toLowerCase())
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter(
                (item) =>
                    item.status.toLowerCase() === selectedType.toLowerCase()
            );
        }

        setFilteredUserList(tempList);

        console.log("filteredUserList", tempList);
        console.log("userList", data);
        console.log("searchKey", searchKey);
        console.log("selectedType", selectedType);
    }, [searchKey, selectedType, data]);

    const showDeleteConform = (id) => {
        confirm({
            centered: true,
            title: "Are you sure?",
            icon: <ExclamationCircleFilled />,
            content: "Please confirm that you want to delete this salary",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
    };


    const handleExport = () => {
        const csvData = [];
        const headers = ["User ID", "First Name", "Last Name", "Email", "Phone Number", "Username", "User Type", "Status", "Address"];
        csvData.push(headers);
        filteredUserList.forEach((item) => {
            const row = [
                item.userID,
                item.firstName,
                item.lastName,
                item.email,
                item.phoneNumber,
                item.username,
                item.userType,
                item.status,
                item.address1
            ];
            csvData.push(row);
        });

        const csvRows = [];
        for (const row of csvData) {
            csvRows.push(row.join(","));
        }
        const csvString = csvRows.join("\n");
        const a = document.createElement("a");
        a.href = "data:attachment/csv," + encodeURIComponent(csvString);
        a.target = "_blank";
        a.download = "users.csv";
        document.body.appendChild(a);
        a.click();

    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Active conformation model */}
            <Modal
                title="Are You Sure?"
                open={isActiveModalOpen}
                onOk={activeUser}
                okText="Active"
                onCancel={() => setIsActiveModalOpen(false)}
                width={300}
                centered
            >
                <p>This can't be undone.</p>
            </Modal>
            {/* Suspend Conformation model */}
            <Modal
                title="Are You Sure?"
                open={isConformModalOpen}
                onOk={suspendUser}
                okText="Suspend"
                onCancel={() => setIsConformModalOpen(false)}
                width={300}
                centered
            >
                <p>This can't be undone.</p>
            </Modal>
            <Modal
                centered
                open={tableModelOpen}
                onOk={() => setTableModelOpen(false)}
                onCancel={() => setTableModelOpen(false)}
                footer={null}
                width={550}
            >
                <div className="add_user_model_body_container">
                    <div className="add_user_top_container">
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
                                    setEditProfilePic(
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
                                User Type
                            </span>
                            <Select
                                style={{
                                    width: 220,
                                    height: 35,
                                }}
                                onChange={(value) => {
                                    setEditType(value);
                                    console.log(value);
                                }}
                                value={editType}
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

                    <div className="add_user_popup_details_container">
                        <div className="add_user_popup_details_container_left">
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
                                    value={editFirstName}
                                    onChange={(e) =>
                                        setEditFirstName(e.target.value)
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
                                    value={editEmail}
                                    onChange={(e) =>
                                        setEditEmail(e.target.value)
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
                                    value={editPhoneNumber}
                                    onChange={(e) =>
                                        setEditPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="add_user_popup_details_container_left">
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
                                    value={editLastName}
                                    onChange={(e) =>
                                        setEditLastName(e.target.value)
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
                                    value={editUsername}
                                    onChange={(e) =>
                                        setEditUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="add_user_address_container">
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
                    {editStatus === "Active" ? (
                        <button
                            onClick={conformSuspend}
                            style={{
                                border: "none",
                                background: "none",
                                width: "fit-content",
                                color: "red",
                                margin: "10px 0 0 5px",
                            }}
                        >
                            Suspend User
                        </button>
                    ) : (
                        <button
                            onClick={conformActive}
                            style={{
                                border: "none",
                                background: "none",
                                width: "fit-content",
                                color: "green",
                                margin: "10px 0 0 5px",
                            }}
                        >
                            Activate User
                        </button>
                    )}
                </div>
                <div className="add_user_popup_footer_container center">
                    <Button
                        onClick={() => setTableModelOpen(false)}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                        danger
                    >
                        Cancel
                    </Button>
                    <button
                        className="add_user_popup_footer_button"
                        onClick={saveEditUser}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </Modal>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {},
                    },
                }}
            >
                <div className="admin_leave_request_container">
                <div className="admin_leave_request_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                            <h5>All Users</h5>
                            <Search
                                placeholder="Search by Name"
                                size="large"
                                onSearch={(value) => setSearchKey(value)}
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
                                className="admin_user_list_top_menu_button"
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

                            <button
                        style={{
                            fontSize: "14px",
                            border: "none",
                            backgroundColor: "#4094F7",
                            width: "100px",
                            height: "37px",
                            color: "#fff",
                            borderRadius: "5px",
                            marginLeft: "10px",
                        }}
                        onClick={handleExport}
                    >
                        <PrinterOutlined style={{ gap:"20" }} />
                        Export 
                    </button>
                        </div>
                    </div>

                    <Modal
                        footer={null}
                        open={addUserModelOpen}
                        onCancel={() => setaddUserModelOpen(false)}
                        centered
                        width={550}
                    >
                        <div className="_user_model_body_container">
                            <div className="add_user_top_container">
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
                                        value={userType}
                                        style={{
                                            width: 220,
                                            height: 35,
                                        }}
                                        onChange={(value) => {
                                            setuserType(value);
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

                            <div className="add_user_popup_details_container">
                                <div className="add_user_popup_details_container_left">
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
                                            value={firstName}
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
                                            value={email}
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
                                            value={phoneNumber}
                                            size="large"
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="add_user_popup_details_container_left">
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
                                            value={lastName}
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
                                            value={username}
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
                                    ></div>
                                </div>
                            </div>

                            <div className="add_user_address_container">
                                <span>Address</span>
                                <TextArea
                                    style={{
                                        width: 520,
                                    }}
                                    value={address1}
                                    rows={4}
                                    onChange={(e) => {
                                        setaddress1(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="add_user_popup_footer_container center">
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
                                className="add_user_popup_footer_button"
                                onClick={saveUser}
                                style={{
                                    width: "120px",
                                    height: "40px",
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </Modal>

                    <div style={{ width: "100%" }}>
                        <div className="row">
                            {loading && <Loader />}
                            <div className="col-md-12">
                                <Table
                                    dataSource={filteredUserList}
                                    columns={columns}
                                    pagination={{
                                        pageSize: 5,
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                    }}
                                    footer={() => (
                                        <div className="footer-number">{`Total ${data.length} items`}</div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
}

export default UserList;
