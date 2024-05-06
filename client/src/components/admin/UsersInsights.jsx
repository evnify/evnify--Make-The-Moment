import React, { useState, useEffect, useRef } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2"; // Added Bar import
import { Chart } from "chart.js/auto";
import LoginCountChart from "./LoginCountChart";
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
    const [loginData, setLoginData] = useState([]);
    const [loginType, setLoginType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/users/login-data");
                setLoginData(response.data);
            } catch (error) {
                console.error("Error fetching login data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchLoginTypeData = async () => {
            try {
                const response = await axios.post("/api/users/login-type");
                setLoginType(response.data);
            } catch (error) {
                console.error("Error fetching login type data:", error);
            }
        };

        fetchLoginTypeData();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get("/api/users/getUser");

            // Sort inventories by date in descending order
            const sortedData = response.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setData(sortedData);
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
        labels: loginType.map((entry) => entry._id),
        datasets: [
            {
                data: loginType.map((entry) => entry.count),
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    return (
        <>
            <div className="UsersInsights">
                <UserTab />
            </div>
            <div className="chart_container">
                <div className="admin_user_chart1">
                    <div className="chart_title">
                        <h3>Daily Login's</h3>
                        <p>Users Insights</p>
                    </div>
                    <div className="bar_chart">
                        <LoginCountChart />
                    </div>
                </div>

                <div className="admin_user_chart2">
                    <div className="chart_title">
                        <h3>Users Insights</h3>
                        <p>Users Insights</p>
                    </div>
                    <div className="chart-container">
                        <Doughnut data={chartData} options={options} />
                        <div className="chart-legend">
                            {chartData.labels.map((label, index) => (
                                <div key={index} className="legend-item">
                                    <div
                                        className="legend-color"
                                        style={{
                                            backgroundColor:
                                                chartData.datasets[0]
                                                    .backgroundColor[index],
                                        }}
                                    ></div>
                                    <div className="legend-label">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                dataSource={data && data.slice(0, 10)}
                                columns={columns}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersInsights;
