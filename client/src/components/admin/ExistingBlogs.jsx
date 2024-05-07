import React, { useState, useEffect } from "react";
import moment from "moment";
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
import { PlusOutlined, ExclamationCircleFilled, PrinterOutlined } from "@ant-design/icons";
import axios, { all } from "axios";
import {useNavigate} from 'react-router-dom';
const { Search, TextArea } = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function ExistingBlogs() {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [Blogs, setBlogs] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        fetchBlogs();
        calculateCounts();
    }, [Blogs]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/blogs/getBlogs");
            setBlogs(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const [response, setResponse] = useState([]);

    const [top, setTop] = useState("topLeft");
    const [bottom, setBottom] = useState("bottomCenter");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModelRecord, setEditModelRecord] = useState();

    const [editBlogTitle, setEditBlogTitle] = useState("");
    const [editBlogTitleDescription, setEditBlogTitleDescription] =
        useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editEventDate, setEditEventDate] = useState("");
    const [editTags, setEditTags] = useState([]);
    const [editDescription, setEditDescription] = useState("");
    const [editImages, setEditImages] = useState([]);
    const [blogId, setBlogId] = useState("");

    const showModal = (record) => {
        setIsModalOpen(true);
        setEditModelRecord(record);
        setEditBlogTitle(record.blogTitle);
        setEditBlogTitleDescription(record.blogTitleDescription);
        setEditCategory(record.category);
        setEditEventDate(record.eventDate);
        setEditTags(record.tags);
        setEditDescription(record.description);
        setBlogId(record._id);

        for (let i = 0; i < record.images.length; i++) {
            const temp = {
                uid: i,
                name: "image.png",
                status: "done",
                url: record.images[i],
            };
            setEditImages([...editImages, temp]);
        }

        setFileList(editImages);
        setImages(record.images);
    };

    const EditBlogs = async () => {
        const blogData = {
            _id: blogId,
            blogTitle: editBlogTitle,
            blogTitleDescription: editBlogTitleDescription,
            category: editCategory,
            eventDate: editEventDate,
            tags: editTags,
            description: editDescription,

            images: images,
        };
        try {
            await axios.post(`/api/blogs/updateBlog`, blogData);
            message.success("Blog updated successfully");
            fetchBlogs();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancel1 = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };
    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList ?? []);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append("image", file);
        axios
            .post(
                "https://api.imgbb.com/1/upload?key=700c61f2bf87cf203338efe206d7e66f",
                formData
            )
            .then((response) => {
                if (response.data.data) {
                    onSuccess();
                    message.success("Image uploaded successfully");
                    setImages([...images, response.data.data.url]);
                    setLoading(false);
                } else {
                    onError();
                    message.error("Failed to upload image");
                }
            })
            .catch((error) => {
                onError();
                message.error("Error uploading image: " + error.message);
            });
    };
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
            title: "Title Description",
            dataIndex: "blogTitleDescription",
            key: "description",
            render: (text) => (
                <p
                    style={{
                        width: "250px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {text.length > 25 ? `${text.substring(0, 25)}...` : text}
                </p>
            ),
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <button
                        style={{
                            fontSize: "20px",
                            color: "#757171",
                            border: "none",
                            background: "transparent",
                        }}
                        onClick={() => showDeleteConform(record._id)}
                    >
                        <Icon icon="material-symbols:delete-outline" />
                    </button>
                    <button
                        className="admin_existing_blog_edit_btn"
                        onClick={() => showModal(record)}
                    >
                        <Icon icon="tabler:edit" />
                    </button>
                    <button className="admin_existing_blog_view_btn"
                    onClick={() => navigate(`/article/${record._id}`)}
                    >
                        <Icon icon="mdi:eye-outline" />
                    </button>
                </Space>
            ),
        },
    ];

    const [searchKey, setSearchKey] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [filteredBlogList, setFilteredBlogList] = useState([]);

    useEffect(() => {
        let tempList = Blogs;
        console.log(tempList);

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.blogTitle &&
                    item.blogTitle
                        .toLowerCase()
                        .includes(searchKey.toLowerCase())
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter(
                (item) =>
                    item.category &&
                    item.category.toLowerCase() === selectedType.toLowerCase()
            );
        }

        setFilteredBlogList(tempList);

        console.log("filteredUserList", tempList);
        console.log("userList", Blogs);
        console.log("searchKey", searchKey);
        console.log("selectedType", selectedType);
    }, [searchKey, selectedType, Blogs]);

    const { confirm } = Modal;

    const handleDelete = async (id) => {
        try {
            await axios.post(`/api/blogs/deleteBlogById`, { id: id });
            message.success("Blog deleted successfully");
            fetchBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    const showDeleteConform = (id) => {
        confirm({
            centered: true,
            title: "Are you sure?",
            icon: <ExclamationCircleFilled />,
            content: "Please confirm that you want to delete this salary",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
    };

    const generateCSVData = () => {

        const headers = ['blogId','eventDate', 'blogTitle', 'blogTitleDescription', 'Category'];

        const rows = Blogs.map(blog => [
            blog._id,
            blog.eventDate,
            blog.blogTitle,
            blog.blogTitleDescription,
            blog.category,
        ]);

        const csvData = [headers, ...rows];
        const csvContent = csvData.map(row => row.join(',')).join('\n');

        return csvContent;
    };

    // Function to handle downloading CSV file
    const handleDownloadCSV = () => {
        const csvContent = generateCSVData();
        if (csvContent) {
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blogsList.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    const calculateCounts = () => {
        let totalLikes = 0;
        let totalComments = 0;
        Blogs.forEach(blog => {
            totalLikes += blog.likes.length;
            totalComments += blog.comments.length;
        });
        setLikeCount(totalLikes);
        setCommentCount(totalComments);
    };


    return (
        <div>
            <div className="admin_existing_blog_counts_containers">
                <div className="admin_existing_blog_total_blog_container1">
                    <div className="admin_existing_blog_total_card1">
                        <div className="admin_existing_blog_card1_txt">
                            <h3>Total Blogs</h3>
                            <h2> {Blogs.length}</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container2">
                    <div className="admin_existing_blog_total_card2">
                        <div className="admin_existing_blog_card2_txt">
                            <h3>Like Count</h3>
                            <h2>{likeCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container3">
                    <div className="admin_existing_blog_total_card3">
                        <div className="admin_existing_blog_card3_txt">
                            <h3>Comment Count</h3>
                            <h2>{commentCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_existing_blog_total_blog_container4">
                    <div className="admin_existing_blog_total_card4">
                        <div className="admin_existing_blog_card4_txt">
                            <h3>Share Count</h3>
                            <h2>5</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin_existing_blog_table__view_back">
                <div className="admin_existing_blog_section_manage_blogs">
                    <div className="admin_existing_blog_top_menu">
                        <div
                            style={{
                                marginRight: "auto",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <h5>All Blogs</h5>
                            <Search
                                placeholder="Search by Name"
                                size="large"
                                onSearch={(value) => setSearchKey(value)}
                                style={{
                                    width: 265,
                                    height: 40,
                                }}
                            />
                        </div>
                        <button
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#4094F7",
                                    width: "100px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    marginRight: "-400px",
                                }}
                                onClick={handleDownloadCSV}
                            >
                                <PrinterOutlined style={{ gap: "10" }} />
                                Export
                            </button>
                        <div
                            style={{
                                marginLeft: "auto",
                                alignItems: "center",
                            }}
                        >
                            <select
                                class="form-select admin_existing_blog_select_filter_section"
                                aria-label="Default select example"
                                value={selectedType}
                                onChange={(e) =>
                                    setSelectedType(e.target.value)
                                }
                            >
                                <option value="all">All</option>
                                <option value="farewell">Farewell</option>
                                <option value="bridetobe">Bride to Be</option>
                                <option value="gettogether">
                                    Get Together
                                </option>
                                <option value="anniversary">Aniversary</option>
                                <option value="birthday">Birthday</option>
                                <option value="wedding">Wedding</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <Table
                        columns={columns}
                        pagination={pagination}
                        onChange={handleTableChange}
                        dataSource={filteredBlogList}
                    />
                </div>
                <div>
                    <Modal
                        title={null}
                        width={1280}
                        height={700}
                        footer={null}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div>
                            <div className="admin_add_blog_section_one">
                                <div className="admin_add_blog_section_Add_Blog_title">
                                    <h3>Add Blog</h3>
                                </div>

                                <div className="admin_add_blog_section_border">
                                    <div className="admin_add_blog_section_add_blog_from">
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Blog Title
                                        </h3>
                                        <Input
                                            placeholder="Title"
                                            value={editBlogTitle}
                                            onChange={(e) =>
                                                setEditBlogTitle(e.target.value)
                                            }
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Title Description
                                        </h3>
                                        <Input
                                            placeholder="Title Description"
                                            value={editBlogTitleDescription}
                                            onChange={(e) =>
                                                setEditBlogTitleDescription(
                                                    e.target.value
                                                )
                                            }
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Category
                                        </h3>
                                        <Select
                                            disabled
                                            defaultValue="Select"
                                            value={editCategory}
                                            onChange={(e) =>
                                                setEditCategory(e.target.value)
                                            }
                                            style={{ width: 350, height: 40 }}
                                        />
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Date
                                        </h3>
                                        <DatePicker
                                            style={{ width: 350, height: 40 }}
                                            defaultValue={
                                                editEventDate
                                                    ? moment(editEventDate)
                                                    : null
                                            }
                                            onChange={(date, dateString) =>
                                                setEditEventDate(dateString)
                                            }
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
                                                value={editTags}
                                                onChange={(e) =>
                                                    setEditTags(e.target.value)
                                                }
                                                defaultValue={[]}
                                            />
                                        </Space>
                                    </div>
                                    <div className="admin_add_blog_section_image_add_border">
                                        <h3 className="admin_add_blog_section_add_blog_title_name">
                                            Images
                                        </h3>
                                        <div className="admin_add_blog_section_image_add">
                                            <Upload
                                                customRequest={customRequest}
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleChange}
                                            >
                                                {fileList.length >= 7
                                                    ? null
                                                    : uploadButton}
                                            </Upload>
                                            <Modal
                                                open={previewOpen}
                                                footer={null}
                                                onCancel={handleCancel1}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: "100%" }}
                                                    src={previewImage}
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
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
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
                                        onClick={EditBlogs}
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
