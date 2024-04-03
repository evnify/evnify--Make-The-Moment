import React, { useState, useEffect } from "react";
import { Input, Space, Tag, Select, Dropdown } from 'antd';
import { messageDp } from "../../assets";
import { Icon } from '@iconify/react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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


    // Function to delete a message by ID
    const deleteMessage = async (messageId) => {
        try {
            await axios.delete(`/api/messages/${messageId}`);
            // Refetch messages after deletion
            fetchMessages();
            console.log('Message deleted successfully');
        } catch (error) {
            console.log(error);
        }
    };


    return <div>

        <div className="message-Box-all-messages">
            <div className="message-all-users-bar">
                <div className="message-all-users-bar-top">
                    <div className="message-all-users-bar-top-msg-text" style={{ margin: "20px 0 0 40px" }}>
                        <b style={{ fontSize: "28px" }}>Messages</b>

                    </div>
                    <div style={{ margin: "35px 0 0 90px", fontSize: "12px" }}>
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
                                    </div>
                                ))}
                                {sentMessages.map((msg, index) => (
                                    <div className="message-send-admin">
                                        <div style={{ margin: "10px 0 0 10px" }}>
                                            <div
                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <Icon icon="mage:dots" width="16" height="16" />
                                            </div>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                                anchorOrigin={{
                                                    vertical: 'top', // Change the opening side to top
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                PaperProps={{
                                                    style: {
                                                        backgroundColor: 'white', // Change background color
                                                        borderRadius: '8px', // Adjust border radius
                                                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Change box shadow
                                                    },
                                                }}
                                            >
                                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                                            </Menu>
                                        </div>


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
