import React, { useState, useEffect } from "react";
import { Input, Space, Tag, Select, Dropdown, Button } from 'antd';
import { messageDp } from "../../assets";
import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { SendOutlined } from '@ant-design/icons';

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
function AllMessages() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [anchorEls, setAnchorEls] = useState({});
    const [open, setOpen] = useState(false);
    const [groupedMessages, setGroupedMessages] = useState({});
    const [selectedUserID, setSelectedUserID] = useState(null); // Add state to track selected user ID

    // Function to handle opening dropdown menu for a specific message
    const handleClick = (event, messageId) => {
        setAnchorEls({ ...anchorEls, [messageId]: event.currentTarget });
    };

    // Function to handle closing dropdown menu for a specific message
    const handleClose = (messageId) => {
        setAnchorEls({ ...anchorEls, [messageId]: null });
    };

    // Function to handle editing a message
    const editMessage = (messageId) => {
        setSelectedMessageId(messageId);
        const selectedMessage = messages.find(msg => msg._id === messageId);
        setMessage(selectedMessage.message);
    };

    //send message or update message based on selectedMessageId
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const customerID = selectedUserID;
            const newMessage = {
                customerID,
                message,
                sendDate: moment().format("YYYY-MM-DD"),
                sendTime: moment().format("HH:mm:ss"),
                category: "Price",
                sender: "admin",
                reciverId:customerID
            };
            if (selectedMessageId) {
                // Update existing message
                await axios.put(`/api/messages/updateMessage/${selectedMessageId}`, newMessage);
            } else {
                // Send new message
                await axios.post('/api/messages/newMessage', newMessage);
            }
            // Clear input field and reset selectedMessageId after sending/editing
            setMessage("");
            setSelectedMessageId(null);
            fetchMessages();
        } catch (error) {
            console.log(error);
        }
    };

    const groupMessages = (messages) => {
        const grouped = {};
        messages.forEach((msg) => {
            if (!grouped[msg.customerID]) {
                grouped[msg.customerID] = [];
            }
            grouped[msg.customerID].push(msg);
        });
        setGroupedMessages(grouped);
    };


    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages/allMessages');
            setMessages(response.data);
            groupMessages(response.data);
            console.log(response.data);
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
            // Send a DELETE request to delete the message with the specified ID
            await axios.delete(`/api/messages/deleteMessage/${messageId}`);

            // Refetch messages after deletion
            fetchMessages();

            console.log('Message deleted successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handlePreviewClick = (userID) => {
        setSelectedUserID(userID); // Set the selected user ID
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
                                {/* Render grouped messages */}
                                {Object.keys(groupedMessages).map((customerID) => (
                                    <div key={customerID} className={`message-received-preview ${selectedUserID === customerID ? 'selected' : ''}`}
                                     onClick={() => handlePreviewClick(customerID)}>
                                        <div className="all-message-profile-pic">
                                            <img src={messageDp} alt="DP" />
                                        </div>
                                        <div className="all-message-name">
                                            <div className="all-message-timeandname">
                                                <div className="all-message-name-tag">
                                                    <b>{customerID}</b>
                                                </div>
                                                <div style={{ fontSize: "15px", color: "#b3b3b3", padding: "3px 0 0 0" }}>
                                                    {groupedMessages[customerID][0].sendTime}
                                                </div>
                                            </div>
                                            <div style={{ fontSize: "15px", color: "#b3b3b3" }}>
                                                {groupedMessages[customerID][0].message}
                                            </div>
                                            <div>
                                                <Tag color="purple">purple</Tag>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                }}>{selectedUserID}</b>
                        </div>
                    </div>
                    <div>
                        <div className="message-reply-admin-box">
                        <div className="message-reply-admin-box-top">
                                    {/* Render received messages for the selected user ID */}
                                    {selectedUserID && receivedMessages.filter(msg => msg.customerID === selectedUserID).map((msg, index) => (
                                        <div className="message-receved-admin">
                                            <img src={messageDp} alt="dp" style={{ width: "40px", height: "40px" }} />
                                            <div style={{ background: "#f1f1f1", borderRadius: "11px", margin: "0 0 0 15px", padding: "6px", maxWidth: "400px" }}>
                                                <p>{msg.message}</p>
                                            </div>
                                        <div style={{ margin: "10px 0 0 10px" }}>
                                            <div
                                                id={`fade-button-${msg._id}`}
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={(e) => handleClick(e, msg._id)} // Pass the message ID here

                                            >
                                                <Icon icon="mage:dots" width="16" height="16" />
                                            </div>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': `fade-button-${msg._id}`,
                                                }}
                                                anchorEl={anchorEls[msg._id]}
                                                open={Boolean(anchorEls[msg._id])}
                                                onClose={() => handleClose(msg._id)}
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
                                                <MenuItem onClick={() => deleteMessage(msg._id)}>Delete</MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                ))}
                                {selectedUserID && sentMessages.filter(msg => msg.customerID === selectedUserID).map((msg, index) => (
                                    <div className="message-send-admin" key={msg._id}>
                                        <div style={{ margin: "10px 0 0 10px" }}>
                                            <div
                                                id={`fade-button-${msg._id}`}
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={(e) => handleClick(e, msg._id)} // Pass the message ID here

                                            >
                                                <Icon icon="mage:dots" width="16" height="16" />
                                            </div>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': `fade-button-${msg._id}`,
                                                }}
                                                anchorEl={anchorEls[msg._id]}
                                                open={Boolean(anchorEls[msg._id])}
                                                onClose={() => handleClose(msg._id)}
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
                                                <MenuItem onClick={() => editMessage(msg._id)} >Edit</MenuItem>
                                                <MenuItem onClick={() => deleteMessage(msg._id)}>Delete</MenuItem>
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
                                {/* Render input field conditionally when a message is selected for editing */}
                                {selectedMessageId && (
                                    <form onSubmit={sendMessage} style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ margin: "0px 10px 2px 20px" }}>
                                            <Icon icon="mingcute:emoji-line" width="24" height="24" />
                                        </div>
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Edit Message"
                                            variant="borderless"
                                            style={{ width: 690 }}
                                        />
                                        <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
                                            <SendOutlined style={{ color: "black", fontSize: "22px" }} />
                                        </button>
                                    </form>
                                )}
                                {!selectedMessageId && (
                                    <React.Fragment>
                                        <form onSubmit={sendMessage} style={{ display: "flex", alignItems: "center" }}>
                                            <div style={{ margin: "0px 10px 2px 20px" }}>
                                                <Icon icon="mingcute:emoji-line" width="24" height="24" />
                                            </div>
                                            <Input
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Type your message here"
                                                variant="borderless"
                                                style={{ width: 690 }}
                                            />
                                            <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
                                                <SendOutlined style={{ color: "black", fontSize: "22px" }} />
                                            </button>
                                        </form>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default AllMessages;
