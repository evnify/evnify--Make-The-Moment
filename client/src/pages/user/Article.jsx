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

    const { id } = useParams();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`/api/blogs/getBlogById/${id}`);
            setArticle(response.data);
            console.log(article);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBlogs();
        console.log(article.images);
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/blogs/getBlogById/${params.id}`);
                setArticle(response.data);
                setLikes(response.data.likes.length);
                const user = JSON.parse(localStorage.getItem("currentUser"));
                if (user && response.data.likes.includes(user.userID)) {
                    setLiked(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchArticle();
    }, [params.id]);


    const handleLikeButtonClick = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        console.log("user",user)
        if (!user) {
            window.location.href = "/login";
            return;
        }

        try {
            const updatedLikes = liked ? likes - 1 : likes + 1;
            setLiked(!liked);
            setLikes(updatedLikes);
            const response = await axios.post("/api/blogs/updateLikes", {
                articleId: article._id,
                userId: user.userID,
                liked: !liked,
            });
            console.log(response); // Log response if needed
        } catch (error) {
            console.error("Error liking/unliking article:", error);
        }
    };

    const likedColor = "#e4264e";

    return (
        <div className="article_top_section_container">
            <Navbar />
            {/* article name section */}
            <div className="article_top_name_section_container">
                <h1>{article.blogTitle}</h1>
                <h2>{article.blogTitleDescription}</h2>
            </div>
            {/* image view here */}
            <div className="article_images_background_container">
                <div className="article_date_section_container">
                    <div>
                        <Button
                            className="like_button_container"
                            icon={
                                liked ? (
                                    <HeartFilled className="liked-heart" style={{ color:"#e4264e"}}/>
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
                            {article.images && article.images[0] && (
                                <img
                                    className="icon1"
                                    alt=""
                                    src={article.images[0]}
                                />
                            )}
                            {article.images && article.images[1] && (
                                <img
                                    className="icon2"
                                    alt=""
                                    src={article.images[1]}
                                />
                            )}
                            {article.images && article.images[2] && (
                                <img
                                    className="icon3"
                                    alt=""
                                    src={article.images[2]}
                                />
                            )}
                        </div>
                        {article.images && article.images[3] && (
                            <img
                                className="icon4"
                                alt=""
                                src={article.images[3]}
                            />
                        )}
                        {article.images && article.images[4] && (
                            <img
                                className="icon5"
                                alt=""
                                src={article.images[4]}
                            />
                        )}
                        {article.images && article.images[5] && (
                            <img
                                className="icon6"
                                alt=""
                                src={article.images[5]}
                            />
                        )}
                        {article.images && article.images[6] && (
                            <img
                                className="icon7"
                                alt=""
                                src={article.images[6]}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="article_description_section_container">
                <div className="article_description_view_section_container">
                    <h2>{article.description}</h2>
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
                        <TextArea
                            className="article_comment_add_section"
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
                    <div>Comments</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Article;
