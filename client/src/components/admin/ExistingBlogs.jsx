import React, { useState } from "react";
import { Radio, Space, Table, Tag } from "antd";
import { Icon } from "@iconify/react";


const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
            <span>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Icon icon="material-symbols:delete-outline" />
                <Icon icon="tabler:edit" />
                <Icon icon="mdi:eye-outline" />
            </Space>
        ),
    },
];
const data = [
    {
        key: "1",
        name: "John Brown",
        category: 32,
        date: "2023.12.12",
        tags: ["developer"],
        description: "Welcome to Brides, where every couple, every wedding, and every love is celebrated. ",
    },
    {
        key: "2",
        name: "Jim Green",
        category: 42,
        date: "2023.12.12",
        tags: ["loser"],
        description: "Every year, your daughter's birthday is a momentous occasion, a day to reflect on the incredible journey ",
    },
    {
        key: "3",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "Experience the joy of togetherness on our Get-Together.",
    },
    {
        key: "4",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "Welcome to our wedding wonderland! Whether you're a soon-to-be-wed couple, ",
    },
    {
        key: "5",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "Saying goodbye to our incredible leader, Jone. Gratitude, memories, and best ",
    },
    {
        key: "6",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "To the radiant bride-to-be: Wishing you a lifetime of love, laughter, and beautiful moments ahead. ",
    },
    {
        key: "7",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "TBirthdays are those annual milestones that deserve to be celebrated in style.",
    },
    {
        key: "8",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "To the radiant bride-to-be: Wishing you a lifetime of love, laughter, and beautiful moments ahead. ",
    },
    {
        key: "9",
        name: "Joe Black",
        category: 32,
        date: "2023.12.12",
        tags: ["cool"],
        description: "To the radiant bride-to-be: Wishing you a lifetime of love, laughter, and beautiful moments ahead. ",
    },
];

function ExistingBlogs() {
    const [top, setTop] = useState("topLeft");
    const [bottom, setBottom] = useState("bottomCenter");
    return (
        <div>
            <div className="admin_existing_blog_counts_containers">
                <div className="admin_existing_blog_total_blog_container1">
                    <div className="admin_existing_blog_total_card1">
                        <div className="admin_existing_blog_card1_txt">
                            <h3>Total Blogs</h3>
                            <h2>20</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container2">
                    <div className="admin_existing_blog_total_card2">
                        <div className="admin_existing_blog_card2_txt">
                            <h3>Like Count</h3>
                            <h2>100</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container3">
                    <div className="admin_existing_blog_total_card3">
                        <div className="admin_existing_blog_card3_txt">
                            <h3>Comment Count</h3>
                            <h2>70</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container4">
                    <div className="admin_existing_blog_total_card4">
                        <div className="admin_existing_blog_card4_txt">
                            <h3>Share Count</h3>
                            <h2>150</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin_existing_blog_table__view_back">
                <div className="admin_existing_blog_section_manage_blogs">
                    <h3>Manage Blogs</h3>
                </div>
                <div>
                    <Table
                        columns={columns}
                        pagination={{
                            position: [bottom],
                            top: "20px",
                            bottom: "20px",
                        }}
                        dataSource={data}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExistingBlogs;
