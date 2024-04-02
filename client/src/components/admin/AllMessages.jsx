import React, { useState, useEffect } from "react";
import { Input, Space, Tag, Select, Dropdown } from 'antd';
import { messageDp } from "../../assets";
import { DownOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import axios from 'axios';
const { Search } = Input

const items = [
    {
        label: <a>Read</a>,
        key: '0',
    },
    {
        label: <a>Unread</a>,
        key: '1',
    }
];
const items2 = [
    {
        label: <a>Read</a>,
        key: '0',
    },
    {
        label: <a>Unread</a>,
        key: '1',
    }
];

function AllMessages() {

    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages/allMessages');
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Filter sent and received messages
    useEffect(() => {
        setSentMessages(messages.filter(msg => msg.sender === 'admin'));
        setReceivedMessages(messages.filter(msg => msg.sender === 'customer'));
    }, [messages]);


    return <div>
        <div className="message-Box-all-messages">
            <div className="message-all-users-bar">
                <div className="message-all-users-bar-top">
                    <div style={{ margin: "20px 0 0 50px" }}>
                        <Dropdown
                            menu={{
                                items2,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()} style={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}> {/* Change text color here */}
                                <Space>
                                    Messages
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div style={{ margin: "30px 0 0 100px", fontSize: "12px" }}>
                        filter by date
                        <Icon icon="mingcute:filter-line" width="18" height="18" style={{ margin: "0 0 0 5px" }} />
                    </div>
                </div>
                <div className="message-all-users-bar-bottom">
                    <div className="message-all-users-bar-bottom-search">
                        <Search
                            placeholder="input search text"
                            style={{
                                width: 350,
                            }}
                            size="large"
                        />
                        <div>
                            <div className="message-received-preview">
                                <div className="all-message-profile-pic">
                                    <img src={messageDp} alt="DP" />
                                </div>
                                <div className="all-message-name">
                                    <div className="all-message-timeandname" >
                                        <div className="all-message-name-tag"><b>Sasindu Nadeeshan</b></div>
                                        <div style={{ fontSize: "15px", color: "#b3b3b3", padding: "3px 0 0 0" }}>12.00</div>
                                    </div>
                                    <div style={{ fontSize: "15px", color: "#b3b3b3" }}>Nice Product</div>
                                    <div><Tag color="purple">purple</Tag></div>
                                </div>
                            </div>
                            <div className="message-received-preview">
                                <div className="all-message-profile-pic">
                                    <img src={messageDp} alt="DP" />
                                </div>
                                <div className="all-message-name">
                                    <div className="all-message-timeandname" >
                                        <div className="all-message-name-tag"><b>Sasindu Nadeeshan</b></div>
                                        <div style={{ fontSize: "15px", color: "#b3b3b3", padding: "3px 0 0 0" }}>12.00</div>
                                    </div>
                                    <div style={{ fontSize: "15px", color: "#b3b3b3" }}>Nice Product</div>
                                    <div><Tag color="purple">purple</Tag></div>
                                </div>
                            </div>
                            <div className="message-received-preview">
                                <div className="all-message-profile-pic">
                                    <img src={messageDp} alt="DP" />
                                </div>
                                <div className="all-message-name">
                                    <div className="all-message-timeandname" >
                                        <div className="all-message-name-tag"><b>Sasindu Nadeeshan</b></div>
                                        <div style={{ fontSize: "15px", color: "#b3b3b3", padding: "3px 0 0 0" }}>12.00</div>
                                    </div>
                                    <div style={{ fontSize: "15px", color: "#b3b3b3" }}>Nice Product</div>
                                    <div><Tag color="purple">purple</Tag></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className="message-reply-admin">
                    <div className="message-all-users-bar-top-right">
                        <div>
                            <img src={messageDp} alt="dp" style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                margin: "15px 0 0 300px"
                            }} />
                        </div>
                        <div style={{ margin: "25px 0 0 20px" }}>
                            <b
                                style={{
                                    fontSize: "20px",
                                }}>Sasindu Nadeeshan</b>
                        </div>
                    </div>
                    <div>
                        <div className="message-reply-admin-box">
                            <div className="message-reply-admin-box-top">
                            {receivedMessages.map((msg, index) => (
                                <div className="message-receved-admin">
                                    <img src={messageDp} alt="dp" style={{ width: "40px", height: "40px" }} />
                                    <div style={{ background: "#f1f1f1", borderRadius: "11px", margin: "0 0 0 15px", padding: "6px", maxWidth: "400px" }}>
                                        <p> <p>{msg.message}</p></p>
                                    </div>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            ))}
                                {sentMessages.map((msg, index) => (
                                    <div className="message-send-admin">
                                        <div style={{ background: "#7b63ff", borderRadius: "11px", margin: "0 15px 0 0", padding: "6px", maxWidth: "400px", color: "#ffffff" }}>

                                            <p>{msg.message}</p>
                                        </div>
                                        <img src={messageDp} alt="dp" style={{ width: "40px", height: "40px" }} />
                                    </div>
                                ))}
                            </div>
                            <div className="message-Send-bar">
                                <div style={{ margin: "5px 0 0 20px" }}><Icon icon="mingcute:emoji-line" width="24" height="24" /></div>
                                <div style={{ margin: "2px 0 0 20px" }}><Input placeholder="Type Message" variant="borderless" style={{ width: 650 }} /></div>
                                <div style={{ margin: "5px 0 0 20px" }}><Icon icon="majesticons:send" width="24" height="24" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default AllMessages;
