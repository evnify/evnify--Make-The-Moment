import React, { useState } from "react";
import { ChatBox } from "../../components";
import { Button, Input, ConfigProvider } from "antd";
import {
  contactUSimg01,
  contactUSimg02,
  chooseUsIcon,
  westandoutIcon,
  missionIcon,
} from "../../assets";
import axios from "axios";
import { Navbar, Footer } from "../../components";
const { TextArea } = Input;

function ContactUs() {
  const [loading, setLoading] = useState(false);

  // Function to handle scrolling to the About Us section
  const handleScrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us-section");
    aboutUsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="contact-us-main-container">
      <Navbar />

      <div className="contact-us-bg-color">
        <div className="contact-us-main-about-us">
          <div className="contact-us-about-us-text">
            <h1 className="contact-us-main-about-us-h1">About Us</h1>
            <div className="contact-us-main-about-us-div">
              <p>
                Evinify is not just about planning events; it's about creating
              </p>
              <p>
                experiences that leave a lasting impact. We believe that every
                event
              </p>
              <p>should tell a story – your story.</p>
            </div>
            <button
              className="contact-us-about-us-seemore-button"
              onClick={handleScrollToAboutUs}
            >
              See More
            </button>
          </div>
        </div>
        <hr className="scetion-divider-hr"></hr>

        <h3 id="about-us-section">About US</h3>
        <div className="contact-us-main-about-us-section">
          <div className="contact-us-about-us-section-text">
            <div className="contact-us-about-us-section-text-div-para">
              <p>
                At Evinify, we're passionate about creating memorable events
                that leave a lasting impression. Our dedicated team of event
                specialists is committed to turning your vision into reality,
                whether it's a corporate conference, a wedding celebration, or a
                community gathering.
              </p>
            </div>
          </div>
          <div className="contact-us-about-us-section-text-div">
            <div>
              <img
                src={contactUSimg01}
                alt="contactUSimg01"
                className="contact-us-about-us-section-text-div-imgflw"
              />
            </div>
            <div className="contact-us-about-us-section-text-div-with-ic">
              <div>
                <img
                  src={missionIcon}
                  alt="contactUSimg01"
                  style={{
                    width: "150px",
                    margin: "0 0 10px 0",
                    padding: "0",
                    float: "left",
                  }}
                />
                <hr
                  style={{
                    margin: "22px 0 0 50px",
                    width: "720px",
                    border: "1px solid",
                    borderRadius: "10px",
                  }}
                ></hr>
              </div>
              <div>
                <p>
                  Our mission at Evinify is not just about planning events; it's
                  about creating experiences that leave a lasting impact. We
                  believe that every event should tell a story – your story.
                  That's why we're dedicated to understanding your vision, your
                  goals, and your audience, so we can craft an event that
                  reflects your personality and resonates with your guests.
                </p>
                <p>
                  {" "}
                  With meticulous attention to detail and a commitment to
                  excellence, we strive to exceed your expectations at every
                  turn. Whether you're hosting a corporate conference, a wedding
                  celebration, or a charity gala, we'll work tirelessly to
                  ensure that every aspect of your event is flawless – from the
                  initial concept to the final execution.
                </p>
              </div>
            </div>
          </div>
          <div className="contact-us-about-us-section-whychooseus">
            <div>
              <img
                src={chooseUsIcon}
                alt="contactUSimg01"
                style={{
                  width: "190px",
                  margin: "0",
                  padding: "0 0 10px 0",
                  float: "left",
                }}
              />
              <hr
                style={{
                  margin: "22px 0 20px 50px",
                  width: "870px",
                  border: "1px solid",
                  borderRadius: "10px",
                }}
              ></hr>
              <p>
                <b>Expertise: </b>With years of experience in the industry, our
                team brings a wealth of knowledge and expertise to every event
                we manage. From small intimate gatherings to large-scale
                productions, we have the skills and resources to execute
                flawless events of any size.
              </p>
              <p>
                <b>Personalized Service: </b>We believe in the power of
                personalization. That's why we take the time to understand your
                unique requirements and preferences, ensuring that every aspect
                of your event reflects your vision and exceeds your expectations
                and your choice.
              </p>
              <p>
                <b>Innovation:</b> At Evinify, we're constantly pushing the
                boundaries of event design and innovation. From cutting-edge
                technology to creative concepts, we're always exploring new ways
                to elevate the event experience and create unforgettable moments
                for you and your guests.
              </p>
            </div>
          </div>
          <div className="contact-us-about-us-section-howwestandout">
            <img
              src={westandoutIcon}
              alt="contactUSimg01"
              style={{
                width: "190px",
                margin: "0 0 10px 0",
                float: "left",
              }}
            />
            <hr
              style={{
                margin: "22px 0 20px 50px",
                width: "870px",
                border: "1px solid",
                borderRadius: "10px",
              }}
            ></hr>
            <p>
              At Evinify, we stand out through our commitment to personalized
              service and creative innovation, ensuring that each event is
              uniquely tailored to our clients' vision
            </p>
          </div>
        </div>

        <hr className="scetion-divider-hr"></hr>

        <h3>Contact US</h3>
        <div className="contact-us-contact-us-section-form">
          <div>
            <img src={contactUSimg02} alt="contactUSimg01" />
          </div>
          <div className="contact-us-contact-us-section-form-center-dev">
            <h3>Get in Touch</h3>
            <p>
              Have a question or want to learn more about our services? Contact
              us today and let us help you create an unforgettable event.
            </p>
          </div>
          <div className="contact-us-contact-us-section-form-right-dev">
            <form>
              <b>Name:</b>
              <Input placeholder="Enter Your name here" />
              <b>Email:</b>
              <Input placeholder="Enter Your Email here" />
              <b>Message:</b>
              <TextArea
                showCount
                maxLength={250}
                placeholder="Enter your message here"
                style={{
                  height: 120,
                  resize: "none",
                  background: "#f0f2f5",
                }}
              />
              <button className="contact-us-form-button">Contact Us</button>
            </form>
          </div>
        </div>
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
