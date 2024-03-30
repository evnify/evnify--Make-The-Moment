import React from "react";
import Navbar from "../../components/users/navBar";
import { Carousel } from "antd";
import corosal1 from "../../assets/corosal01.svg";
import corosal2 from "../../assets/corosal02.svg";
import corosal3 from "../../assets/corosal03.svg";
import corosal4 from "../../assets/corosal04.svg";

function HomePage() {
    const contentStyle = {
        color: "#fff",
        justifyContent: "center",
        lineHeight: "160px",

        textAlign: "center",
        margin: "auto",
        borderRadius: "10px",
        marginTop: "25px",
    };

    return (
        <div>
            <Navbar />
            <Carousel autoplay>
                <div>
                    <img
                        className="carousel_carouse"
                        src={corosal1}
                        alt="corosal1"
                        style={{ ...contentStyle }}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src={corosal2}
                        alt="corosal2"
                        style={contentStyle}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src={corosal3}
                        alt="corosal3"
                        style={contentStyle}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src={corosal4}
                        alt="corosal4"
                        style={contentStyle}
                    />
                </div>
            </Carousel>
        </div>
    );
}

export default HomePage;
