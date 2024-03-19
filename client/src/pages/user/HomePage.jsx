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
                    <img src={corosal1}
                        alt="corosal1"
                        style={{ ...contentStyle, height: 590, width: 1320 }}
                    />
                </div>
                <div>
                    <img src={corosal2}
                        alt="corosal2"
                        style={contentStyle}
                        height={590}
                        width={1320}
                    />

                </div>
                <div>
                    <img src={corosal3}
                        alt="corosal3"
                        style={contentStyle}
                        height={590}
                        width={1320}
                    />
                </div>
                <div>
                    <img src={corosal4}
                        alt="corosal4"
                        style={contentStyle}
                        height={590}
                        width={1320}
                    />
                </div>
            </Carousel>
        </div>
    );
}

export default HomePage;
