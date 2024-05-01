import { Column } from "@ant-design/plots";
import React from "react";
import ReactDOM from "react-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";
import jsPDF from "jspdf";

function InventoryInsights() {
    const data = [
        { type: "1", value: 0.16 },
        { type: "2", value: 0.125 },
        { type: "3", value: 0.24 },
        { type: "4", value: 0.19 },
        { type: "5", value: 0.22 },
        { type: "6", value: 0.05 },
        { type: "7", value: 0.01 },
        { type: "8", value: 0.015 },
        { type: "9", value: 0.005 },
        { type: "10", value: 0.125 },
        { type: "11", value: 0.125 },
    ];

    const config = {
        data,
        xField: "type",
        yField: "value",
        style: {
            fill: ({ type }) => {
                if (type === "10-30分" || type === "30+分") {
                    return "#22CBCC";
                }
                return "#2989FF";
            },
        },
        label: {
            text: (originData) => {
                const val = parseFloat(originData.value);
                if (val < 0.05) {
                    return (val * 100).toFixed(1) + "%";
                }
                return "";
            },
            offset: 15,
        },
        legend: false,
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
