import React from "react";
import { Card, Space } from "antd";
import Chart from "chart.js/auto";

const data = {
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

function AdminUsers() {
    const config = {
        type: "doughnut",
        data: data,
    };
    return (
        <div className="horizontal-space">
            <Space direction="horizontal" size={16} margin-left="">
                <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 230,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 230,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>

                <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 230,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>

                <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 230,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>

                <Card
                    size="small"
                    title="Small size card"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 230,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>

            </Space>
            <div className="horizontal-space">
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </div>
        
    );
}

export default AdminUsers;
