import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';

function ChatBox() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

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



    const sendMessage = async (e) => {
        try {
            const customerID = "U71200743";
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


    const modalHeader = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '1px' }}>
            <h3>Chat Box</h3>
            <Button type="text" icon={<CloseOutlined />} onClick={handleCancel} />
        </div>
    );

    const modalFooter = (
        <div>
            <input type="text" placeholder="Type a message" onChange={(e) => setMessage(e.target.value)} style={{ width: '80%', border: 'none', alignContent: 'left', outline: 'none', boxShadow: 'none', margin: "0" }} />
            <Icon icon="material-symbols:send" width="24" height="24" style={{ margin: '0 0 0 25' }} onClick={sendMessage}/>
            
        </div>
    );

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            {isModalOpen ? (
                <Button type="primary" onClick={handleCancel}>
                    Close Modal
                </Button>
            ) : (
                <Button type="primary" onClick={handleOpenModal}>
                    Open Modal
                </Button>
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
                    top: '190px',
                    overflow: 'auto',
                    border: '1px solid #e8e8e8', 
                    borderRadius: '8px', 
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                }}
            >
                <div className="message-box-chatbox  " style={{ scrollbarWidth: "thin" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className="sent-message-chatbox">{msg.message}</div>
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
