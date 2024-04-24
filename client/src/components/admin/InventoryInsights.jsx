import { Column } from "@ant-design/plots";
import React from "react";
import ReactDOM from "react-dom";
import { PrinterOutlined } from "@ant-design/icons";

function InventoryInsights() {
    const data = [
        { type: "1-3秒", value: 0.16 },
        { type: "4-10秒", value: 0.125 },
        { type: "11-30秒", value: 0.24 },
        { type: "31-60秒", value: 0.19 },
        { type: "1-3分", value: 0.22 },
        { type: "3-10分", value: 0.05 },
        { type: "10-30分", value: 0.01 },
        { type: "30+分", value: 0.015 },
        { type: "未知", value: 0.005},
        { type: "4-10秒", value: 0.125 },
        { type: "11-30秒", value: 0.24 },
        { type: "31-60秒", value: 0.19 },
        { type: "1-3分", value: 0.22 },
        { type: "3-10分", value: 0.05 },
        { type: "10-30分", value: 0.01 },
        { type: "30+分", value: 0.015 },
        { type: "未知", value: 0.005},
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
            offset: 10,
        },
        legend: false,
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
                        // onClick={() => showDeclineConfirm(record.leaveID)}
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
                <div className="inventroy-catagory"></div>
                <div className="inventories"></div>
            </div>
        </div>
    );
}

export default InventoryInsights;
