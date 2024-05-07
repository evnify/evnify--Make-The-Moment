import React, { useEffect, useState } from "react";
import ViewCountChart from "./ViewCountChart";
import axios from "axios";
import { Table, Tag } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

function MainDashboard() {
    const [inventories, setInventories] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
    const [totalInventory, setTotalInventory] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/bookings/getAllBookings`);
            setBookings(response.data);
        } catch (error) {
            console.log("Error fetching bookings:", error);
        }
    };

    async function fetchUserList() {
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/users/getUser`
        );
        setUserCount(response.data.length);
    }

    const bookingPackages = bookings.map((booking) => booking.eventType);
    const packageCounts = bookingPackages.reduce((counts, eventType) => {
        counts[eventType] = (counts[eventType] || 0) + 1;
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

    const fetchUpcomingEvents = async () => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/bookings/getAllBookings`
        );
        setUpcomingEventsCount(response.data.length);
        let total = 0;
        response.data.map((event) => {
            total += event.amount;
        });
        setTotalRevenue(total);
        const temp = response.data.filter((event) => {
            return event.eventDate > formattedToday;
        });
        setUpcomingEvents(temp);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.PUBLIC_URL}/api/inventories/getInventories`
            );
            const data = response.data;
            setTotalInventory(data.length);
            data.sort((a, b) => {
                return a.quantity - b.quantity;
            });
            const filteredData = data.filter((inventory) => {
                return inventory.quantity === 0 || inventory.quantity < 10;
            });
            setInventories(filteredData.slice(0, 8));
            console.log(data);
            data.map((inventory) => {
                console.log(inventory.quantity);
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUserList();
        fetchUpcomingEvents();
        fetchBookings();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    const columns = [
        {
            title: "ITEM",
            dataIndex: "itemName",
            key: "itemName",
        },
        {
            title: "Last Updated",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => <a>{formatDate(text)}</a>,
        },
        {
            title: "AMOUNT",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "STATUS",
            key: "quantity",
            dataIndex: "quantity",
            render: (quantity) => {
                let color = "green";
                let txt = "In Stock";
                if (quantity === 0) {
                    color = "red";
                    txt = "Out of Stock";
                } else if (quantity < 10) {
                    color = "orange";
                    txt = "Low Stock";
                }
                return <Tag color={color}>{txt}</Tag>;
            },
        },
    ];

    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDaytime, setIsDaytime] = useState(true);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        setIsDaytime(currentHour >= 6 && currentHour < 18);
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="admin_dashboard_main_section">
            <div className="admin_dashboard_card_main_section">
                <div className="admin_dashboard_card card1">
                    <h1>Upcoming Events</h1>
                    <h2>{upcomingEventsCount}</h2>
                    <Link
                        to="/admin/bookings"
                        style={{ textDecoration: "none" }}
                    >
                        <h3>see more</h3>
                    </Link>
                </div>
                <div className="admin_dashboard_card card2">
                    <h1>Total Revenue</h1>
                    <h2 style={{ fontSize: "32px" }}>
                        {totalRevenue}{" "}
                        <span style={{ fontSize: "14px" }}>LKR</span>
                    </h2>
                    <Link
                        to="/admin/bookings"
                        style={{ textDecoration: "none" }}
                    >
                        <h3>see more</h3>
                    </Link>
                </div>
                <div className="admin_dashboard_card card3">
                    <h1>Inventory Count</h1>
                    <h2>{totalInventory}</h2>
                    <Link
                        to="/admin/inventorylist"
                        style={{ textDecoration: "none" }}
                    >
                        <h3>see more</h3>
                    </Link>
                </div>
                <div className="admin_dashboard_card card4">
                    <h1>Total Users</h1>
                    <h2>{userCount}</h2>
                    <Link
                        to="/admin/bookings"
                        style={{ textDecoration: "none" }}
                    >
                        <h3>see more</h3>
                    </Link>
                </div>
                <div className="main_dashboard_realtime_insights_container center">
                    {isDaytime ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 69 69"
                            fill="none"
                        >
                            <path
                                d="M34.5 53.3182C29.5091 53.3182 24.7226 51.3356 21.1935 47.8065C17.6644 44.2774 15.6818 39.4909 15.6818 34.5C15.6818 29.5091 17.6644 24.7226 21.1935 21.1935C24.7226 17.6644 29.5091 15.6818 34.5 15.6818C39.4909 15.6818 44.2774 17.6644 47.8065 21.1935C51.3356 24.7226 53.3182 29.5091 53.3182 34.5C53.3182 39.4909 51.3356 44.2774 47.8065 47.8065C44.2774 51.3356 39.4909 53.3182 34.5 53.3182ZM34.5 47.0455C37.8273 47.0455 41.0182 45.7237 43.371 43.371C45.7237 41.0182 47.0455 37.8273 47.0455 34.5C47.0455 31.1727 45.7237 27.9818 43.371 25.629C41.0182 23.2763 37.8273 21.9545 34.5 21.9545C31.1727 21.9545 27.9818 23.2763 25.629 25.629C23.2763 27.9818 21.9545 31.1727 21.9545 34.5C21.9545 37.8273 23.2763 41.0182 25.629 43.371C27.9818 45.7237 31.1727 47.0455 34.5 47.0455ZM31.3636 0H37.6364V9.40909H31.3636V0ZM31.3636 59.5909H37.6364V69H31.3636V59.5909ZM7.88796 12.3228L12.3228 7.88796L18.975 14.5402L14.5402 18.975L7.88796 12.3228ZM50.025 54.4598L54.4598 50.025L61.112 56.6772L56.6772 61.112L50.025 54.4598ZM56.6772 7.88482L61.112 12.3228L54.4598 18.975L50.025 14.5402L56.6772 7.88796V7.88482ZM14.5402 50.025L18.975 54.4598L12.3228 61.112L7.88796 56.6772L14.5402 50.025ZM69 31.3636V37.6364H59.5909V31.3636H69ZM9.40909 31.3636V37.6364H0V31.3636H9.40909Z"
                                fill="#FFD600"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18 2.75C17.5858 2.75 17.25 2.41421 17.25 2C17.25 1.58579 17.5858 1.25 18 1.25H22C22.3034 1.25 22.5768 1.43273 22.6929 1.71299C22.809 1.99324 22.7449 2.31583 22.5304 2.53033L19.8107 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H18C17.6967 6.75 17.4232 6.56727 17.3071 6.28701C17.191 6.00676 17.2552 5.68417 17.4697 5.46967L20.1894 2.75H18ZM13.5 8.75C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.5C16.8034 7.25 17.0768 7.43273 17.1929 7.71299C17.309 7.99324 17.2449 8.31583 17.0304 8.53033L15.3107 10.25H16.5C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75H13.5C13.1967 11.75 12.9232 11.5673 12.8071 11.287C12.691 11.0068 12.7552 10.6842 12.9697 10.4697L14.6894 8.75H13.5Z"
                                fill="#1C274C"
                            />
                            <path
                                opacity="0.5"
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="#1C274C"
                            />
                        </svg>
                    )}

                    <div className="main_dashboard_date_container">
                        <h1>{formattedTime}</h1>
                        <h2>Realtime Insight</h2>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="admin_dashboard_chart_main_section">
                    <ViewCountChart />
                </div>
                <div className="admin_dashboard_chart_packages_section">
                    <h4>Packages</h4>
                    <p>Daily Purchases in past 07 days</p>
                    <div className="main_dashboard_doughnut">
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
            </div>
            <div style={{ display: "flex" }}>
                <div className="main_dashboard_inventory_section">
                    <div className="main_dashboard_inventory_title">
                        <div>
                            <h1>Inventories</h1>
                            <h2>List of out of stock and low stock items</h2>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    navigate("/admin/inventorylist");
                                }}
                            >
                                View All
                            </button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={inventories}
                        pagination={false}
                    />
                </div>
                <div className="main_dashboard_upcoming_event_section">
                    <h1>Upcoming Events</h1>
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                            <div className="main_dashboard_upcoming_event_card">
                                <div>
                                    <h2>
                                        {event.eventType}
                                        {" - "}
                                        {event.packageType}
                                    </h2>
                                    <h3>{event.eventDate}</h3>
                                </div>
                                <h4>{event.amount} LKR</h4>
                            </div>
                        ))
                    ) : (
                        <div className="center" style={{ marginTop: "100px" }}>
                            <h6 style={{ color: "#8d93a5" }}>
                                No Upcoming Events
                            </h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;
