import React from "react";
import Navbar from "../../components/users/navBar";
import { Carousel } from "antd";

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
        <div >
            <Navbar />
            <div className="center">
            <Carousel autoplay style={{height: "669px", width: "1320px"}}>
                <div>
                    <img
                        className="carousel_carouse"
                        src="https://i.ibb.co/9Hc5MQk/corosal-01.webp"
                        alt="corosal1"
                        style={{ ...contentStyle, height: "669px", width: "1320px"}}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src="https://i.ibb.co/SV5FMWH/corosal-02.webp"
                        alt="corosal2"
                        style={{...contentStyle, height: "669px", width: "1320px"}}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src="https://i.ibb.co/ZJcGvvm/corosal-03.webp"
                        alt="corosal3"
                        style={{...contentStyle, height: "669px", width: "1320px"}}
                    />
                </div>
                <div>
                    <img
                        className="carousel_carouse"
                        src="https://i.ibb.co/bFtJ3BN/corosal-04.webp"
                        alt="corosal4"
                        style={{...contentStyle, height: "669px", width: "1320px"}}
                    />
                </div>
            </Carousel>
            </div>
        </div>
    );
}

export default HomePage;
