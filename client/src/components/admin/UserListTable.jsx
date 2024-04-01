import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Avatar } from "antd";
import axios from "axios";
import Loader from "./Loader";

const columns = [
    {
        title: "userID",
        dataIndex: "userID",
        key: "userID",
    },
    {
        title: "",
        dataIndex: "profilePic",
        key: "profilePic",
        render: (_, record) => (
            <Avatar size={35} src={record.avatarSrc} alt="avatar" />
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
        key: "state",
        dataIndex: "state",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = "green";
                    if (tag === "Suspended") {
                        color = "red";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },

    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },

    {
        title: "",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

function UserListTable() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await axios.get(
                    `${process.env.PUBLIC_URL}api/users/getUser`
                );
                setData(response.data);
                console.log("Data fetched:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchUserList();
    }, []);

    return (
        <div className="row">
            {loading && <Loader />}
            <div className="col-md-12">
                <Table
                    bordered={true}
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
