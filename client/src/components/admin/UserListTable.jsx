import React, { useEffect } from "react";
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
        dataIndex: "username",
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

const data = [
    {
        key: "1",
        avatarSrc: "https://i.ibb.co/CvqgyHS/Screenshot-2024-03-30-165241.png",
        username: "John Brown",
        id: 15454455,
        username: "John Brown",
        emailaddress: "JohnBrown@gmail.com",
        phonenumber: "123-456-7890",
        address: "New York No. 1 Lake Park",
        tags: ["Active"],
        type : "Admin",
    },
    {
        key: "2",
        username: "Jim Green",
        id: 26467679,
        emailaddress: "JohnBrown@gmail.com",
        phonenumber: "123-456-7890",
        address: "London No. 1 Lake Park",
        tags: ["Active"],
        type : "Admin",

    },
    {
        key: "3",
        username: "Joe Black",
        id: 34647964,
        emailaddress: "JohnBrown@gmail.com",
        phonenumber: "123-456-7890",
        address: "Sydney No. 1 Lake Park",
        tags: ["Suspended"],
        type : "Admin",

    },
];

function UserListTable() {
    useEffect(() => {
        async function fetchEmployeeList() {
            const response = await axios.get("api/employees/getEmployees");
            console.log(response.data);
        }
    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={data} scroll={{ x: true }} />
        </div>
    );
}

export default UserListTable;
