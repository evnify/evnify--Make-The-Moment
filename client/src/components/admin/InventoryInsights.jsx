import { Column } from "@ant-design/plots";
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";
import jsPDF from "jspdf";
import axios from "axios";

function InventoryInsights() {

    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/inventories/getInventories");
            setInventories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoryData = () => {
        const categoryMap = new Map();
        inventories.forEach(item => {
            const { category, quantity } = item;
            if (categoryMap.has(category)) {
                categoryMap.set(category, categoryMap.get(category) + quantity);
            } else {
                categoryMap.set(category, quantity);
            }
        });
        return Array.from(categoryMap.entries()).map(([category, quantity]) => ({ category, quantity }));
    };

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const data = getCategoryData();
        setCategoryData(data);
    }, [inventories]);

    const config = {
        data: categoryData,
        xField: "category",
        yField: "quantity",
        label: {
            position: "top", // Adjusted position to show labels at the top of each bar
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            quantity: {
                alias: "Quantity",
            },
        },
    };
    

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
                    "rgb(75, 192, 192)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const exportToPdf = () => {
        const pdf = new jsPDF();
        const canvas = document.querySelector(".chart_inventory canvas");
        const dataURL = canvas.toDataURL();
        pdf.addImage(dataURL, "PNG", 10, 10, 200, 75);
        pdf.save("inventory_chart.pdf");
    };

    return (
        <div className="inventory-insight">
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
                        }}
                        onClick={exportToPdf}
                    >
                        <PrinterOutlined style={{ gap: "10" }} />
                        Export pdf
                    </button>
                </div>
                <div className="chart_inventory">
                    <Column {...config} />
                </div>
            </div>

            <div className="inventory-insight-bottom">
                <div className="inventroy-catagory">
                    <div className="inventory_left">
                        <h3>Item Categories</h3>
                        <p className="p_text">
                            Mostly Used Categories in Month
                        </p>
                    </div>
                    <div div className="chart_inventory">
                        <Doughnut data={chartData} />
                    </div>
                </div>
                <div className="inventories"></div>
            </div>
        </div>
    );
}

export default InventoryInsights;
