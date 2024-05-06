import React from "react";
import { useNavigate } from "react-router-dom";

function ContactUS() {
    const navigate = useNavigate();

    const handleChatButtonClick = () => {
        navigate("/");
    };
    const handleEmailButtonClick = () => {
        navigate("/contactus");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "675px",
                    width: "1220px",
                    borderRadius: "11px",
                    background: "#fff",
                    margin: "15px 0 0 20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "250px",
                        borderRadius: "11px",
                        background: "#fff",
                        margin: "15px 0 0 20px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div style={{fontSize:"56px",fontWeight:"bold"}}>Reach out and say hello!</div>
                    </div>
                    <div style={{fontSize:"16px",fontWeight:"bold", color:"#6d7785"}}>
                        Get in touch through any of the channels below. We're
                        eager to hear from you!
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "1220px",
                    }}
                >
                    <div className="user-contact-us-left">
                        <div className="user-contactus-title">Chat With Us</div>
                        <div className="user-contactus-description">
                            Connect with our team through our chat platform
                            right here on Evnify. Engage with our support
                            representatives to get immediate assistance, ask
                            questions, or discuss any concerns you may have.
                        </div>
                        <div>
                            <button
                                className="user-contactus-btn"
                                onClick={handleChatButtonClick}
                            >
                                Chat with Us
                            </button>
                        </div>
                    </div>
                    <div className="user-contact-us-right">
                        <div className="user-contactus-title">Email Us</div>
                        <div className="user-contactus-description">
                            Have a question or want to learn more about our
                            services? Feel free to email us to communicate
                            inquiries, feedback, or issues. We appreciate your
                            input!
                        </div>
                        <div>
                            <button
                                className="user-contactus-btn"
                                onClick={handleEmailButtonClick}
                            >
                                Email Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUS;
