import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Avatar } from "antd";
import axios from "axios";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "",
        dataIndex: "avatar",
        key: "avatar",
        render: (_, record) => (
            <Avatar size={35} src={record.avatarSrc} alt="avatar" />
        ),
    },

    {
        title: "UserName",
        dataIndex: "firstName",
        key: "username",
        render: (text) => <a>{text}</a>,
    },

    {
        title: "Phone Number",
        dataIndex: "phonenumber",
        key: "phonenumber",
    },
    {
        title: "Email Address",
        dataIndex: "emailaddress",
        key: "emailaddress",
    },

    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Status",
        key: "status",
        dataIndex: "status",
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

    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await axios.get("api/users/getUser");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchUserList();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
        </div>
    );
}

export default UserListTable;
