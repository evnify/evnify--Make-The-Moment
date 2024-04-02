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
                <div className="email-container-right-top">
                    <div><img src={messageDp} alt="dp" style={{ margin: "20px 20px 20px 30px", height: "70px" }} /></div>
                    <div className="email-container-right-top-center-text">
                        <div style={{ fontSize: "18px" }}>Sasindu Nadeeshan</div>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>What is want update</div>
                    </div>
                    <div style={{ margin: "20px 10px 0 10px" }}>01-02-24 14.22</div>
                </div>
                <div className="email-content">
                    Dear Evinify,
                    
                    I hope this email finds you well.

                    My name is [Your Name], and I am writing to inquire about the availability of a specific product from your store. I recently came across your website and was interested in purchasing the [Product Name]. However, upon checking the product listing, I noticed that it is currently out of stock.

                    Could you please provide me with an update on when the [Product Name] will be available for purchase again? I would greatly appreciate any information you can provide regarding the restocking timeline or any alternative options that may be available.
                    Additionally, if there are any upcoming promotions or discounts related to this product, I would be grateful if you could share those details with me.

                    Thank you for your attention to this matter. I look forward to hearing back from you soon.

                    Best regards,
                    Sasindu

                </div>
            </div>
        </div>
    </div>;
}

export default UserEmails;
