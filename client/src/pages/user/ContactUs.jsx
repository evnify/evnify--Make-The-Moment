import Reactl,{useState} from "react";
import { ChatBox } from "../../components";
import { Button, Input, ConfigProvider } from 'antd';
import { contactUSimg01, contactUSimg02,chooseUsIcon,westandoutIcon,missionIcon } from "../../assets";
import axios from "axios";
const { TextArea } = Input;

function ContactUs() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !subject || !message) {
        //   return toast.error('Please fill email, subject and message');
        console.log("Please fill email, subject and message")
        }
        try {
          setLoading(true);
          const { data } = await axios.post(`/api/messages/email`, {
            email,
            subject,
            message,
          });
          setLoading(false);
        //   toast.success(data.message);
          console.log("success",data)
        } catch (err) {
          setLoading(false);
        //   toast.error(
        //     err.response && err.response.data.message
        //       ? err.response.data.message
        //       : err.message
        //   );
            console.log("error",err)
        }
      };


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
                <div className="contact-us-about-us-section-text-div-para">
                    <p>
                        At Evinify, we're passionate about creating memorable events that leave a lasting impression. Our dedicated team of event specialists is committed to turning your vision into reality, whether it's a corporate conference, a wedding celebration, or a community gathering.
                    </p>
                </div>

            </div>
            <div className="contact-us-about-us-section-text-div">
                <div><img src={contactUSimg01} alt="contactUSimg01" className="contact-us-about-us-section-text-div-imgflw" /></div>
                <div className="contact-us-about-us-section-text-div-with-ic">
                <div>
                     <img src={missionIcon} alt="contactUSimg01" style={{width:"150px", margin:"0 0 10px 0", padding:"0", float:"left"}} /> 
                     <hr style={{margin:"22px 0 0 50px", width:"720px", border:"1px solid", borderRadius:"10px" }}></hr>   
                </div>
                <div>
               
                <p>Our mission at Evinify is not just about planning events; it's about creating experiences that leave a lasting impact. We believe that every event should tell a story – your story. That's why we're dedicated to understanding your vision, your goals, and your audience, so we can craft an event that reflects your personality and resonates with your guests.</p>
                <p> With meticulous attention to detail and a commitment to excellence, we strive to exceed your expectations at every turn. Whether you're hosting a corporate conference, a wedding celebration, or a charity gala, we'll work tirelessly to ensure that every aspect of your event is flawless – from the initial concept to the final execution.</p>
                </div>
                </div>
            </div>
            <div className="contact-us-about-us-section-whychooseus">
                <div>
                <img src={chooseUsIcon} alt="contactUSimg01" style={{width:"190px", margin:"0", padding:"0 0 10px 0", float:"left"}} />
                <hr style={{margin:"22px 0 20px 50px", width:"870px", border:"1px solid", borderRadius:"10px" }}></hr> 
                    <p><b>Expertise: </b>With years of experience in the industry, our team brings a wealth of knowledge and expertise to every event we manage. From small intimate gatherings to large-scale productions, we have the skills and resources to execute flawless events of any size.</p>
                    <p><b>Personalized Service: </b>We believe in the power of personalization. That's why we take the time to understand your unique requirements and preferences, ensuring that every aspect of your event reflects your vision and exceeds your expectations and your choice.</p>
                    <p><b>Innovation:</b> At Evinify, we're constantly pushing the boundaries of event design and innovation. From cutting-edge technology to creative concepts, we're always exploring new ways to elevate the event experience and create unforgettable moments for you and your guests.</p>
                </div>

            </div>
            <div className="contact-us-about-us-section-howwestandout">
            <img src={westandoutIcon} alt="contactUSimg01" style={{width:"190px", margin:"0 0 10px 0", float:"left"}} />
            <hr style={{margin:"22px 0 20px 50px", width:"870px", border:"1px solid", borderRadius:"10px" }}></hr> 
                <p>
                    At Evinify, we stand out through our commitment to personalized service and creative innovation, ensuring that each event is uniquely tailored to our clients' vision
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
                <p>Have a question or want to learn more about our services? Contact us today and let us help you create an unforgettable event.</p>
            </div>
            <div className="contact-us-contact-us-section-form-right-dev">
           < form onSubmit={submitHandler}>
          <h1>Send Email</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            ></input>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              onChange={(e) => setSubject(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label></label>
            <button disabled={loading} type="submit">
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* <b>Name:</b>
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
                        resize: 'none',
                        background: '#f0f2f5'
                    }}
                />
            <ConfigProvider
            theme={{
                global: {
                    colorLinkHover: 'red',
                },
            }}
        >
            <Button type="primary" block className="Btn-btn-contact-us">
                Primary
            </Button>
        </ConfigProvider> */}

            </div>
        </div>
        <ChatBox />
    </div>;
}

export default ContactUs;
