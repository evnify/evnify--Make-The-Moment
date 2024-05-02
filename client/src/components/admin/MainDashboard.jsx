import React, { useEffect, useState } from "react";
import ViewCountChart from "./ViewCountChart";
import axios from "axios";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
    const [inventories, setInventories] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const [isEventsLoading, setIsEventsLoading] = useState(false);

    const fetchUpcomingEvents = async () => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/bookings/getAllBookings`
        );

        const temp = response.data.filter((event) => {
            return event.eventDate > formattedToday;
        });
        setUpcomingEvents(temp);
        setIsEventsLoading(false);
    };

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.PUBLIC_URL}/api/inventories/getInventories`
            );
            const data = response.data;
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

    return (
        <div className="admin_dashboard_main_section">
            <div className="admin_dashboard_card_main_section">
                <div className="admin_dashboard_card card1">
                    <h1>Upcoming Events</h1>
                    <h2>10</h2>
                    <h3>4+ than last week</h3>
                </div>
                <div className="admin_dashboard_card card2">
                    <h1>Total Revenue</h1>
                    <h2 style={{ fontSize: "32px" }}>54000 LKR</h2>
                </div>
                <div className="admin_dashboard_card card3">
                    <h1>Upcoming Events</h1>
                    <h2>10</h2>
                    <h3>4+ than last week</h3>
                </div>
                <div className="admin_dashboard_card card4">
                    <h1>Total Revenue</h1>
                    <h2 style={{ fontSize: "32px" }}>54000 LKR</h2>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="admin_dashboard_chart_main_section">
                    <ViewCountChart />
                </div>
                <div className="admin_dashboard_chart_packages_section"></div>
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
