import React, { useState, useRef, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import moment from "moment";
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
    Avatar,
    Tag,
    Table,
} from "antd";

import axios from "axios";
import { set } from "mongoose";

let index = 0;

const { Search, TextArea } = Input;

function EmployeeList() {
    const [selectedType, setSelectedType] = useState("all");
    const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);
    const [tableModelOpen, setTableModelOpen] = useState(false);
    const [tableModelContent, setTableModelContent] = useState();

    const [isLeavesLoading, setIsLeavesLoading] = useState(true);
    const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);
    const [isEventsLoading, setIsEventsLoading] = useState(false);

    // fetch upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState([]);

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

    // Add employee model use states
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [type, setType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");

    //Edit employee model use states
    const [editAddress, setEditAddress] = useState("");
    const [editDob, setEditDob] = useState("");
    const [editType, setEditType] = useState("sick leave");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhoneNumber, setEditPhoneNumber] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editProfileImage, setEditProfileImage] = useState("");
    const [editStatus, setEditStatus] = useState("");

    const [fileListEdit, setFileListEdit] = useState([]);

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
        } else {
            console.log("Profile image already set:", editProfileImage);
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
            empID: tableModelContent.empID,
            _id: tableModelContent._id,
        };

        console.log(empData);

        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/editEmployee`,
                empData
            );
            await axios.post(`${process.env.PUBLIC_URL}/api/users/editUser`, {
                userID: tableModelContent.userID,
                username: editUsername,
                profilePic: editProfileImage,
                firstName: editFirstName,
                lastName: editLastName,
                email: editEmail,
                phoneNumber: editPhoneNumber,
                address1: editAddress,
            });
            message.success("Employee edit successfully");
            setTableModelOpen(false);
            fetchEmployeeList();
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    //Employee table
    const columns = [
        {
            title: "",
            dataIndex: "profileImage",
            key: "profileImage",
            render: (_, record) => (
                <Avatar
                    size={35}
                    src={record.profileImage}
                    alt="profileImage"
                />
            ),
        },
        {
            title: "ID",
            dataIndex: "empID",
            key: "empID",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
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
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "active" ? (
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
        setEditAddress(record.address);
        setEditDob(record.dob);
        setEditType(record.type);
        setEditFirstName(record.firstName);
        setEditLastName(record.lastName);
        setEditEmail(record.email);
        setEditPhoneNumber(record.phoneNumber);
        setEditUsername(record.username);
        setEditProfileImage(record.profileImage);
        setEditStatus(record.status);
        setFileListEdit([
            {
                uid: "1",
                name: "image.png",
                status: "done",
                url: record.profileImage,
            },
        ]);
    };
    async function fetchEmployeeList() {
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/employees/getAllEmployees`
        );
        setEmployeeList(response.data);
        setIsEmployeeLoading(false);
    }

    const [pendingLeaves, setPendingLeaves] = useState([]);
    //Fetch pending leaves
    const fetchPendingLeaves = async () => {
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/leaves/getPendingLeaves`
        );
        setPendingLeaves(response.data);
        setIsLeavesLoading(false);
    };

    useEffect(() => {
        fetchPendingLeaves();
    }, []);

    const saveEmployee = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !address ||
            !dob ||
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

        if (!profileImage || profileImage.trim() === "") {
            // Set default profile image
            setProfileImage(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
            );
        } else {
            console.log("Profile image already set:", profileImage);
        }

        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            username,
            profilePic: profileImage,
            userType: "Employee",
            status: "Active",
            address1: address,
        };

        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/users/addUser`,
                userData
            );

            const empData = {
                address,
                dob,
                type,
                firstName,
                lastName,
                email,
                phoneNumber,
                username,
                profileImage,
                userID: response.data.userID,
            };

            const res = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/addEmployee`,
                empData
            );
            message.success("Employee added successfully");
            setAddEmployeeModelOpen(false);
            fetchEmployeeList();
            // Reset form fields
            setAddress("");
            setDob(null);
            setType("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setUsername("");
            setProfileImage("");
            setFileList([]);
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    // Image upload
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
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

    const fetchUpcomingEvents = async () => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/bookings/getAllBookings`
        );

        const temp = response.data.filter((event) => {
            return event.eventDate > formattedToday;
        });
        setUpcomingEvents(temp);
        setIsEventsLoading(false);
    };

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    // Table Functions
    const [employeeList, setEmployeeList] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const conformSuspend = () => {
        setIsConformModalOpen(true);
    };

    const conformActive = () => {
        setIsActiveModalOpen(true);
    };

    const [isConformModalOpen, setIsConformModalOpen] = useState(false);
    const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);

    const suspendUser = async () => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/suspendEmployee`,
                { empID: tableModelContent.empID }
            );
            await axios.post(
                `${process.env.PUBLIC_URL}/api/users/suspendUser`,
                { userID: tableModelContent.userID }
            );
            message.success("Employee suspended successfully");
            setTableModelOpen(false);
            setIsConformModalOpen(false);
            fetchEmployeeList();
        } catch (error) {
            console.log(error);
        }
    };

    const activeUser = async () => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/activeEmployee`,
                { empID: tableModelContent.empID }
            );
            await axios.post(`${process.env.PUBLIC_URL}/api/users/activeUser`, {
                userID: tableModelContent.userID,
            });
            message.success("Employee activated successfully");
            setTableModelOpen(false);
            setIsActiveModalOpen(false);
            fetchEmployeeList();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployeeList();
    }, []);

    //Filter employee list
    const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    const formatDareful = (date) => {
        const createdAtDate = new Date(date);
        const formattedDate = createdAtDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        return formattedDate;
    };

    useEffect(() => {
        let tempList = employeeList;

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.firstName.toLowerCase().includes(searchKey) ||
                    item.lastName.toLowerCase().includes(searchKey) ||
                    item.empID.toLowerCase().includes(searchKey)
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter((item) => item.status === selectedType);
        }

        setFilteredEmployeeList(tempList);
    }, [searchKey, selectedType, employeeList]);

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
            {/* Table model */}
            <Modal
                centered
                open={tableModelOpen}
                onOk={() => setTableModelOpen(false)}
                onCancel={() => setTableModelOpen(false)}
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
                                Employee Type
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
                                        >
                                            <Input
                                                placeholder="Please enter item"
                                                ref={inputRef}
                                                value={name}
                                                onChange={onNameChange}
                                                onKeyDown={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={addItem}
                                            >
                                                Add item
                                            </Button>
                                        </Space>
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
                            Suspend Employee
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
                            Activate Employee
                        </button>
                    )}
                </div>
                <div className="add_emp_popup_footer_container center">
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

            <ConfigProvider
                theme={{
                    components: {
                        Modal: {},
                    },
                }}
            >
                <div className="admin_employee_list_hero_container">
                    <div className="admin_employee_list_cards">
                        <div className="admin_emp_details_card card1">
                            <h1>Total Employees</h1>
                            <h2>{employeeList.length}</h2>
                        </div>
                        <div className="admin_emp_details_card card2">
                            <h1>Pending Leaves</h1>
                            <h2>{pendingLeaves.length}</h2>
                        </div>
                    </div>
                    <div className="admin_emp_pending_leave_container">
                        <div className="admin_emp_pending_leave_inner_container">
                            <div style={{ height: "244px" }}>
                                <h5>Pending Leave Requests</h5>
                                {!isLeavesLoading ? (
                                    <div className="admin_emp_pending_leave_list_itm">
                                        {pendingLeaves.length > 0 ? (
                                            pendingLeaves
                                                .slice(0, 4)
                                                .map((item) => (
                                                    <div className="admin_dashboard_pending_lave_rows">
                                                        <h4>{item.name}</h4>
                                                        <h6>
                                                            {formatDareful(
                                                                item.createdAt
                                                            )}
                                                        </h6>
                                                        <Tag color="orange">
                                                            Pending
                                                        </Tag>
                                                    </div>
                                                ))
                                        ) : (
                                            <div
                                                className="center"
                                                style={{ marginTop: "100px" }}
                                            >
                                                <h6
                                                    style={{ color: "#8d93a5" }}
                                                >
                                                    No Pending Leave Requests
                                                </h6>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="center"
                                        style={{ marginTop: "90px" }}
                                    >
                                        <h6 style={{ color: "#8d93a5" }}>
                                            Loading...
                                        </h6>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: "100%" }} className="center">
                                <Link to="/admin/leaverequests">
                                    <p>See All Requests</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="admin_emp_upcoming_event_container">
                        <h5>Upcoming Events</h5>
                        {!isEventsLoading ? (
                            <div className="admin_emp_upcoming_event_items">
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <div className="admin_emp_upcoming_event_item">
                                            <h4>
                                                {event.eventType}
                                                {" - "}
                                                {event.packageType}
                                            </h4>
                                            <h6>{event.eventDate}</h6>
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="center"
                                        style={{ marginTop: "100px" }}
                                    >
                                        <h6 style={{ color: "#8d93a5" }}>
                                            No Upcoming Events
                                        </h6>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className="center"
                                style={{ marginTop: "90px" }}
                            >
                                <h6 style={{ color: "#8d93a5" }}>Loading...</h6>
                            </div>
                        )}
                    </div>
                </div>
                <div className="admin_emp_list_container">
                    <div className="admin_emp_list_top_menu">
                        <div
                            style={{
                                marginRight: "auto",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <h5>All Employees</h5>
                            <Search
                                placeholder="Search "
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
                                <Radio.Button value="Active">
                                    Active
                                </Radio.Button>
                                <Radio.Button value="Suspended">
                                    Suspended
                                </Radio.Button>
                            </Radio.Group>
                            <button
                                className="admin_emp_list_top_menu_button"
                                onClick={() => setAddEmployeeModelOpen(true)}
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
                        open={addEmployeeModelOpen}
                        onOk={() => setAddEmployeeModelOpen(false)}
                        onCancel={() => setAddEmployeeModelOpen(false)}
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
                                        Employee Type
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
                                        value={type}
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
                                                >
                                                    <Input
                                                        placeholder="Please enter item"
                                                        ref={inputRef}
                                                        value={name}
                                                        onChange={onNameChange}
                                                        onKeyDown={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={addItem}
                                                    >
                                                        Add item
                                                    </Button>
                                                </Space>
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
                                            value={firstName}
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
                                            value={email}
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
                                            value={phoneNumber}
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
                                            value={lastName}
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
                                            value={username}
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
                                            defaultValue={moment(dob)}
                                            onChange={(date, dateString) => {
                                                setDob(dateString);
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="add_emp_popup_footer_container center">
                            <Button
                                onClick={() => setAddEmployeeModelOpen(false)}
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
                                onClick={saveEmployee}
                                style={{
                                    width: "120px",
                                    height: "40px",
                                }}
                            >
                                Add Employee
                            </button>
                        </div>
                    </Modal>

                    <div style={{ width: "100%" }}>
                        <div style={{ minHeight: "192px" }}>
                            {!isEmployeeLoading ? (
                                <Table
                                    columns={columns}
                                    dataSource={filteredEmployeeList}
                                    pagination={filteredEmployeeList.length > 10 ? pagination : false}
                                    onChange={handleTableChange}
                                />
                            ) : (
                                <div className="center" style={{height : "192px"}}>
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
}

export default EmployeeList;
