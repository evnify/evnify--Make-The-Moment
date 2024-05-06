import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Navbar, Footer } from "../../components";
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
    const [likes, setLikes] = useState(0); 
    const params = useParams();
    const [place, setPlace] = useState({});
    const [image, setImage] = useState("");
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [article, setArticle] = useState({}); 
    const { TextArea } = Input;
    const [size, setSize] = useState("large");

    const {id} = useParams();

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/blogs/getBlogById/${id}`);
                setArticle(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        useEffect(() => {  
            fetchBlogs();
        }, []);

    useEffect(() => {
        
        setLikes(10);
    }, []); 

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
                <h1>{article.blogTitle}</h1>
                <h2>
                {article.blogTitleDescription}
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
                        <h3> • {article.eventDate} </h3>
                        <h2> {article.category} </h2>
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
                    {article.description}
                    </h2>
                </div>
                <div className="article_view_page_tags_section">
                {article.tags &&
                            article.tags.map((tag, index) => (
                                <Tag color="success" key={index}>
                                    {tag}
                                </Tag>
                            ))}
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
            <Footer />
        </div>
    );
}

export default Article;
