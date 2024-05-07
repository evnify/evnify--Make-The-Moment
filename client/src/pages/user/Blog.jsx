import React, { useEffect, useState } from "react";
import { topImage } from "../../assets";
import { Navbar } from "../../components";
import { Card, Pagination } from "antd";
import axios from "axios";
import { Footer } from "../../components";
import { Link } from "react-router-dom";

function Blog() {
    const { Meta } = Card;
    const [blogs, setBlogs] = useState([]);
    const [itemsForCurrentPage, setItemsForCurrentPage] = useState([]);
    const [currentPagination, setCurrentPagination] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/blogs/getBlogs");
                setBlogs(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const startIndex = (currentPagination - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setItemsForCurrentPage(blogs.slice(startIndex, endIndex));
    }, [currentPagination, blogs]);

    const onPaginationChange = (page) => {
        setCurrentPagination(page);
    };

    return (
        <div className="blog_hero_section_container">
            <Navbar />
            {itemsForCurrentPage.length > 0 && (
                <>
                    <div className="blog_main_section_container center">
                        <div className="blog_image_main_section">
                            <img src={topImage} alt="topImage" />
                        </div>
                    </div>
                    <div className="blog_section_recent_txt">
                        <h1>Recent blog posts</h1>
                    </div>
                    <div className="center">
                        <div className="blog_page_main_recent_blog ">
                            <div className="blog_page_first_blog">
                                <Link
                                    to={`/article/${
                                        blogs.length > 0 &&
                                        blogs[blogs.length - 1]._id
                                    }`}
                                >
                                    <div
                                        className="blog_page_blog1"
                                        style={{
                                            backgroundImage: `url(${
                                                blogs.length > 0 &&
                                                blogs[blogs.length - 1]
                                                    .images[0]
                                            })`,
                                        }}
                                    ></div>
                                </Link>
                                <div className="blog_page_blog1_txt">
                                    <h2>
                                        •{" "}
                                        {blogs.length > 0 &&
                                            blogs[blogs.length - 1].eventDate}
                                    </h2>
                                </div>
                                <div className="blog_page_blog1_txt_tit">
                                    <h2>
                                        {blogs.length > 0 &&
                                            blogs[blogs.length - 1].blogTitle}
                                    </h2>
                                </div>
                                <div className="blog_page_blog1_txt_dis">
                                    <h2>
                                        {blogs.length > 0 &&
                                            blogs[
                                                blogs.length - 1
                                            ].blogTitleDescription.substring(
                                                0,
                                                290
                                            )}
                                    </h2>
                                </div>
                            </div>
                            <div className="blog_page_second_blogs">
                                <div className="blog_page_blog2_main">
                                    <div className="blog_section_colo_section">
                                        <Link
                                            to={`/article/${
                                                blogs.length > 0 &&
                                                blogs[blogs.length - 2]._id
                                            }`}
                                        >
                                            <div
                                                className="blog_page_blog2"
                                                style={{
                                                    backgroundImage: `url(${
                                                        blogs.length > 0 &&
                                                        blogs[blogs.length - 2]
                                                            .images[0]
                                                    })`,
                                                }}
                                            ></div>
                                        </Link>
                                        <div className="blog_section_blog_section2">
                                            <div className="blog_page_blog2_txt_txt">
                                                <h2>
                                                    •{" "}
                                                    {blogs.length > 0 &&
                                                        blogs[blogs.length - 2]
                                                            .eventDate}
                                                </h2>
                                            </div>
                                            <div className="blog_page_blog2_txt_tit">
                                                <h2>
                                                    {blogs.length > 0 &&
                                                        blogs[blogs.length - 2]
                                                            .blogTitle}
                                                </h2>
                                            </div>
                                            <div className="blog_page_blog2_txt_dis_area">
                                                <div className="blog_page_blog2_txt_dis">
                                                    <h2 style={{ width: 270 }}>
                                                        {blogs.length > 0 &&
                                                            blogs[
                                                                blogs.length - 2
                                                            ].blogTitleDescription.substring(
                                                                0,
                                                                110
                                                            )}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog_page_blog3_main">
                                    <div className="blog_section_colo_section">
                                        <Link
                                            to={`/article/${
                                                blogs.length > 0 &&
                                                blogs[blogs.length - 3]._id
                                            }`}
                                        >
                                            <div
                                                className="blog_page_blog3"
                                                style={{
                                                    backgroundImage: `url(${
                                                        blogs.length > 0 &&
                                                        blogs[blogs.length - 3]
                                                            .images[0]
                                                    })`,
                                                }}
                                            ></div>
                                        </Link>
                                        <div className="blog_section_blog2_section">
                                            <div className="blog_page_blog3_txt_txt">
                                                <h2>
                                                    •{" "}
                                                    {blogs.length > 0 &&
                                                        blogs[blogs.length - 3]
                                                            .eventDate}
                                                </h2>
                                            </div>
                                            <div className="blog_page_blog3_txt_tit">
                                                <h2>
                                                    {blogs.length > 0 &&
                                                        blogs[blogs.length - 3]
                                                            .blogTitle}
                                                </h2>
                                            </div>
                                            <div className="blog_page_blog3_txt_dis_area">
                                                <div className="blog_page_blog3_txt_dis">
                                                    <h2>
                                                        {blogs.length > 0 &&
                                                            blogs[
                                                                blogs.length - 3
                                                            ].blogTitleDescription.substring(
                                                                0,
                                                                200
                                                            )}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog_page_all_blog_container">
                        <h2>All blog posts</h2>
                    </div>
                    <div className="center">
                        <div className="blog_page_all_blog_main_section">
                            {/* Map and render all blog sections here */}
                            {itemsForCurrentPage.map((item, index) => (
                                <div
                                    className="all_blog_main_component"
                                    key={index}
                                >
                                    <div className={`all_blog__section_blog`}>
                                        <Link to={`/article/${item._id}`}>
                                            <div
                                                className={`blog_page_blog${
                                                    index + 4
                                                }_main`}
                                                style={{
                                                    backgroundImage: `url(${item.images[0]})`,
                                                }}
                                            ></div>
                                        </Link>
                                        <div
                                            className={`blog_page_blog${
                                                index + 4
                                            }_date`}
                                        >
                                            <h2>• {item.eventDate}</h2>
                                        </div>
                                        <div
                                            className={`blog_page_blog${
                                                index + 4
                                            }_tit`}
                                        >
                                            <h2>{item.blogTitle}</h2>
                                        </div>
                                        <div
                                            className={`blog_page_blog${
                                                index + 4
                                            }_dis`}
                                        >
                                            <h2>{item.blogTitleDescription}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="blog_page_Pagination_section">
                        <Pagination
                            current={currentPagination}
                            pageSize={itemsPerPage}
                            total={blogs.length}
                            onChange={onPaginationChange}
                        />
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
}

export default Blog;
