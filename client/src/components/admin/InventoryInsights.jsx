import React, { useState, useEffect, useRef } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import axios from "axios";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

function InventoryInsights() {
    const navigate = useNavigate();
    const doughnutChartRef = useRef(null);
    const columnChartRef = useRef(null);

    const [inventories, setInventories] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const inventoryResponse = await axios.get("/api/inventories/getInventories");
            setInventories(inventoryResponse.data);

            const bookingResponse = await axios.get("/api/bookings/getAllBookings");
            setBookings(bookingResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoryData = () => {
        const categoryMap = new Map();
        inventories.forEach((item) => {
            const { category, quantity } = item;
            if (categoryMap.has(category)) {
                categoryMap.set(category, categoryMap.get(category) + quantity);
            } else {
                categoryMap.set(category, quantity);
            }
        });

        return Array.from(categoryMap.entries()).map(
            ([category, quantity]) => ({
                category,
                quantity,
            })
        );
    };

    
    const getMostBookedInventories = () => {
        const categoriesMap = new Map();
        bookings.forEach((booking) => {
            booking.AssignedInventory.forEach((item) => {
                if (categoriesMap.has(item.category)) {
                    categoriesMap.set(item.category, categoriesMap.get(item.category) + item.addedQty); // Change here to use addedQty
                } else {
                    categoriesMap.set(item.category, item.addedQty); // Change here to use addedQty
                }
            });
        });
    
        // Sort the categories by total addedQty in descending order
        const sortedCategories = Array.from(categoriesMap.entries()).sort(
            (a, b) => b[1] - a[1]
        );
    
        // Return the top six categories
        return sortedCategories.slice(0, 6).map(([category, addedQty]) => ({
            category,
            addedQty
        }));
    };
    
    
    


    const getAllCategories = () => {
        const categories = {};
        bookings.forEach((booking) => {
            booking.AssignedInventory.forEach((item) => {
                if (categories[item.category]) {
                    categories[item.category] += item.quantity;
                } else {
                    categories[item.category] = item.quantity;
                }
            });
        });
    
        return Object.keys(categories);
    };
    

    
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const data = getCategoryData();
        setCategoryData(data);
    }, [inventories]);

    useEffect (() => {
        const data = getCategoryData();
        setCategoryData(data);
    }, [bookings]);


    
    const exportToPdf = () => {
        const pdf = new jsPDF();
        const canvas = document.getElementById("column-chart2");
        const dataURL = canvas.toDataURL();
        pdf.addImage(dataURL, "PNG", 10, 10, 200, 75);
        pdf.save("inventory_chart.pdf");
    };

    const exportToPdf2 = () => {
        const pdf = new jsPDF();
        const canvas = document.getElementById("doughnut-chart2");
    
        // Get the dimensions of the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
    
        // Set the dimensions and position for the image in the PDF
        const pdfWidth = 100; // Width of the image in the PDF
        const pdfHeight = (canvasHeight / canvasWidth) * pdfWidth; // Maintain aspect ratio
        const xPos = 10; // X position of the image in the PDF
        const yPos = 10; // Y position of the image in the PDF
    
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL();
    
        // Add the image to the PDF
        pdf.addImage(dataURL, "PNG", xPos, yPos, pdfWidth, pdfHeight);
    
        // Save the PDF
        pdf.save("inventory_chart.pdf");
    };
    
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
            key: "status",
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    useEffect(() => {
        if (doughnutChartRef.current) {
            doughnutChartRef.current.destroy();
        }
        const ctx = document.getElementById("doughnut-chart2");
        if (ctx) {
            const newChartInstance = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: getMostBookedInventories().map(item => item.category),
                    datasets: [
                        {
                            label: "Items Qty",
                            data: getMostBookedInventories().map(item => item.addedQty),
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                                "rgb(255, 205, 86)",
                                // Add more colors if needed
                            ],
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            position: "right",
                            align: "top",
                        },
                    },
                },
            });
            doughnutChartRef.current = newChartInstance;
        }
    }, [bookings]);
    
    
    

    useEffect(() => {
        if (columnChartRef.current) {
            columnChartRef.current.destroy();
        }
        const ctx = document.getElementById("column-chart2");
        if (ctx) {
            const newChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: categoryData.map((data) => data.category),
                    datasets: [
                        {
                            label: "Quantity",
                            data: categoryData.map((data) => data.quantity),
                            backgroundColor: "rgb(54, 162, 235)",
                            borderWidth: 1,
                            barThickness: 40,
                        },
                    ],
                },
                width: 500,
                options: {
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
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
            columnChartRef.current = newChartInstance;
        }
    }, [categoryData]);

    return (
        <>
            <div className="top">
                <div className="inventory-insight-top">
                    <div className="inventory-insight-card">
                        <div className="inventory_left">
                            <h3>Inventory</h3>
                            <p className="p_text">
                                Inventory Distribution in Last 30 Days
                            </p>
                        </div>
                        <button
                            style={{
                                fontSize: "14px",
                                border: "none",
                                backgroundColor: "#4094F7",
                                width: "100px",
                                height: "35px",
                                color: "#fff",
                                borderRadius: "5px",
                                marginTop: "20px"
                            }}
                            onClick={exportToPdf}
                        >
                            <PrinterOutlined style={{ gap: "10" }} />
                            Export
                        </button>
                    </div>
                    <div className="chart_inventory2">
                        <canvas className="canvas" id="column-chart2"></canvas>
                    </div>
                </div>
                <div className="inventroy-catagory">
                <div className="inventory-insight-card">
                    <div className="inventory_left">
                        <h3>Item Categories</h3>
                        <p className="p_text">
                            Mostly Used Categories in Month
                        </p>
                    </div>
                    <button
                            style={{
                                fontSize: "14px",
                                border: "none",
                                backgroundColor: "#4094F7",
                                width: "100px",
                                height: "35px",
                                color: "#fff",
                                borderRadius: "5px",
                                marginTop: "20px"
                            }}
                            onClick={exportToPdf2}
                        >
                            <PrinterOutlined style={{ gap: "10" }} />
                            Export
                        </button>
                    </div>
                    <div className="chart_inventory">
                        <canvas id="doughnut-chart2"></canvas>
                    </div>
                </div>
            </div>
            <div className="inventory-insight-bottom">
                <div className="inventories">
                    <div className="inventroy-catagory-item">
                        <div className="Invertory-btn">
                            <div className="inventory_left">
                                <h3>Item Categories</h3>
                                <p className="p_text">
                                    Mostly Used Categories in Month
                                </p>
                            </div>
                            <button
                            className="view_all"
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#4094F7",
                                    width: "100px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    marginTop: "20px"
                                }}
                                onClick={() => {
                                    navigate("/admin/inventorylist");
                                }}
                            >
                                View All
                            </button>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={inventories.slice(0, 5)} // Limit to 5 rows
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryInsights;
