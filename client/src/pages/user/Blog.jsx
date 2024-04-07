import React from "react";
import { topImage } from "../../assets";
import { Navbar } from "../../components";
import { Card,Pagination } from "antd";
import{Footer} from "../../components"
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";

function Blog() {
    const { Meta } = Card;

    return (
        <div className="blog_hero_section_container">
            <Navbar />
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
                                wedding, and every love is celebrated. Whether
                                you are a soon-to-be-wed, newlywed, wedding
                                party member, or guest, we are so excited to be
                                on this journey with you.
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
                                                occasion, a day to reflect on
                                                the incredible journey she's
                                                embarked upon and a time to
                                                convey…
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
                                                Get-Together. Cheers to shared
                                                moments, laughter, and the
                                                beauty of being together!
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
                            <div className="blog_page_blog4_main"></div>
                            <div className="blog_page_blog4_date">
                                <h2>• 13 Mar 2023</h2>
                            </div>
                            <div className="blog_page_blog4_tit">
                                <h2>Wedding Blog</h2>
                            </div>
                            <div className="blog_page_blog4_dis">
                                <h2>
                                    Welcome to our wedding wonderland! Whether
                                    you're a soon-to-be-wed couple, a newlywed,
                                    part of the wedding party, or an excited
                                    guest, every love story is a star here.
                                    Let's celebrate the magic of your journey
                                    together!
                                </h2>
                            </div>
                        </div>
                        <div className="all_blog__section_blog5">
                            <div className="blog_page_blog5_main"></div>
                            <div className="blog_page_blog5_date">
                                <h2>• 16 Mar 2023</h2>
                            </div>
                            <div className="blog_page_blog5_tit">
                                <h2>Farewell Party Blog</h2>
                            </div>
                            <div className="blog_page_blog5_dis">
                                <h2>
                                    Saying goodbye to our incredible leader,
                                    Jone. Gratitude, memories, and best wishes
                                    for the next chapter!
                                </h2>
                            </div>
                        </div>
                        <div className="all_blog__section_blog6">
                            <div className="blog_page_blog6_main"></div>
                            <div className="blog_page_blog6_date">
                                <h2>• 26 Mar 2023</h2>
                            </div>
                            <div className="blog_page_blog6_tit">
                                <h2>Bride to be Party Blog</h2>
                            </div>
                            <div className="blog_page_blog6_dis">
                                <h2>
                                    To the radiant bride-to-be: Wishing you a
                                    lifetime of love, laughter, and beautiful
                                    moments ahead. Congratulations on your
                                    journey to forever!
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="all_blog_main_component2">
                        <div className="all_blog__section_blog7">
                            <div className="blog_page_blog7_main"></div>
                            <div className="blog_page_blog7_date">
                                <h2>2 April 2023</h2>
                            </div>
                            <div className="blog_page_blog7_tit">
                                <h2>25 th Birthday Blog</h2>
                            </div>
                            <div className="blog_page_blog7_dis">
                                <h2>
                                    Birthdays are those annual milestones that
                                    deserve to be celebrated in style. Whether
                                    you're turning a fabulous forty or a sweet
                                    sixteen, one thing remains…
                                </h2>
                            </div>
                        </div>
                        <div className="all_blog__section_blog8">
                            <div className="blog_page_blog8_main"></div>
                            <div className="blog_page_blog8_date">
                                <h2>• 10 Apri 2023</h2>
                            </div>
                            <div className="blog_page_blog8_tit">
                                <h2>Anniversary party Blog</h2>
                            </div>
                            <div className="blog_page_blog8_dis">
                                <h2>
                                    Celebrating the magic of love on this
                                    special anniversary! May your journey
                                    continue to be filled with joy, laughter,
                                    and countless shared dreams. Here's to the
                                    love that grows stronger with each passing
                                    year. Happy Anniversary!
                                </h2>
                            </div>
                        </div>
                        <div className="all_blog__section_blog9">
                            <div className="blog_page_blog9_main"></div>
                            <div className="blog_page_blog9_date">
                                <h2>• 12 April 2023</h2>
                            </div>
                            <div className="blog_page_blog9_tit">
                                <h2>Birthday Blog</h2>
                            </div>
                            <div className="blog_page_blog9_dis">
                                <h2>
                                    Birthdays are a time of joy and laughter, so
                                    it’s only fitting that these funny birthday
                                    wishes should be the proverbial cherry on
                                    top of…
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blog_page_Pagination_section">
            <Pagination defaultCurrent={1} total={50} />
            </div>
            <Footer/>
        </div>
    );
}

export default Blog;
