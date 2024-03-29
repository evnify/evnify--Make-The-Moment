import React from "react";
import{topImage}from "../../assets"


function Blog() {
    return <div className="blog_hero_section_container">
    <div className="blog_hero_section_image_bg_container">
        <div className="blog_section_image_top_bg_color_container">
            <img src={topImage} alt="topImage" className="blog_section_image_top_container"/>
        </div>
    </div>

    <div>
        <div className="blog_section_Recent_blog_posts_txt">
            <h3>Recent blog posts</h3>
        </div>
            <div className="blog_section_resent_blog_one">

            </div>
    </div>
    </div>;
}

export default Blog;
