import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Avatar } from "antd";
import axios from "axios";
import Loader from "./Loader";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";





function UserListTable() {

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
                    <Tag color={color}>{status ? status.toUpperCase() : ""}</Tag>
                );
            },
        },
        {
            title: "Address",
            dataIndex: "address1",
            key: "address1",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (_, user) => {
                if (user.state === "Active") {
                    return (
                        <button
                            className="adelete"
                            onClick={() => handleDelete(user.userID)}
                        >
                            Suspend
                        </button>
                    );
                } else {
                    return (
                        <Icon onClick={() => handleDelete(user.userID)} icon="material-symbols:delete-outline" />
                    );
                }
            },
        },
    ];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUserList() {
            try {
                setLoading(true);
                const response = await axios.get("/api/users/getUser");
                setData(response.data);
                console.log("Data fetched:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUserList();
    }, []);

    async function handleDelete(userID) {
        try {
            const res = await axios.post("/api/users/deleteUser", { userID });
            console.log("Server response: ", res.data);
            if (res.status === 200) {
                console.log("User deleted successfully");
                // You can handle success message here
            }
        } catch (error) {
            console.log("Error deleting user: ", error);
            // You can handle error message here
        }
    }
    

    return (
        <div className="row">
            {loading && <Loader />}
            <div className="col-md-12">
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 15 }}
                    footer={() => (
                        <div className="footer-number">{`Total ${data.length} items`}</div>
                    )}
                />
            </div>
        </div>
    );
}

export default UserListTable;