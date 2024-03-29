import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: "1",
        label: "Users",
        children: "Content of Tab Pane 1",
    },
    {
        key: "2",
        label: "Add User",
        children: "Content of Tab Pane 2",
    },
    
];

function AdminUsers() {
    return (
        <div>
            <h2>Users</h2>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            
        </div>
    );
}

export default AdminUsers;
