import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Doughnut, Bar } from "react-chartjs-2"; // Added Bar import


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
import Link from "antd/es/typography/Link";

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

    const chartData = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const labels = ["January", "February", "March", "April", "May", "June", "July"];
    const dataBar = {
        labels: labels,
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40], // Changed dataBar to data
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            {/* <div className="admin_user_welcome">
                <img
                    className="admin_profile"
                    src="https://img.icons8.com/ios/452 alter.png"
                    alt="admin"
                />

                <h3>Welcome Admin</h3>
            </div> */}
            <div className="UsersInsights">
                <UserTab />
            </div>
            <div className="chart_container">
                <div className="admin_user_chart1">
                    <Bar data={dataBar} /> {/* Removed options prop */}
                </div>

                <div className="admin_user_chart2">
                    <Doughnut data={chartData} />
                </div>
            </div>

            <div className="admin_user_bar">
                <h3>Recent Users</h3>
                <div className="admin_user_bar1"></div>
                <Link
                    href="/admin/users"
                    className="admin_user_bar2 "
                    style={{ padding: "10px" }}
                >
                    View All
                </Link>
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
                                    hideOnSinglePage: true,
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
