// UserListTable.js

import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Avatar } from "antd";
import axios from "axios";
import Loader from "./Loader";
import { Icon } from "@iconify/react";




function UserListTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
            title: "Email address11",
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
                return <Tag color={color}>{status ? status.toUpperCase() : ""}</Tag>;
            },
            
        },
    
        {
            title: "address1",
            dataIndex: "address1",
            key: "address1",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>
                        <Icon icon="material-symbols:delete-outline" />
                    </a>
                    <a>
                        <Icon icon="tabler:edit" />
                    </a>
                    <a>
                        <Icon icon="akar-icons:eye" />
                    </a>
                </Space>
            ),
        },
    ];

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
