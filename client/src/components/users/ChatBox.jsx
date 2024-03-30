import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const ChatBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [content, setMessage] = useState('');


    const submitMessage = async () => {
        try {
            const message = {
                customerID: "c001",
                category: "general",
                message: content
            };
    
            // Adjust the endpoint URL based on your backend configuration
            await axios.post("/api/message/newMessage", message);
    
            // Close the modal after submitting the message
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            // Handle error if the message submission fails
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
            {/* <input type="text" placeholder="Type a message" onSubmit={submitMessage} style={{ width: '80%', border: 'none', alignContent: 'left', outline: 'none', boxShadow: 'none', margin: "0" }} />
            <Icon icon="material-symbols:send" width="24" height="24" style={{ margin: '0 0 0 25' }} /> */}
             <form onSubmit={submitMessage}>
            <input type="text" onChange={(e) => setMessage(e.target.value)}/>
            <input type='submit'/>
        </form>
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
                    border: '1px solid #e8e8e8', // Add border style
                    borderRadius: '8px', // Optional: Add border radius for rounded corners
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional: Add shadow
                }}
            >
                <div className="message-box-chatbox  " style={{ scrollbarWidth: "thin" }}>
                    <div className="sent-message-chatbox ">Hello, how are you?</div>
                    <div className="sent-message-chatbox ">Hello, how are you?</div>
                    {
                        data.map((item) => {
                            return (
                                <div>
                                    <h1>{item.message}</h1>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ borderTop: '1px solid #e8e8e8', padding: '8px 0' }}>
                    {modalFooter}
                </div>
            </Modal>
        </div>
    );
};

export default ChatBox;
