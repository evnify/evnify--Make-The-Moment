import React from "react";
import { messageDp } from "../../assets";

function UserEmails() {
    return <div>
        <div className="email-full-container">
            <div className="email-container-left">
                <div className="left-side-full-email-top ">
                    <b>All</b>
                    <b>Read</b>
                    <b>Unread</b>
                </div>
                <div className="left-side-full-email-down">
                    <div className="left-side-full-email-view">
                        <div><img src={messageDp} alt="dp" style={{ margin: "10px" }} /></div>
                        <div className="left-side-full-email-view-text">
                            <div className="name-email-view">
                                <div>Sasindu Nadeeshan</div>
                                <div style={{ margin: "0 0 0 60px" }}>01-02-24 14.22</div>
                            </div>
                            <div><p style={{ margin: "0 0 0 10px", fontWeight: "bold", fontSize: "20px" }}>What is want update</p></div>
                            <div>
                                <p style={{ fontSize: "12px", height: "20px", width: "300px", margin: "5px 0 0 10px", textAlign: "justify" }}>
                                    Illustrations, and graphic elements from the world's best designers. Want more inspiration? Browse our search results.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="left-side-full-email-view">
                        <div><img src={messageDp} alt="dp" style={{ margin: "10px" }} /></div>
                        <div className="left-side-full-email-view-text">
                            <div className="name-email-view">
                                <div>Sasindu Nadeeshan</div>
                                <div style={{ margin: "0 0 0 60px" }}>01-02-24 14.22</div>
                            </div>
                            <div><p style={{ margin: "0 0 0 10px", fontWeight: "bold", fontSize: "20px" }}>What is want update</p></div>
                            <div>
                                <p style={{ fontSize: "12px", height: "20px", width: "300px", margin: "5px 0 0 10px", textAlign: "justify" }}>
                                    Illustrations, and graphic elements from the world's best designers. Want more inspiration? Browse our search results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="email-container-right">

            </div>
        </div>
    </div>;
}

export default UserEmails;
