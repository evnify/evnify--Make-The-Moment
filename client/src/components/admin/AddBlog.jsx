import React, { useState } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import {
    Input,
    Select,
    DatePicker,
    Space,
    Modal,
    Upload,
    Button,
    message,
} from "antd";
const { TextArea } = Input;

// Define getBase64 function
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const options = [
    { value: "farewell", label: "farewell" },
    { value: "bridetobe", label: "bride to be" },
    { value: "gettogether", label: "get together" },
    { value: "anniversary", label: "anniversary" },
    { value: "wedding", label: "wedding" },
    { value: "birthday", label: "birthday" },
];

function AddBlog() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const [blogTitle, setTitle] = useState("");
    const [blogTitleDescription, setTitleDescription] = useState("");
    const [category, setCategory] = useState("");
    const [eventDate, setDate] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    var id = 0;

    const saveBlog = async () => {
        const blogData = {
            blogTitle,
            blogTitleDescription,
            category,
            eventDate,
            tags,
            description,
            images,
        };
        console.log(blogData);
        if (
            !blogTitle ||
            !blogTitleDescription ||
            !category ||
            !eventDate ||
            !tags ||
            !description
        ) {
            return message.error("Please fill all the fields");
        }
        try {
            await axios.post("/api/blogs/addBlogs", blogData);
            message.success("Blog added successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancel = () => setPreviewOpen(false);
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
    return (
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
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Title Description
                        </h3>
                        <Input
                            placeholder="Title Description"
                            style={{ width: 350, height: 40 }}
                            onChange={(e) =>
                                setTitleDescription(e.target.value)
                            }
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Category
                        </h3>
                        <Select
                            defaultValue="Select"
                            style={{ width: 350, height: 40 }}
                            options={options}
                            onChange={(e) => setCategory(e)}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Date
                        </h3>
                        <DatePicker
                            style={{ width: 350, height: 40 }}
                            onChange={(date, dateString) => {
                                setDate(dateString);
                            }}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Tags
                        </h3>
                        <Space
                            style={{ width: "100%", bottom: "10px" }}
                            direction="vertical"
                            onChange={(e) => setTags(e.target.value)}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 350, height: 40 }}
                                placeholder="Please select"
                                defaultValue={[]}
                                onChange={(e) => setTags(e)}
                                options={options}
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
                                v
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 7 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewOpen}
                                footer={null}
                                onCancel={handleCancel}
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
                            width: 1100,
                            height: 429,
                            marginBottom: 20,
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="admin_add_blog_section_blog_add_btn">
                    <Button
                        style={{ width: 100, height: 35 }}
                        type="primary"
                        danger
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ width: 100, height: 35 }}
                        type="primary"
                        onClick={saveBlog}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddBlog;
