import React, { useEffect, useState } from "react";
import { Table, Modal, Tag, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

import axios from "axios";

const { confirm } = Modal;

function Booking() {
    const [bookingList, setBookingList] = useState([]);
    const [viewCounts, setViewCounts] = useState([]);
    const [bookings, setBookings] = useState([]);

    const handleDeleteConfirmation = (id) => {
        confirm({
            title: "Are you sure you want to delete this booking?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleDeleteBooking(id);
            },
            onCancel() {
                console.log("Delete operation cancelled");
            },
        });
    };

    const bookingPackages = bookings.map((booking) => booking.status);
    const packageCounts = bookingPackages.reduce((counts, status) => {
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});
    

    const pieChartData = {
        labels: Object.keys(packageCounts),
        datasets: [
            {
                label: "Packages",
                data: Object.values(packageCounts),
                backgroundColor: [
                    "rgb(50, 149, 131, 0.9)",
                    "rgb(255, 77, 79, 0.9)",
                    "rgba(255, 206, 86, 0.9)",
                    "rgba(75, 192, 192, 0.9)",
                    "rgba(153, 102, 255, 0.9)",
                    "rgba(255, 159, 64, 0.9)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`/api/bookings/deleteBooking/${id}`);
            fetchBookings();
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/bookings/getAllBookings`);
            setBookingList(response.data);
            setBookings(response.data);
        } catch (error) {
            console.log("Error fetching bookings:", error);
        }
    };

    const handlePaidBooking = async (record) => {
        try {
            await axios.get(`/api/bookings/updateBookingStatus/${record._id}`);
            fetchBookings();
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const showPaidConform = (record) => {
        confirm({
            title: "Are you sure you want to mark this booking as conform?",
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            onOk() {
                handlePaidBooking(record);
            },
            onCancel() {
                console.log("Paid operation cancelled");
            },
        });
    };

    useEffect(() => {
        fetchBookings();
        fetchPkgViewCountData();
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: "Customer ID",
            dataIndex: "customerID",
            key: "customerID",
        },
        {
            title: "Transaction ID",
            dataIndex: "transactionID",
            key: "transactionID",
        },
        {
            title: "Package Type",
            dataIndex: "packageType",
            key: "packageType",
        },
        {
            title: "Event Type",
            dataIndex: "eventType",
            key: "eventType",
        },

        {
            title: "Event Date",
            dataIndex: "eventDate",
            key: "eventDate",
            render: (eventDate) => {
                const date = new Date(eventDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            },
        },
        {
            title: "Booking Status",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                let color = "green";
                if (status === "Cancelled") {
                    color = "red";
                } else if (status === "Pending") {
                    color = "orange";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Amount Paid",
            dataIndex: "amount",
            key: "amountPaid",
            render: (amount) => {
                return `${amount} LKR`;
            },
        },
        {
            title: "Booked Date",
            dataIndex: "createdAt",
            key: "bookedDate",
            render: (createdAt) => {
                const date = new Date(createdAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            },
        },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "Pending" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => showPaidConform(record)}
                            >
                                <Icon icon="icon-park-outline:correct" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() =>
                                    handleDeleteConfirmation(record._id)
                                }
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                disabled
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="icon-park-outline:correct" />
                            </button>
                            <button
                                disabled
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const fetchPkgViewCountData = async () => {
        try {
            const response = await axios.get("/api/pkgViewCounts/getAllCounts");
            setViewCounts(response.data);
            console.log("All View Counts:", response.data);
            const last30DaysViewCounts = response.data.slice(-7); // Get the last 30 days' data
            const labels = last30DaysViewCounts.map((data) => data.date);
            const data = last30DaysViewCounts.map((data) => data.count);
            createChart(labels, data);
        } catch (error) {
            console.log(error);
        }
    };

    const createChart = (labels, data) => {
        const ctx = document.getElementById("lineChart");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "View Counts",
                        data: data,
                        borderColor: "#5b8ff9",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "transparent",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Date",
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "View Count",
                        },
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="booking_dashboard_chart_container">
                <div className="booking_dashboard_doughnut_container">
                    <h4>Packages</h4>
                    <p>Daily Purchases in past 07 days</p>
                    <div className="booking_dashboard_doughnut">
                        <Doughnut data={pieChartData} options={options} />
                        <div>
                            {pieChartData.labels.map((label, index) => (
                                <div key={index} className="legend-item">
                                    <div
                                        className="legend-color"
                                        style={{
                                            backgroundColor:
                                                pieChartData.datasets[0]
                                                    .backgroundColor[index],
                                            margin: "4px",
                                        }}
                                    ></div>
                                    <div className="legend-label">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="booking_dashboard_line_container">
                    <h4>Packages</h4>
                    <p>Daily Purchases in past 07 days</p>
                    <canvas id="lineChart" height={300}></canvas>
                </div>
            </div>
            <div className="admin_booking_container">
                <div className="admin_leave_request_top_menu">
                    <h5>All Leaves</h5>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={bookingList}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
