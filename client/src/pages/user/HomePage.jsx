import React, { useState } from "react";
import { Navbar, Footer } from "../../components";
import { Carousel, Button, Card, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import{ig, fb, li, yt} from "../../assets"
const { Meta } = Card;

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

    const navigate = useNavigate();
    const [size, setSize] = useState("large");

    return (
        <div className="home_page_background_container">
            <div className="navbar_section">
                <Navbar />
                <div className="center">
                    <Carousel
                        autoplay
                        style={{ height: "669px", width: "1320px" }}
                    >
                        <div>
                            <img
                                className="carousel_carouse"
                                src="https://i.ibb.co/ZHND8FX/corosal-04.png"
                                alt="corosal4"
                                style={{
                                    ...contentStyle,
                                    height: "669px",
                                    width: "1320px",
                                }}
                            />
                        </div>
                        <div>
                            <img
                                className="carousel_carouse"
                                src="https://i.ibb.co/9Hc5MQk/corosal-01.webp"
                                alt="corosal1"
                                style={{
                                    ...contentStyle,
                                    height: "669px",
                                    width: "1320px",
                                }}
                            />
                        </div>
                        <div>
                            <img
                                className="carousel_carouse"
                                src="https://i.ibb.co/LP4NP1c/weding.png"
                                alt="corosal2"
                                style={{
                                    ...contentStyle,
                                    height: "669px",
                                    width: "1320px",
                                }}
                            />
                        </div>
                        <div>
                            <img
                                className="carousel_carouse"
                                src="https://i.ibb.co/ZJcGvvm/corosal-03.webp"
                                alt="corosal3"
                                style={{
                                    ...contentStyle,
                                    height: "669px",
                                    width: "1320px",
                                }}
                            />
                        </div>
                        <div>
                            <img
                                className="carousel_carouse"
                                src="https://i.ibb.co/1nbJY8T/dp.png"
                                alt="corosal4"
                                style={{
                                    ...contentStyle,
                                    height: "669px",
                                    width: "1320px",
                                }}
                            />
                        </div>
                    </Carousel>
                </div>
                <div className="home_page_category_name_container">
                    <h2>Our Category</h2>
                </div>
                <div className="home_page_our_category_section1">
                    <div className="home_page_category_card1" onClick={()=> navigate("/packages/Wedding")} >
                        <h3>Weddings</h3>
                    </div>
                    <div className="home_page_category_card2" onClick={()=> navigate("/packages/Birthday")}>
                        <h3>Birthdays</h3>
                    </div>
                    <div className="home_page_category_card3" onClick={()=> navigate("/packages/GetToGether")}>
                        <h3>Get Together</h3>
                    </div>
                </div>
                <div className="home_page_category_section2">
                    <div className="home_page_category_card4" onClick={()=> navigate("/packages/Farewell")}>
                        <h3>Farewell</h3>
                    </div>
                    <div className="home_page_category_card5" onClick={()=> navigate("/packages/brideToBe")}>
                        <h3>Bride To Be</h3>
                    </div>
                    <div className="home_page_category_card6" onClick={()=> navigate("/packages/Anniversary")}>
                        <h3>Anniversary</h3>
                    </div>
                </div>
                <div className="home_page_square_section_container">
                    <div>
                        <img
                            className="home_page_image_section1"
                            src="https://i.ibb.co/CzhCSGm/image-3.png"
                            alt="images"
                        />
                    </div>
                    <div className="home_page_square_text_section">
                        <h1>Make The Moment</h1>
                        <h3>Make your dream event with your own preferences</h3>
                        <div className="home_page_square_section_btn">
                            <Button
                                className="home_page_get_start_btn"
                                type="submit"
                                onClick={() => navigate("/packages")}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="home_page_follow_text_section">
                    <h1>Follow us</h1>
                    <h3>
                        Don't miss out on our updates - Stay in the loop with
                        all our latest news and updates by following us on
                        social media!
                    </h3>
                </div>
                <div className="social_media_icon_section">
                    <div className="social_media_icon1">
                        <img
                            src={ig}
                            alt="instergram"
                        />
                    </div>
                    <div className="social_media_icon2">
                        <img
                            src={yt}
                            alt="youtube"
                        />
                    </div>
                    <div className="social_media_icon3">
                        <img
                            src={fb}
                            alt="facebook"
                        />
                    </div>
                    <div className="social_media_icon4">
                        <img
                            src={li}
                            alt="linkedin"
                        />
                    </div>
                </div>
                <div className="home_page_trending_package_section">
                    <div className="home_page_trending_pack_txt">
                        <div className="home_page_trending_txt1">
                            <div className="home_page_tr_pc_container">
                                <h2>Trending&nbsp;</h2>
                                <h3>Packages</h3>
                            </div>
                            <div className="home_page_ancer_tag_css">
                                <Link to="/packages" style={{ textDecoration: 'none' }}><h4>See All</h4></Link>
                            </div>
                        </div>
                    </div>
                    <div className="home_page_package_section_container">
                        <div>
                            <Card
                                className="home_page_package_card1"
                                style={{
                                    width: 300,
                                    cursor: "pointer",
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://i.ibb.co/w4G6mNb/card-image.png"
                                    />
                                }
                            >
                                <div className="home_page_package_txt_section">
                                    <h1>Birthday Parties</h1>
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Card
                                className="home_page_package_card2"
                                style={{
                                    width: 300,
                                    cursor: "pointer",
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://i.ibb.co/wYVzBTm/card-image1.png"
                                    />
                                }
                            >
                                <div className="home_page_package_txt_section">
                                    <h1>Weddings</h1>
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Card
                                className="home_page_package_card3"
                                style={{
                                    width: 300,
                                    cursor: "pointer",
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://i.ibb.co/P1Z78fj/card-image2.png"
                                    />
                                }
                            >
                                <div className="home_page_package_txt_section">
                                    <h1>Weddings</h1>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="home_page_our_blog_card_section">
                        <div className="home_page_our_blog_txt">
                            <div className="home_page_our_blog_txt1">
                                <div className="home_page_our_blog_container">
                                    <h2>Our&nbsp;</h2>
                                    <h3>Blog</h3>
                                </div>
                                <div
                                    className="home_page_blog_ancer_tag_css"
                                >
                                    <Link to="/blog" style={{ textDecoration: 'none' }}><h4>See All</h4></Link>
                                </div>
                            </div>
                            <div className="home_page_our_blog_section_cards1">
                                <Card
                                    className="home_page_our_blog_card1"
                                    style={{
                                        width: 300,
                                        cursor: "pointer",
                                    }}
                                    cover={
                                        <img
                                            style={{
                                                padding: "10px",
                                            }}
                                            alt="example"
                                            src="https://i.ibb.co/NLssnJH/image3.png"
                                        />
                                    }
                                >
                                    <div className="home_page_blog_card_txt">
                                        <h2>Weddings Blog</h2>
                                        <h1>• 20 Feb 2024</h1>
                                    </div>
                                </Card>
                                <div>
                                    <Card
                                        className="home_page_our_blog_card2"
                                        style={{
                                            width: 300,
                                            cursor: "pointer",
                                        }}
                                        cover={
                                            <img
                                                style={{
                                                    padding: "10px",
                                                }}
                                                alt="example"
                                                src="https://i.ibb.co/vm9pLZV/unsplash-qf-WMUXDc-N18.png"
                                            />
                                        }
                                    >
                                        <div className="home_page_blog_card_txt">
                                            <h2>Bride TO Be Party Blog</h2>
                                            <h1>• 14 Jan 2024</h1>
                                        </div>
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        className="home_page_our_blog_card3"
                                        style={{
                                            width: 300,
                                            cursor: "pointer",
                                        }}
                                        cover={
                                            <img
                                                style={{
                                                    padding: "10px",
                                                }}
                                                alt="example"
                                                src="https://i.ibb.co/7YGbL1W/18.png"
                                            />
                                        }
                                    >
                                        <div className="home_page_blog_card_txt">
                                            <h2>Birthday Blog</h2>
                                            <h1>• 15 Feb 2024</h1>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="home_page_our_blog_section_cards2">
                                <div>
                                    <Card
                                        className="home_page_our_blog_card4"
                                        style={{
                                            width: 300,
                                            cursor: "pointer",
                                        }}
                                        cover={
                                            <img
                                                style={{
                                                    padding: "10px",
                                                }}
                                                alt="example"
                                                src="https://i.ibb.co/c2p57HV/22.png"
                                            />
                                        }
                                    >
                                        <div className="home_page_blog_card_txt">
                                            <h2>Weddings Blog</h2>
                                            <h1>• 20 Feb 2024</h1>
                                        </div>
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        className="home_page_our_blog_card5"
                                        style={{
                                            width: 300,
                                            cursor: "pointer",
                                        }}
                                        cover={
                                            <img
                                                style={{
                                                    padding: "10px",
                                                }}
                                                alt="example"
                                                src="https://i.ibb.co/M7dt431/12.png"
                                            />
                                        }
                                    >
                                        <div className="home_page_blog_card_txt">
                                            <h2>Bride TO Be Party Blog</h2>
                                            <h1>• 14 Jan 2024</h1>
                                        </div>
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        className="home_page_our_blog_card6"
                                        style={{
                                            width: 300,
                                            cursor: "pointer",
                                        }}
                                        cover={
                                            <img
                                                style={{
                                                    padding: "10px",
                                                }}
                                                alt="example"
                                                src="https://i.ibb.co/fdTYnzg/44.png"
                                            />
                                        }
                                    >
                                        <div className="home_page_blog_card_txt">
                                            <h2>Birthday Blog</h2>
                                            <h1>• 15 Feb 2024</h1>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
