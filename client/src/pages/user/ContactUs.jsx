import React from "react";
import { ChatBox } from "../../components";
import { Button } from 'antd';
import { contactUSimg01 } from "../../assets";

function ContactUs() {

    return <div className="contact-us-bg-color">
        <div className="contact-us-main-about-us">
            <div className="contact-us-about-us-text">
                <h1 className="contact-us-main-about-us-h1">About Us</h1>
                <div className="contact-us-main-about-us-div">
                    <p>Evinify is not just about planning events; it's about creating</p>
                    <p>experiences that leave a lasting impact. We believe that every event</p>
                    <p>should tell a story – your story.</p>
                </div>
                <Button type="primary">See More</Button>
            </div>
        </div>
        <hr className="scetion-divider-hr"></hr>

        <h3>About US</h3>
        <div className="contact-us-main-about-us-section">
            <div className="contact-us-about-us-section-text">
                <div className="contact-us-about-us-section-text-div">
                    <p>
                        At Evinify, we're passionate about creating memorable events that leave a lasting impression. Our dedicated team of event specialists is committed to turning your vision into reality, whether it's a corporate conference, a wedding celebration, or a community gathering.
                    </p>
                </div>

            </div>
            <div className="contact-us-about-us-section-text-div">
                <img src={contactUSimg01} alt="contactUSimg01" />
                <p>Our mission at Evinify is not just about planning events; it's about creating experiences that leave a lasting impact. We believe that every event should tell a story – your story. That's why we're dedicated to understanding your vision, your goals, and your audience, so we can craft an event that reflects your personality and resonates with your guests.</p>
                   <p> With meticulous attention to detail and a commitment to excellence, we strive to exceed your expectations at every turn. Whether you're hosting a corporate conference, a wedding celebration, or a charity gala, we'll work tirelessly to ensure that every aspect of your event is flawless – from the initial concept to the final execution.</p>
            </div>
            <div className="contact-us-about-us-section-whychooseus">
                <div>
                <b>Expertise: </b>
                <p>With years of experience in the industry, our team brings a wealth of knowledge and expertise to every event we manage. From small intimate gatherings to large-scale productions, we have the skills and resources to execute flawless events of any size.</p>
                </div>
            </div>
        </div>

        <ChatBox />
    </div>;
}

export default ContactUs;
