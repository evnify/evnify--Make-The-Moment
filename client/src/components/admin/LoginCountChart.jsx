import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function LoginCountChart() {
    const [loginCountData, setLoginCountData] = useState([]);
    const chartRef = useRef(null);

    const fetchLoginCountData = async () => {
        try {
            const response = await axios.post("/api/users/login-data");
            const data = response.data;
    
            // Generate an array of the last 30 days
            const last30Days = generateLast30Days();
    
            // Create an array of view count data for the last 30 days
            const last30DaysData = last30Days.map((day) => {
                const entry = data.find((item) => item._id === day);
                return { date: day, count: entry ? entry.count : 0 };
            });
    
            setLoginCountData(last30DaysData);
            createChart(last30Days, last30DaysData);
        } catch (error) {
            console.error("Error fetching login data:", error);
        }
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
        const ctx = document.getElementById("LoginCountChart");
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
                        backgroundColor: "#533C56",
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
        fetchLoginCountData();
    }, []);

    return (
        <div className="daily-login-count-chart-container">
            <canvas id="LoginCountChart"></canvas>
        </div>
    );
}

export default LoginCountChart;
