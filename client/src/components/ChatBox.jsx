import React, { useState, useEffect } from 'react';
import { Button, Flex, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import { chatIcon } from "../assets";

function ChatBox() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [groupedMessages, setGroupedMessages] = useState({});
    const [customerID, setCustomerID] = useState(null);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const sendMessage = async (e) => {
        try {
            const customerID = "U56200311";
            const messages = {
                customerID,
                message,
                sendDate: moment().format("YYYY-MM-DD"),
                sendTime: moment().format("HH:mm:ss"),
                category: "newe new",
                sender: "customer",
                status: "unread",
                reciverId: customerID,

            };
            console.log(messages);
            await axios.post('/api/messages/newMessage', messages);
            fetchMessages();
        } catch (error) {
            console.log(error)
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages/allMessages');
            setMessages(response.data);
            groupMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch messages when the component mounts
        setCustomerID("U56200311");

        // Polling to fetch new messages 
        const interval = setInterval(() => {
            fetchMessages();
        }, 3000); // Adjust the interval time as needed

        return () => clearInterval(interval);
    }, []);


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


    const handleOpenModal = () => {
        setIsModalOpen(true);
        console.log("open")
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log("cancel")
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (message.trim() !== "") {
            sendMessage(); // Call sendMessage function
            setMessage(""); // Clear the input field after sending the message
        }
    };


    // Filter sent and received messages
    useEffect(() => {
        setSentMessages(messages.filter(msg => msg.sender === 'admin'));
        setReceivedMessages(messages.filter(msg => msg.sender === 'customer'));
    }, [messages]);


    const modalHeader = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '1px' }}>
            <h3>Chat Box</h3>
            <Button type="text" icon={<CloseOutlined />} onClick={handleCancel} />
        </div>
    );

    const modalFooter = (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '80%', border: 'none', alignContent: 'left', outline: 'none', boxShadow: 'none', margin: "0" }} />
                <Icon icon="material-symbols:send" width="24" height="24" style={{ margin: '0 0 0 25', cursor: 'pointer' }} onClick={handleFormSubmit} />
            </form>
        </div>

    );

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            {isModalOpen ? (

                <img src={chatIcon} alt="chatIco" onClick={handleCancel} style={{ width: "65px", height: "65px" }} />
                // <Button type="primary" onClick={handleCancel}>
                //     Close Modal
                // </Button>
            ) : (
                <img src={chatIcon} alt="chatIco" onClick={handleOpenModal} style={{ width: "65px", height: "65px" }} />
                // <Button type="primary" onClick={handleOpenModal}>
                //     Open Modal
                // </Button>
            )}

            <Modal
                title={null}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={350}
                centered
                destroyOnClose
                footer={null}
                closeIcon={null}
                mask={false}
                style={{
                    position: 'absolute',
                    right: '50px',
                    top: '170px',
                    overflow: 'auto',
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="message-box-chatbox" style={{ scrollbarWidth: "thin" }}>
                    {customerID && (groupedMessages[customerID] || []).map((msg, index) => (
                        msg.sender === 'customer' ? (
                            <div key={index} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div className="sent-message-chatbox">
                                    <div>{msg.message}</div>
                                    <div style={{ fontSize: "10px", display: "flex", justifyContent: "flex-end" }}>
                                        {moment(msg.sendTime, 'HH:mm:ss').format('hh:mm A')}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={index} style={{ display: "flex", float: "left" }}>
                                <div className="received-message-chatbox">
                                <div style={{fontWeight:"bold",color:"#533c56"}}>Evnify</div>
                                    <div>{msg.message}</div>
                                    <div style={{ fontSize: "10px", display: "flex", justifyContent: "flex-end" }}>
                                        {moment(msg.sendTime, 'HH:mm:ss').format('hh:mm A')}
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>


                <div style={{ borderTop: '1px solid #e8e8e8', padding: '8px 0' }}>
                    {modalFooter}
                </div>
            </Modal>
        </div>
    );
};

export default ChatBox;
