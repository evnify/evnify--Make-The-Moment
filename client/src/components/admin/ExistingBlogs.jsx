import React, { useState, useEffect } from "react";
import {
    Radio,
    Space,
    Table,
    Tag,
    Modal,
    Input,
    Select,
    DatePicker,
    Upload,
    Button,
    message,
} from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";


const { TextArea } = Input;

const columns = [
    {
        title: "Name",
        dataIndex: "blogTitle",
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
        dataIndex: "eventDate",
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
        dataIndex: "blogTitleDescription",
        key: "description",
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <button className="admin_existing_blog_delete_btn">
                    {" "}
                    <Icon icon="material-symbols:delete-outline" />
                </button>
                <button className="admin_existing_blog_edit_btn">
                    <Icon icon="tabler:edit" />
                </button>
                <button className="admin_existing_blog_view_btn">
                    <Icon icon="mdi:eye-outline" />
                </button>
            </Space>
        ),
    },
];

function ExistingBlogs() {
    const [Blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/blogs/getBlogs");
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [top, setTop] = useState("topLeft");
    const [bottom, setBottom] = useState("bottomCenter");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="admin_existing_blog_counts_containers">
                <div className="admin_existing_blog_total_blog_container1">
                    <div className="admin_existing_blog_total_card1">
                        <div className="admin_existing_blog_card1_txt">
                            <h3>Total Blogs</h3>
                            <h2 onClick={showModal}> 20</h2>
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
                        dataSource={Blogs} // Here, using the Blogs state instead of the data array
                    />
                </div>
                <div>
                    <Modal
                        title={null}
                        width={1200}
                        height={700}
                        footer={null}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div>
                            <div className="admin_add_blog_section_one">
                                <div className="admin_add_blog_section_Add_Blogs_tit">
                                    <h3>Add Blogs</h3>
                                </div>
                                <div className="admin_add_blog_section_border">
                                    <div className="admin_add_blog_section_add_blog_from">
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Blog Title
                                        </h3>
                                        <Input
                                            placeholder="Title"
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Title Description
                                        </h3>
                                        <Input
                                            placeholder="Title Description"
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Category
                                        </h3>
                                        <Select
                                            defaultValue="Select"
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Date
                                        </h3>
                                        <DatePicker
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Tags
                                        </h3>
                                        <Space
                                            style={{
                                                width: "100%",
                                                bottom: "10px",
                                            }}
                                            direction="vertical"
                                        >
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: 350,
                                                    height: 40,
                                                }}
                                                placeholder="Please select"
                                                defaultValue={[]}
                                            />
                                        </Space>
                                    </div>
                                    <div className="admin_add_blog_section_image_add_border">
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Images
                                        </h3>
                                        <div className="admin_add_blog_section_image_add">
                                            <Upload listType="picture-card"></Upload>
                                            <Modal>
                                                <img
                                                    alt="example"
                                                    style={{ width: "100%" }}
                                                />
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="admin_add_blog_section_image_add_container">
                                <div className="admin_add_blog_section_add_blog_add_description">
                                    <h3 className="admin_add_blog_section_add_blog_title_name">
                                        Description
                                    </h3>
                                    <TextArea
                                        style={{
                                            width: 1000,
                                            height: 429,
                                            marginBottom: 20,
                                        }}
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="admin_add_blog_section_blog_add_btn">
                                    <Button
                                        style={{ width: 100, height: 35 }}
                                        type="primary"
                                        danger
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        style={{ width: 100, height: 35 }}
                                        type="primary"
                                        onClick={handleOk}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ExistingBlogs;
