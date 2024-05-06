import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import axios from "axios";
import { Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Calendar } from 'antd';
import moment from 'moment';

function MessageInsights() {

    const [allMessages, setAllMessages] = useState([]);
    const [totalMessage, setTotalMessage] = useState(0);
    const [readMessage, setReadMessage] = useState(0);
    const [unreadMessage, setUnreadMessage] = useState(0);
    const [messageCount, setMessageCount] = useState({});
    const [categoryCount, setCategoryCount] = useState({});
    const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss A'));

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(() => {
            setCurrentTime(moment().format('hh:mm:ss A'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("/api/messages/allMessages");
            const messageArray = response.data;

            setAllMessages(messageArray);
            setTotalMessage(messageArray.length);
            setReadMessage(messageArray.filter(message => message.status === "read").length);
            setUnreadMessage(messageArray.filter(message => message.status === "unread").length);

            // Filter messages for the current week
            const currentDate = new Date();
            const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Start of current week (Sunday)
            const currentWeekEnd = new Date(currentDate.setDate(currentWeekStart.getDate() + 6)); // End of current week (Saturday)
            const filteredMessages = messageArray.filter(message => {
                const messageDate = new Date(message.sendDate);
                return messageDate >= currentWeekStart && messageDate <= currentWeekEnd;
            });

            // Initialize message count for each day of the week
            const messageCountByDay = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0
            };

            // Count messages for each day
            filteredMessages.forEach(message => {
                const messageDate = new Date(message.sendDate);
                const dayOfWeek = messageDate.toLocaleDateString('en-US', { weekday: 'long' });
                messageCountByDay[dayOfWeek] += 1;
            });

            console.log(messageCountByDay); // Output message count for each day
            setMessageCount(messageCountByDay);

            // Count message categories
            const categoryCounts = {};
            messageArray.forEach(message => {
                categoryCounts[message.category] = (categoryCounts[message.category] || 0) + 1;
            });

            setCategoryCount(categoryCounts);
            console.log(categoryCounts); // Output message category count


        } catch (error) {
            console.log(error);
        }
    };

    const lineChartData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Update labels to display the days of the week
        datasets: [
            {
                label: 'Messages In The Week',
                data: [messageCount.Sunday || 0,
                messageCount.Monday || 0,
                messageCount.Tuesday || 0,
                messageCount.Wednesday || 0,
                messageCount.Thursday || 0,
                messageCount.Friday || 0,
                messageCount.Saturday || 0], // Set message count for each day of the week
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ]
    };

    const pieChartData = {
        labels: Object.keys(categoryCount),
        datasets: [
            {
                label: 'Message Categories',
                data: Object.values(categoryCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };


    const options = {
        scales: {
            y: {
                beginAtZero: true // Ensure y-axis starts from 0
            }
        }
    };

    return (
        <div>
            <div className="messagre-insight-top">
                {/* Total Message Card */}
                <div className="messagre-insight-card">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "150px" }}>
                        <div style={{ display: "flex", width: "100px", height: "100px", backgroundColor: "#533c56", borderRadius: "50%", alignItems: "center", justifyContent: "center" }}>
                            <Icon icon="ic:baseline-message" width="48" height="48" style={{ color: "white" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#464255" }}>Total Message</div>
                        <div style={{ fontWeight: "bold", fontSize: "32px", color: "#464255" }}>{totalMessage}</div>
                        <div style={{ fontSize: "14px", color: "#999999" }}>Life time</div>
                    </div>
                </div>

                {/* Read Message Card */}
                <div className="messagre-insight-card">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "150px" }}>
                        <div style={{ display: "flex", width: "100px", height: "100px", backgroundColor: "#533c56", borderRadius: "50%", alignItems: "center", justifyContent: "center" }}>
                            <Icon icon="ic:baseline-message" width="48" height="48" style={{ color: "white" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#464255" }}>Read Message</div>
                        <div style={{ fontWeight: "bold", fontSize: "32px", color: "#464255" }}>{readMessage}</div>
                        <div style={{ fontSize: "14px", color: "#999999" }}>Life time</div>
                    </div>
                </div>

                {/* Unread Message Card */}
                <div className="messagre-insight-card">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "150px" }}>
                        <div style={{ display: "flex", width: "100px", height: "100px", backgroundColor: "#533c56", borderRadius: "50%", alignItems: "center", justifyContent: "center" }}>
                            <Icon icon="ic:baseline-message" width="48" height="48" style={{ color: "white" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#464255" }}>Unread Message</div>
                        <div style={{ fontWeight: "bold", fontSize: "32px", color: "#464255" }}>{unreadMessage}</div>
                        <div style={{ fontSize: "14px", color: "#999999" }}>Life time</div>
                    </div>
                </div>
            </div>

            {/* Line Chart */}
            <div className="message-insight-main-insight">
                <Line data={lineChartData} options={options} width={280} height={100} />
            </div>

            {/* Other Insights */}
            <div className="message-insight-bottom-insight">
                <div className="message-insight-categories">
                    <div style={{fontSize:"22px", fontWeight:"500"}}>
                        Categories
                    </div>
                    <div style={{width:"450px", height:"450px"}}>
                        <Pie data={pieChartData} />
                    </div>
                </div>
                <div className="message-calender-view">
                    <div>
                        <Calendar
                            fullscreen={false} // Set fullscreen to false to control the size
                            fullscreenable={false} // Disable the ability to go fullscreen
                            style={{ width: '380px', height: '370px' }}
                        />
                    </div>
                    <div style={{ display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", border: '2px solid #f0f0f0', padding: '10px', width: '380px', borderRadius:"11px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <div style={{fontWeight:"bold", fontSize:"32px", color:"#7a7a7a"}}>Current Time</div>
                        <div style={{fontWeight:"bold", fontSize:"22px", color:"#7a7a7a"}}>{currentTime}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageInsights;
