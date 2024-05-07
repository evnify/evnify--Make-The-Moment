import React, { useState, useEffect } from "react";
import { Button, Flex, Modal, Select, message, Tag } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import moment from "moment";
import { chatIcon } from "../assets";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

function ChatBox() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [groupedMessages, setGroupedMessages] = useState({});
    const [customerID, setCustomerID] = useState("");
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setIsLoggedIn(currentUser !== null);
        if (currentUser !== null) {
            setCustomerID(currentUser.userID);
        }
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const sendMessage = async (e) => {
        try {
            const messages = {
                customerID,
                message: userMessage,
                sendDate: moment().format("YYYY-MM-DD"),
                sendTime: moment().format("HH:mm:ss"),
                category: selectedCategory,
                sender: "customer",
                status: "unread",
                reciverId: customerID,
            };
            console.log(messages);
            await axios.post("/api/messages/newMessage", messages);
            fetchMessages();
        } catch (error) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data.message ===
                    "Message contains prohibited content"
            ) {
                setErrorMessage("Message contains prohibited content");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 4000);
            } else {
                console.log(error);
            }
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get("/api/messages/allMessages");
            setMessages(response.data);
            groupMessages(response.data);
            console.log("group", groupedMessages);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch stored selected category from localStorage on component mount
    useEffect(() => {
        const storedCategory = localStorage.getItem("selectedCategory");
        if (storedCategory) {
            setSelectedCategory(storedCategory);
        }
        fetchMessages();
        const interval = setInterval(() => {
            fetchMessages();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const groupMessages = (messages) => {
        const grouped = {};
        messages.forEach((msg) => {
            const { customerID, category } = msg;
            if (!grouped[customerID]) {
                grouped[customerID] = {};
            }
            if (!grouped[customerID][category]) {
                grouped[customerID][category] = [];
            }
            grouped[customerID][category].push(msg);
        });
        setGroupedMessages(grouped);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        console.log("open");
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log("cancel");
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true); // Open the chat box
        localStorage.setItem("selectedCategory", category);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (userMessage.trim() !== "") {
            sendMessage();
            setUserMessage("");
        }
    };

    useEffect(() => {
        setSentMessages(messages.filter((msg) => msg.sender === "admin"));
        setReceivedMessages(
            messages.filter((msg) => msg.sender === "customer")
        );
    }, [messages]);

    const modalHeader = (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "20px",
            }}
        >
            {selectedCategory ? (
                <>
                    <Icon
                        onClick={() => {
                            setSelectedCategory(null);
                            localStorage.removeItem("selectedCategory");
                        }}
                        icon="ep:back"
                        width="24"
                        height="24"
                        style={{
                            margin: "0 0 20px 0",
                            height: "25px",
                            fontSize: "10px",
                        }}
                    />
                    {errorMessage ? (
                        <Tag
                            icon={<CloseCircleOutlined />}
                            color="error"
                            style={{
                                margin: "0 0 20px 0",
                                height: "25px",
                                fontSize: "14px",
                                color: "red",
                            }}
                        >
                            {errorMessage}
                        </Tag>
                    ) : (
                        <h6
                            style={{
                                margin: "0 0 20px 0",
                                height: "25px",
                                fontSize: "14px",
                            }}
                        >
                            Ask Your Question About {selectedCategory}
                        </h6>
                    )}
                </>
            ) : null}
        </div>
    );

    const modalFooter = (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    style={{
                        width: "80%",
                        border: "none",
                        alignContent: "left",
                        outline: "none",
                        boxShadow: "none",
                        margin: "0",
                    }}
                />
                <Icon
                    icon="material-symbols:send"
                    disable={!userMessage}
                    width="24"
                    height="24"
                    style={{
                        margin: "0 0 0 25",
                        cursor: "pointer",
                        color: userMessage ? "black" : "#d3d3d3",
                    }}
                    onClick={handleFormSubmit}
                />
            </form>
        </div>
    );

    return (
        <div style={{ position: "fixed", bottom: "40px", right: "30px" }}>
            <img
                src={chatIcon}
                alt="chatIco"
                onClick={handleOpenModal}
                style={{ width: "65px", height: "65px" }}
            />

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
                    position: "absolute",
                    right: "60px",
                    top: "140px",
                    overflow: "auto",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                {modalHeader}
                {isLoggedIn ? ( // Conditionally render based on isLoggedIn state
                    <>
                        {selectedCategory ? (
                            <div
                                className="message-box-chatbox"
                                style={{ scrollbarWidth: "thin" }}
                            >
                                {customerID &&
                                    groupedMessages[customerID]?.[
                                        selectedCategory
                                    ]?.map((msg, index) =>
                                        msg.sender === "customer" ? (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <div className="sent-message-chatbox">
                                                    <div>{msg.message}</div>
                                                    <div
                                                        style={{
                                                            fontSize: "10px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        {moment(
                                                            msg.sendTime,
                                                            "HH:mm:ss"
                                                        ).format("hh:mm A")}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    float: "left",
                                                }}
                                            >
                                                <div className="received-message-chatbox">
                                                    <div
                                                        style={{
                                                            fontWeight: "bold",
                                                            color: "#533c56",
                                                        }}
                                                    >
                                                        Evnify
                                                    </div>
                                                    <div>{msg.message}</div>
                                                    <div
                                                        style={{
                                                            fontSize: "10px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        {moment(
                                                            msg.sendTime,
                                                            "HH:mm:ss"
                                                        ).format("hh:mm A")}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        ) : (
                            <div>
                                <div className="message-category">
                                    <div className="category-box-container">
                                        <div className="message-category-name-box">
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "23.5px",
                                                }}
                                            >
                                                Hi! {currentUser.firstName}{" "}
                                                {currentUser.lastName}
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: "justify",
                                                    width: "250px",
                                                }}
                                            >
                                                {" "}
                                                Ask us anything you've been
                                                pondering, and let's unlock the
                                                answers together.
                                            </div>
                                        </div>
                                        <div>
                                            Select Your Category And Start
                                        </div>
                                        <div>Conversation</div>
                                        <div style={{ margin: "20px 0 0 0" }}>
                                            <div
                                                className="category-boxes"
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        "Price"
                                                    )
                                                }
                                            >
                                                <div
                                                    style={{
                                                        width: "240px",
                                                        fontSize: "14px",
                                                        lineHeight: "1.3",
                                                    }}
                                                >
                                                    Product/Service Information
                                                    and Pricing Inquiries
                                                </div>
                                                <div>
                                                    <Icon
                                                        icon="material-symbols:send"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="category-boxes"
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        "Quantity"
                                                    )
                                                }
                                            >
                                                <div
                                                    style={{
                                                        width: "240px",
                                                        fontSize: "14px",
                                                        lineHeight: "1.3",
                                                    }}
                                                >
                                                    Product/Service Minimum and
                                                    Maximum Order Quantity
                                                    Inquiries
                                                </div>
                                                <div>
                                                    <Icon
                                                        icon="material-symbols:send"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="category-boxes"
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        "Restocking"
                                                    )
                                                }
                                            >
                                                <div
                                                    style={{
                                                        width: "240px",
                                                        fontSize: "14px",
                                                        lineHeight: "1.3",
                                                    }}
                                                >
                                                    Product/Service Availability
                                                    and Restocking Inquiries
                                                </div>
                                                <div>
                                                    <Icon
                                                        icon="material-symbols:send"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="category-boxes"
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        "Customization"
                                                    )
                                                }
                                            >
                                                <div
                                                    style={{
                                                        width: "240px",
                                                        fontSize: "14px",
                                                        lineHeight: "1.3",
                                                    }}
                                                >
                                                    Product/Service
                                                    Customization and
                                                    Personalization Inquiries
                                                </div>
                                                <div>
                                                    <Icon
                                                        icon="material-symbols:send"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedCategory ? (
                            <div
                                style={{
                                    borderTop: "1px solid #e8e8e8",
                                    padding: "8px 0",
                                }}
                            >
                                {modalFooter}
                            </div>
                        ) : null}
                    </>
                ) : (
                    <div className="message-category">
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "130px",
                                    backgroundColor: "#5d2f60",
                                    borderRadius: "8px",
                                }}
                            >
                                <h1
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "48px",
                                    }}
                                >
                                    Oops...!
                                </h1>
                                <h6
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                    }}
                                >
                                    Sorry For The Inconvenience
                                </h6>
                            </div>
                            <div
                                style={{
                                    margin: "40px 0 0 0",
                                    textAlign: "center",
                                    fontSize: "18px",
                                }}
                            >
                                <p>
                                    You have to login to the system for start
                                    conversation with us.
                                </p>
                            </div>
                        </div>
                        <div>
                            <a href="/login" style={{ textDecoration: "none" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        height: "120px",
                                    }}
                                >
                                    <button className="btn-btn-login">
                                        Login
                                    </button>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ChatBox;
