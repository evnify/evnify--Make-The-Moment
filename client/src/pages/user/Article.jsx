import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Navbar } from "../../components";
import axios from "axios";
import { Button, Input, Radio } from "antd";
import { useParams } from "react-router-dom";
import {
    HeartOutlined,
    HeartFilled,
    FireOutlined,
    FireFilled,
} from "@ant-design/icons";
import { Divider, Flex, Tag } from "antd";

function Article() {
    const [likes, setLikes] = useState(0); // Initialize likes state
    const params = useParams();
    const [place, setPlace] = useState({});
    const [image, setImage] = useState("");
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const { TextArea } = Input;
    const [size, setSize] = useState("large"); // default is 'middle'

    useEffect(() => {
        // Fetch likes for the article from an API or other source
        // For now, setting a dummy value
        setLikes(10); // Set initial likes count
    }, []); // Run once on component mount

    const handleLikeButtonClick = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {
            window.location.href = "/login";
            return;
        }

        try {
            const userId = user._id;
            if (liked) {
                await axios.post("/api/places/unlike", {
                    placeId: params.placeid,
                    userId,
                    userId,
                });
                setPlace((prevPlace) => ({
                    ...prevPlace,
                    likes: Math.max(prevPlace.likes - 1, 0),
                }));
                setLikes((prevLikes) => Math.max(prevLikes - 1, 0)); // Update likes count
            } else {
                await axios.post("/api/places/like", {
                    placeId: userId,
                });
                setPlace((prevPlace) => ({
                    ...prevPlace,
                    likes: prevPlace.likes + 1,
                }));
                setLikes((prevLikes) => prevLikes + 1); // Update likes count
            }
            setLiked((prevLiked) => !prevLiked);
        } catch (error) {
            console.error("Error liking/unliking place:", error);
        }
    };
    const likedColor = "#e4264e";

    return (
        <div className="article_top_section_container">
            <Navbar />
            {/* article name section */}
            <div className="article_top_name_section_container">
                <h1>Wedding Blog</h1>
                <h2>
                    Welcome to Brides, where every couple, every wedding, and
                    every love is celebrated. Whether you are a soon-to-be-wed,
                    newlywed, wedding party member, or guest, we are so excited
                    to be on this journey with you.
                </h2>
            </div>
            {/* image view here */}
            <div className="article_images_background_container">
                <div className="article_date_section_container">
                    <div>
                        <Button
                            className="like_button_container"
                            icon={
                                liked ? (
                                    <HeartFilled className="liked-heart" />
                                ) : (
                                    <HeartOutlined />
                                )
                            }
                            onClick={() => handleLikeButtonClick()}
                        >
                            <span
                                style={{
                                    color: liked ? likedColor : "inherit",
                                }}
                            >
                                {likes} Likes
                            </span>
                        </Button>
                        <button className="article_share_btn">
                            <Icon
                                icon="majesticons:share"
                                width="48"
                                height="48"
                            />
                        </button>
                    </div>
                    <div className="article_date_name_section">
                        <h3> • 20 Jan 2023 </h3>
                        <h2> Wedding Blog </h2>
                    </div>
                </div>
                <div className="admin_blog_view_image_view_patten">
                    <div className="frameDiv">
                        <div className="group">
                            <img
                                className="icon1"
                                alt=""
                                src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA04848.jpg`}
                            />
                            <img
                                className="icon2"
                                alt=""
                                src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/IMG_1925.jpg`}
                            />
                            <img
                                className="icon3"
                                alt=""
                                src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA04922-1.jpg`}
                            />
                        </div>
                        <img
                            className="icon4"
                            alt=""
                            src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA04989.jpg`}
                        />
                        <img
                            className="icon5"
                            alt=""
                            src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA04954.jpg`}
                        />
                        <img
                            className="icon6"
                            alt=""
                            src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA05270.jpg`}
                        />
                        <img
                            className="icon7"
                            alt=""
                            src={`https://www.prabathkanishkaphotography.com/wp-content/uploads/2020/11/PRA05248.jpg`}
                        />
                    </div>
                </div>
            </div>
            <div className="article_description_section_container">
                <div className="article_description_view_section_container">
                    <h2>
                        In the world of wedding planning, there's an intricate
                        dance of coordination, creativity, and attention to
                        detail. As we embark on this journey to create the
                        perfect celebration of love, our team has been hard at
                        work behind the scenes, ensuring every aspect of the day
                        reflects the beauty and joy of the occasion. From
                        organizing logistics to capturing the moments that will
                        last a lifetime, join us on this adventure as we delve
                        into the artistry of wedding planning, photography, and
                        the quest for the finest quality inventory. The
                        foundation of any memorable wedding lies in the
                        meticulous planning and execution of every detail. Our
                        team, comprised of dedicated professionals with a
                        passion for creating unforgettable experiences, has been
                        working tirelessly to bring our vision to life. From
                        selecting the perfect venue to curating a menu that
                        tantalizes the taste buds, every decision has been made
                        with care and consideration. At the heart of our
                        operation is a commitment to organization and
                        efficiency. With countless moving parts to manage, we've
                        employed a systematic approach to ensure nothing falls
                        through the cracks. Our team members, each bringing
                        their unique skills and expertise to the table, work in
                        harmony to orchestrate a seamless event from start to
                        finish. From crafting timelines to coordinating vendors,
                        every aspect of the wedding has been meticulously
                        planned to perfection. One of the most cherished aspects
                        of any wedding is photography – the art of capturing
                        fleeting moments and transforming them into timeless
                        memories. Our photographers, with their keen eye for
                        detail and creative vision, have been instrumental in
                        immortalizing the essence of our love story. From candid
                        shots to posed portraits, they've effortlessly captured
                        the raw emotion and joy that permeates every corner of
                        our celebration. Behind the lens, our photographers
                        operate with a blend of technical expertise and artistic
                        flair, ensuring each photograph is a work of art in its
                        own right. Their ability to anticipate moments before
                        they unfold and their knack for finding the perfect
                        angle ensures that no memory goes undocumented. As we
                        look back on our wedding day through the lens of their
                        cameras, we're reminded of the love and laughter that
                        filled the air, immortalized in every frame. In addition
                        to impeccable planning and photography, the quality of
                        the inventory plays a pivotal role in shaping the
                        ambiance and overall experience of the wedding. From
                        elegant table settings to luxurious linens, every item
                        has been carefully selected to enhance the aesthetic
                        appeal and elevate the guest experience. Our commitment
                        to quality extends to every aspect of the event,
                        ensuring that every detail reflects the sophistication
                        and refinement befitting such a momentous occasion. As
                        our wedding day draws near, we're filled with excitement
                        and anticipation for the celebration that awaits. Behind
                        the scenes, our team continues to work tirelessly,
                        ensuring that every element is in place for a flawless
                        event. From meticulous planning to the artistry of
                        photography and the quest for the finest quality
                        inventory, every aspect of our wedding reflects our
                        dedication to creating an unforgettable experience for
                        ourselves and our loved ones. As we embark on this
                        journey together, we're reminded that love is not just
                        about the destination but the beautiful moments we share
                        along the way.
                    </h2>
                </div>
                <div className="article_view_page_tags_section">
                    <Flex gap="4px 0" wrap="wrap">
                        <Tag color="success">success</Tag>
                        <Tag color="processing">processing</Tag>
                        <Tag color="error">error</Tag>
                        <Tag color="warning">warning</Tag>
                        <Tag color="default">default</Tag>
                    </Flex>
                </div>
            </div>
            <div className="article_comment_section_container">
                <div className="article_comment_section_input">
                    <h3>Comments</h3>
                    <br />
                    <div className="article_comment_section">
                        <TextArea className="article_comment_add_section"
                            rows={4}
                            placeholder="Comment here"
                            maxLength={1000}
                            style={{ width: 400, height: 100 }}
                        />
                        <div className="article_save_btn_section">
                            <Button
                                type="link"
                                className="article_comment_send_btn"
                            >
                                <Icon
                                    icon="fluent:send-24-filled"
                                    width="28"
                                    height="28"
                                />
                            </Button>
                        </div>
                    </div>
                    <div>
                        Comments
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
