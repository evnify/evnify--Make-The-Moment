import React, { useState, useEffect } from "react";
import { Input, Space, Tag, Select, Dropdown, Button } from 'antd';
import { messageDp } from "../../assets";
import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { SendOutlined, CaretDownOutlined, BellFilled } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import Loader from "./Loader";

const { Search } = Input


function AllMessages() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [anchorEls, setAnchorEls] = useState({});
    const [open, setOpen] = useState(false);
    const [searchMessages, setFilteredMessages] = useState([]);
    const [groupedMessages, setGroupedMessages] = useState({});
    const [selectedUserID, setSelectedUserID] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChatData, setSelectedChatData] = useState(null);

    //fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/messages/allUsers');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }
        , []);

    useEffect(() => {
        const user = users.find(user => user.userID === selectedUserID);
        setSelectedUser(user);
        console.log(selectedUser)
    }, [selectedUserID, users]);

    const handleClick = (event, messageId) => {
        setAnchorEls({ ...anchorEls, [messageId]: event.currentTarget });
    };

    const handleClose = (messageId) => {
        setAnchorEls({ ...anchorEls, [messageId]: null });
    };

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
            let category = null;

            // If there are messages for the selected user
            if (groupedMessages[customerID] && groupedMessages[customerID].length > 0) {
                // Get the category of the last message sent to this customer
                category = groupedMessages[customerID][groupedMessages[customerID].length - 1].category;
            }

            const newMessage = {
                customerID,
                message,
                sendDate: moment().format("YYYY-MM-DD"),
                sendTime: moment().format("HH:mm:ss"),
                category: category, // Assign the category of the previous message
                sender: "admin",
                status: "read",
                reciverId: customerID
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
            setSelectedChatData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 3000); // Adjust the interval time as needed

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Filter sent and received messages
    useEffect(() => {
        setSentMessages(messages.filter(msg => msg.sender === 'admin'));
        setReceivedMessages(messages.filter(msg => msg.sender === 'customer'));
    }, [messages]);

    // Filter unread messages
    const filterUnreadMessages = () => {
        const unreadMessages = Object.keys(groupedMessages).reduce((accumulator, customerID) => {
            const unreadMsgs = groupedMessages[customerID].filter(msg => msg.status === 'unread');
            if (unreadMsgs.length > 0) {
                accumulator[customerID] = unreadMsgs;
            }
            return accumulator;
        }, {});
        console.log("Unread Messages:", unreadMessages);
        return unreadMessages;
    };
    // Filter read messages
    const filterReadMessages = () => {
        const readMessages = Object.keys(groupedMessages).reduce((accumulator, customerID) => {
            const unreadMsgs = groupedMessages[customerID].some(msg => msg.status === 'unread');
            if (!unreadMsgs) {
                accumulator[customerID] = groupedMessages[customerID];
            }
            return accumulator;
        }, {});
        console.log("Read Messages:", readMessages);
        return readMessages;
    };


    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };


    let filteredMessages;
    switch (selectedFilter) {
        case '0': // Read
            filteredMessages = filterReadMessages();
            break;
        case '1': // Unread
            filteredMessages = filterUnreadMessages();
            break;
        case '2': // All
        default:
            filteredMessages = groupedMessages;
    }



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
        markMessagesAsRead(userID);
    };

    // Function to mark messages as read for the selected user ID
    const markMessagesAsRead = async (userID) => {
        try {
            await axios.put(`/api/messages/markMessagesAsRead/${userID}`);
            // After marking messages as read, fetch messages again to update the UI
            fetchMessages();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (value) => {
        // Convert search input to lowercase
        const searchValue = value.toLowerCase();

        // Filter messages based on search input (case-insensitive)
        const filtered = messages.filter(msg =>
            msg.message.toLowerCase().includes(searchValue)
        );

        // Map the filtered messages to the items array format
        const searchResultItems = filtered.map((msg, index) => ({
            message: msg.message, // Use the message content as the label
            key: index.toString(),
            name: msg.customerID,
            category: msg.category,
            date: msg.sendDate,
            time: msg.sendTime

        }));

        // Set the filtered messages state
        setIsSearching(true);
        setFilteredMessages(searchResultItems);
        console.log(searchMessages)
    };


    // Function to handle returning from search to message-received-preview
    const handleReturnToPreview = () => {
        setFilteredMessages([]);
        setIsSearching(false);
    };

    const generateCSVData = () => {
        const uid = selectedUserID;
        if (!groupedMessages[uid]) return '';

        const headers = ['MessageId','Date', 'Time', 'Sender', 'Message', 'Category'];

        const rows = groupedMessages[uid].map(msg => [
            msg.messageId,
            moment(msg.sendDate).format('YYYY-MM-DD'),
            moment(msg.sendTime, 'HH:mm:ss').format('HH:mm A'),
            msg.sender,
            msg.message,
            msg.category
        ]);

        const csvData = [headers, ...rows];
        const csvContent = csvData.map(row => row.join(',')).join('\n');

        return csvContent;
    };

    // Function to handle downloading CSV file
    const handleDownloadCSV = () => {
        const csvContent = generateCSVData();
        if (csvContent) {
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chat_history.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };


    return <div>

        <div className="message-Box-all-messages">
            <div className="message-all-users-bar">
                <div className="message-all-users-bar-top">
                    <div className="message-all-users-bar-top-msg-text" style={{ margin: "20px 0 0 40px" }}>
                        <b style={{ fontSize: "28px" }}>Messages</b>
                    </div>
                    <div style={{ margin: "35px 0 0 100px", fontSize: "12px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <p style={{ padding: " 0 10px 0 0 ", cursor: "pointer", textDecoration: selectedFilter === "2" ? "underline" : "none" }} onClick={() => handleFilterChange("2")}>All</p>
                        <p style={{ padding: " 0 10px 0 0 ", cursor: "pointer", textDecoration: selectedFilter === "0" ? "underline" : "none" }} onClick={() => handleFilterChange("0")}>Read</p>
                        <p style={{ padding: " 0 10px 0 0 ", cursor: "pointer", textDecoration: selectedFilter === "1" ? "underline" : "none" }} onClick={() => handleFilterChange("1")}>Unread</p>
                    </div>

                </div>
                <div className="message-all-users-bar-bottom">
                    <div className="message-all-users-bar-bottom-search">
                        <Search
                            placeholder="Search messages"
                            style={{
                                width: 350,
                            }}
                            size="large"
                            onSearch={handleSearch}
                        />
                        <div className="message-group-preview">
                            {/* Render search messages if available, otherwise render grouped messages */}
                            {isSearching ? (
                                <>
                                    <Button onClick={handleReturnToPreview} style={{ margin: "0 15px 0 0", width: "350px" }}>Back to Message Preview</Button>
                                    {searchMessages.map((msg, index) => {
                                        const user = users.find(user => user.userID === msg.name);
                                        return (
                                            <div key={index} className="message-received-preview-search" style={{ borderBottom: "1px solid #000000", }}>
                                                <div className="all-message-name">
                                                    <div className="all-message-timeandname">
                                                        <div className="all-message-name-tag" style={{ display: "flex", flexDirection: "row" }}>
                                                            <div style={{ width: "170px" }}><b>{user.firstName} {user.lastName}</b></div>
                                                            <div style={{ fontSize: "12px", width: "80px", marginTop: "5px" }}> <p>{msg.date}</p></div>
                                                            <div style={{ fontSize: "12px", width: "50px", marginTop: "5px" }}><p>{msg.time}</p></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p>{msg.message}</p>
                                                    </div>
                                                    <div style={{ marginBottom: "10px" }}>
                                                        <Tag color="purple">{msg.category}</Tag>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                // Conditional rendering for grouped messages
                                Object.keys(filteredMessages).length ? (
                                    Object.keys(filteredMessages)
                                    .sort((a, b) => {
                                        const latestMsgA = groupedMessages[a][groupedMessages[a].length - 1];
                                        const latestMsgB = groupedMessages[b][groupedMessages[b].length - 1];
                                        const sendDateTimeA = moment(`${latestMsgA.sendDate} ${latestMsgA.sendTime}`, 'YYYY-MM-DD HH:mm:ss');
                                        const sendDateTimeB = moment(`${latestMsgB.sendDate} ${latestMsgB.sendTime}`, 'YYYY-MM-DD HH:mm:ss');

                                        // Compare send date and time
                                        return sendDateTimeB.diff(sendDateTimeA);
                                    })
                                    .map((customerID) => {
                                        const user = users.find(user => user.userID === customerID)
                                        if (!user) {
                                            console.log(`User not found for userID: ${customerID}`);
                                            return null;
                                        }
                                        return (
                                            <div key={customerID} className={`message-received-preview ${selectedUserID === customerID ? 'selected' : ''}`}
                                                onClick={() => handlePreviewClick(customerID)}>
                                                <div className="all-message-profile-pic">
                                                    <img src={user.profilePic || messageDp} alt="DP" />
                                                </div>
                                                <div className="all-message-name">
                                                    <div className="all-message-timeandname">
                                                        <div className="all-message-name-tag">
                                                            <b>{user.firstName} {user.lastName}</b> {/* Display user's full name */}
                                                        </div>
                                                        <div style={{ fontSize: "15px", color: "#b3b3b3", padding: "3px 0 0 0" }}>
                                                            {groupedMessages[customerID][groupedMessages[customerID].length - 1].sendTime}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: "15px", color: "#b3b3b3", display: "flex", flexDirection: "row" }}>
                                                        <div style={{ width: "250px" }}>
                                                            {groupedMessages[customerID][groupedMessages[customerID].length - 1].message.substring(0, 34)}
                                                        </div>
                                                        {groupedMessages[customerID].some(msg => msg.status === 'unread') && <BellFilled style={{ fontSize: '14px', color: 'red', }} />}
                                                    </div>
                                                    <div>
                                                        <Tag color="purple">{groupedMessages[customerID][groupedMessages[customerID].length - 1].category}</Tag>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div style={{ alignItems: 'center', justifyContent: "center", marginTop: "200px" }}>
                                        <Loader />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="message-reply-admin">
                    <div className="message-all-users-bar-top-right">
                        <div>
                            {selectedUser ? (
                                <img
                                    src={selectedUser && selectedUser.profilePic}
                                    alt="Profile"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        margin: "15px 0 0 300px"
                                    }}
                                />) : null}
                        </div>

                        <div style={{ margin: "25px 0 0 20px" }}>
                            <b style={{ fontSize: "20px" }}>
                                {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}
                            </b>
                        </div>
                        <div style={{ display: "flex", width: "240px", justifyContent: "flex-end" }}>
                            {selectedUser ? (<div style={{ margin: "25px 0 0 20px" }} onClick={handleDownloadCSV}>
                                <Icon icon="material-symbols:download" width="32" height="32" />
                            </div>) : null}

                        </div>

                    </div>
                    <div>
                        <div className="message-reply-admin-box">
                            <div className="message-reply-admin-box-top">
                                {selectedUserID && (groupedMessages[selectedUserID] || []).map((msg, index) => {
                                    // Check if this is the first message or if the category has changed
                                    const isFirstMessage = index === 0;
                                    const categoryChanged = !isFirstMessage && msg.category !== groupedMessages[selectedUserID][index - 1].category && msg.sender !== 'admin';

                                    // If the category changed, insert a <hr> element
                                    const categoryChangeElement = categoryChanged ? (
                                        <div key={`category-divider-${msg._id}`} style={{ display: "flex", flexDirection: "row", margin: "10px 0 0 0", width: "790px" }}>
                                            <div style={{ width: "380px" }}><hr /></div>
                                            <div style={{ margin: "0 5px 0 5px" }}>
                                                <Tag color="default">{msg.category}</Tag>
                                            </div>
                                            <div style={{ width: "380px", }}><hr /></div>
                                        </div>
                                    ) : null;

                                    return (
                                        <React.Fragment key={msg._id}>
                                            {/* Insert the <hr> element if the category changed */}
                                            {categoryChangeElement}

                                            {msg.sender === 'customer' ? (
                                                <div className="message-receved-admin">
                                                    <img src={selectedUser && selectedUser.profilePic} alt="dp" style={{ width: "40px", height: "40px", borderRadius:"50%" }} />
                                                    <div style={{ background: "#f1f1f1", borderRadius: "11px", margin: "0 5px 0 15px", padding: "6px", minWidth: "150px", maxWidth: "400px", color: "black", display: "flex", flexDirection: "column" }}>
                                                        <div><p>{msg.message}</p></div>
                                                        <div style={{ fontSize: "10px", display: "flex", justifyContent: "flex-end" }}>{moment(msg.sendTime, 'HH:mm:ss').format('hh:mm A')}</div>
                                                    </div>
                                                    <div style={{ margin: "10px 0 0 5px" }}>
                                                        <div
                                                            id={`fade-button-${msg._id}`}
                                                            aria-controls={open ? 'fade-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={(e) => handleClick(e, msg._id)}
                                                        >
                                                            <Icon icon="mage:dots" width="16" height="16" style={{ cursor: "pointer" }} />
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
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            PaperProps={{
                                                                style: {
                                                                    backgroundColor: 'white',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                                                },
                                                            }}
                                                        >
                                                            {moment().diff(moment(msg.sendDate + ' ' + msg.sendTime, 'YYYY-MM-DD HH:mm:ss'), 'minutes') > 15 ? 
                                                            (
                                                                <MenuItem disabled> Delete </MenuItem>
                                                            ) : (
                                                                <MenuItem onClick={() => deleteMessage(msg._id)}> Delete </MenuItem>
                                                            )}
                                                        </Menu>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="message-send-admin">
                                                    <div style={{ margin: "10px 0 0 10px" }}>
                                                        <div
                                                            id={`fade-button-${msg._id}`}
                                                            aria-controls={open ? 'fade-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={(e) => handleClick(e, msg._id)}
                                                        >
                                                            <Icon icon="mage:dots" width="16" height="16" style={{ cursor: "pointer" }} />
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
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            PaperProps={{
                                                                style: {
                                                                    backgroundColor: 'white',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                                                },
                                                            }}
                                                        >

                                                            {moment().diff(moment(msg.sendDate + ' ' + msg.sendTime, 'YYYY-MM-DD HH:mm:ss'), 'minutes') > 15 ? (
                                                                <>
                                                                    <MenuItem disabled>Delete</MenuItem>
                                                                    <MenuItem disabled>Edit</MenuItem>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <MenuItem onClick={() => deleteMessage(msg._id)}>Delete</MenuItem>
                                                                    <MenuItem onClick={() => editMessage(msg._id)}>Edit</MenuItem>
                                                                </>
                                                            )}
                                                        </Menu>
                                                    </div>
                                                    <div style={{ background: "#7b63ff", borderRadius: "11px", margin: "0 15px 0 5px", padding: "6px", minWidth: "150px", maxWidth: "400px", color: "#ffffff", display: "flex", flexDirection: "column" }}>
                                                        <div><p>{msg.message}</p></div>
                                                        <div style={{ fontSize: "10px", display: "flex", justifyContent: "flex-end" }}>{moment(msg.sendTime, 'HH:mm:ss').format('hh:mm A')}</div>
                                                    </div>
                                                    <img src={messageDp} alt="dp" style={{ width: "40px", height: "40px" }} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            {selectedUser ? (
                                <div className="message-Send-bar">
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
                                        <button type="submit" disabled={!message} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                            <SendOutlined style={{ color: message ? "black" : "#d3d3d3", fontSize: "22px" }} />
                                        </button>
                                    </form>
                                </div>) : null
                            }
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default AllMessages;
