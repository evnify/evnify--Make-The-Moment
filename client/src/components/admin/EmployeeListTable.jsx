
import React, { useEffect } from "react";
import { Space, Table, Tag, Avatar } from 'antd';
import axios from "axios";




const columns = [
    {
        title: "",
        dataIndex: "avatar",
        key: "avatar",
        render: (_, record) => (
            <Avatar
                size={35}
                src={record.avatarSrc}
                alt="avatar"
            />
        ),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
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
        avatarSrc:"https://i.ibb.co/CvqgyHS/Screenshot-2024-03-30-165241.png",
        name: "John Brown",
        id: 15454455,
        type: "Photographer",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["Active"],
    },
    {
        key: "2",
        name: "Jim Green",
        id: 26467679,
        type: "Designer",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Active"],
    },
    {
        key: "3",
        name: "Joe Black",
        id: 34647964,
        type: "Developer",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["Suspended"],
    },
];

function EmployeeListTable() {
    useEffect(() => {
        async function fetchEmployeeList() {
            const response = await axios.get("api/employees/getEmployees")
            console.log(response.data)
        }
    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={data} />;
        </div>
    );
}

export default EmployeeListTable;
