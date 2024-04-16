import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import UserTab from "./UserTab";

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
    Table,
    columns,
    Tag,
    Avatar,
} from "antd";

import axios from "axios";
import Loader from "./Loader";

let index = 0;

const { Search, TextArea } = Input;

function UsersInsights() {

    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserList = async () => {
        try {
            const response = await axios.get("/api/users/getUser");
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);



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
    ];

    return (
        <>
            <div className="admin_user_welcome">
                <img className= "admin_profile"src="https://img.icons8.com/ios/452 alter.png" alt="admin" />

                <h1>Welcome Admin</h1>
            </div>
            <div className="UsersInsights">
                <UserTab />
            </div>
            <div className="chart_container">
                <div className="admin_user_chart1"></div>

                <div className="admin_user_chart2"></div>
            </div>

            <div className="admin_user_bar">
                <h3>Recent Users</h3>
                <div className="admin_user_bar1"></div>
                
                <button type="button" class="btn btn-secondary">View All</button>
            </div>
            <div className="admin_user_list">
                <div style={{ width: "100%" }}>
                    <div className="row">
                        {loading && <Loader />}
                        <div className="col-md-12">
                            <Table
                                dataSource={data}
                                columns={columns}
                                pagination={{
                                    pageSize: 7,
                                    
                                }}
                                footer={() => (
                                    <div className="footer-number">{`Total ${data.length} items`}</div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersInsights;
