import React, { useEffect, useState } from "react";
import { topImage } from "../../assets";
import { Navbar } from "../../components";
import { Card, Pagination } from "antd";
import axios from "axios";
import { Footer } from "../../components";

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

    const onPagination = (page) => {
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
                            <div className="blog_page_blog1"></div>
                            <div className="blog_page_blog1_txt">
                                <h2>• 20 Jan 2023</h2>
                            </div>
                            <div className="blog_page_blog1_txt_tit">
                                <h2>Wedding blog</h2>
                            </div>
                            <div className="blog_page_blog1_txt_dis">
                                <h2>
                                    Welcome to Brides, where every couple, every
                                    wedding, and every love is celebrated.
                                    Whether you are a soon-to-be-wed, newlywed,
                                    wedding party member, or guest, we are so
                                    excited to be on this journey with you.
                                </h2>
                            </div>
                        </div>
                        <div className="blog_page_second_blogs">
                            <div className="blog_page_blog2_main">
                                <div className="blog_section_colo_section">
                                    <div className="blog_page_blog2"></div>
                                    <div className="blog_section_blog_section2">
                                        <div className="blog_page_blog2_txt_txt">
                                            <h2>• 15 Feb 2023</h2>
                                        </div>
                                        <div className="blog_page_blog2_txt_tit">
                                            <h2>21 st Birthday Blog</h2>
                                        </div>
                                        <div className="blog_page_blog2_txt_dis_area">
                                            <div className="blog_page_blog2_txt_dis">
                                                <h2>
                                                    Every year, your daughter's
                                                    birthday is a momentous
                                                    occasion, a day to reflect
                                                    on the incredible journey
                                                    she's embarked upon and a
                                                    time to convey…
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="blog_page_blog3_main">
                                <div className="blog_section_colo_section">
                                    <div className="blog_page_blog3"></div>
                                    <div className="blog_section_blog2_section">
                                        <div className="blog_page_blog3_txt_txt">
                                            <h2>• 26 Feb 2023</h2>
                                        </div>
                                        <div className="blog_page_blog3_txt_tit">
                                            <h2>Get-Together Blog</h2>
                                        </div>
                                        <div className="blog_page_blog3_txt_dis_area">
                                            <div className="blog_page_blog3_txt_dis">
                                                <h2>
                                                    Experience the joy of
                                                    togetherness on our
                                                    Get-Together. Cheers to
                                                    shared moments, laughter,
                                                    and the beauty of being
                                                    together!
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
                        <div className="all_blog_main_component">
                            <div className="all_blog__section_blog4">
                                <div className="blog_page_blog4_main" style={{backgroundImage: `url(${itemsForCurrentPage[0].images[0]})`}}></div>
                                <div className="blog_page_blog4_date">
                                    <h2>• {itemsForCurrentPage[0].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog4_tit">
                                    <h2>{itemsForCurrentPage[0].blogTitle}</h2>
                                </div>
                                <div className="blog_page_blog4_dis">
                                    <h2>
                                    {itemsForCurrentPage[0].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                            <div className="all_blog__section_blog5">
                            <div className="blog_page_blog5_main" style={{backgroundImage: `url(${itemsForCurrentPage[1].images[0]})`}}></div>
                                <div className="blog_page_blog5_date">
                                    <h2>• {itemsForCurrentPage[1].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog5_tit">
                                    <h2>{itemsForCurrentPage[1].blogTitle}</h2>
                                </div>
                                <div className="blog_page_blog5_dis">
                                    <h2>
                                    {itemsForCurrentPage[1].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                            <div className="all_blog__section_blog6">
                                <div className="blog_page_blog6_main" style={{backgroundImage: `url(${itemsForCurrentPage[2].images[0]})`}}></div>
                                <div className="blog_page_blog6_date">
                                    <h2>• {itemsForCurrentPage[2].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog6_tit">
                                    <h2>{itemsForCurrentPage[2].blogTitle}</h2>
                                </div>
                                <div className="blog_page_blog6_dis">
                                    <h2>
                                    {itemsForCurrentPage[2].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="all_blog_main_component2">
                            <div className="all_blog__section_blog7">
                                <div className="blog_page_blog7_main" style={{backgroundImage: `url(${itemsForCurrentPage[3].images[0]})`}}></div>
                                <div className="blog_page_blog7_date">
                                    <h2>• {itemsForCurrentPage[3].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog7_tit">
                                    <h2>{itemsForCurrentPage[3].blogTitle}</h2>
                                </div>
                                <div className="blog_page_blog7_dis">
                                    <h2>
                                    {itemsForCurrentPage[3].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                            <div className="all_blog__section_blog8">
                                <div className="blog_page_blog8_main" style={{backgroundImage: `url(${itemsForCurrentPage[4].images[0]})`}}></div>
                                <div className="blog_page_blog8_date">
                                    <h2>• {itemsForCurrentPage[4].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog8_tit">
                                    <h2>{itemsForCurrentPage[4].blogTitle}g</h2>
                                </div>
                                <div className="blog_page_blog8_dis">
                                    <h2>
                                    {itemsForCurrentPage[4].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                            <div className="all_blog__section_blog9">
                                <div className="blog_page_blog9_main" style={{backgroundImage: `url(${itemsForCurrentPage[5].images[0]})`}}></div>
                                <div className="blog_page_blog9_date">
                                    <h2>• {itemsForCurrentPage[5].eventDate}</h2>
                                </div>
                                <div className="blog_page_blog9_tit">
                                    <h2>{itemsForCurrentPage[5].blogTitle}</h2>
                                </div>
                                <div className="blog_page_blog9_dis">
                                    <h2>
                                    {itemsForCurrentPage[5].blogTitleDescription}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog_page_Pagination_section">
                    <Pagination
                        defaultCurrent={1}
                        current={currentPagination}
                        total={blogs.length}
                        onChange={onPagination}
                    />
                </div>
            </>

            )}
            <Footer />
        </div>
    );
}

export default Blog;
