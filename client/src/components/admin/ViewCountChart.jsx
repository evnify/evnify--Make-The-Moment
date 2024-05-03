import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function ViewCountChart() {
    const [viewCountData, setViewCountData] = useState([]);
    const chartRef = useRef(null);

    const fetchViewCountData = async () => {
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/viewCounts/getAllCounts`
        );
        const data = response.data;

        // Create a map to store data by date
        const dataMap = new Map();
        data.forEach((entry) => {
            dataMap.set(entry.date, entry.count);
        });

        // Generate an array of the last 30 days
        const last30Days = generateLast30Days();

        // Create an array of view count data for the last 30 days
        const last30DaysData = last30Days.map((day) => ({
            date: day,
            count: dataMap.has(day) ? dataMap.get(day) : 0,
        }));

        setViewCountData(last30DaysData);
        console.log(last30DaysData);
        createChart(last30Days, last30DaysData);
    };

    const generateLast30Days = () => {
        const today = new Date();
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date.toISOString().slice(0, 10));
        }
        return days;
    };

    const createChart = (labels, data) => {
        const ctx = document.getElementById("viewCountChart");
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data.map((item) => item.count),
                        backgroundColor: "rgb(119, 97, 229)",
                        borderRadius: 60,
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
    };

    useEffect(() => {
        fetchViewCountData();
    }, []);

    return (
        <div className="daily_view_count_chart_container">
            <h1>Daily Page Views</h1>
            <canvas
                id="viewCountChart"
            ></canvas>
        </div>
    );
}

export default ViewCountChart;
