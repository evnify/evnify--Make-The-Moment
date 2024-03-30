import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Input,
    Select,
    DatePicker,
    Space,
    Modal,
    Upload,
    Button,
    Flex,
} from "antd";
const { TextArea } = Input;

const options = [];
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

options.push(
    {
        value: `farewell`,
        label: `farewell`,
    },
    {
        value: `bride to be`,
        label: `bride to be`,
    },
    {
        value: `get together`,
        label: `get together`,
    },
    {
        value: `anniversary`,
        label: `anniversary`,
    },
    {
        value: `party`,
        label: `party`,
    },
    {
        value: `home`,
        label: `home`,
    },
    {
        value: `gest`,
        label: `gest`,
    },
    {
        value: `decorate`,
        label: `decorate`,
    }
);

const handleChange = (value) => {
    console.log(`selected ${value}`);
};
function AddBlog() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-3",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-4",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-5",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);
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
        setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

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
                            style={{
                                width: 350,
                                height: 40,
                            }}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Category
                        </h3>
                        <Select
                            defaultValue="Select"
                            style={{
                                width: 350,
                                height: 40,
                            }}
                            options={[
                                {
                                    value: "Wedding Blog",
                                    label: "Wedding Blog",
                                },
                                {
                                    value: "Get - Together Blog",
                                    label: "Get - Together Blog",
                                },
                                {
                                    value: "Birthday Blog",
                                    label: "Birthday Blog",
                                },
                                {
                                    value: "Bride To Be Blog",
                                    label: "Bride To Be Blog",
                                },
                                {
                                    value: "Farewell Party Blog",
                                    label: "Farewell Party Blog",
                                },
                                {
                                    value: "Anniversary Party Blog",
                                    label: "Anniversary Party Blog",
                                },
                            ]}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Date
                        </h3>
                        <DatePicker
                            style={{
                                width: 350,
                                height: 40,
                            }}
                        />
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Category
                        </h3>
                        <Space
                            style={{
                                width: "100%",
                            }}
                            direction="vertical"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: "100%",
                                    width: 350,
                                    height: 40,
                                }}
                                placeholder="Please select"
                                defaultValue={["party", "birthday"]}
                                onChange={handleChange}
                                options={options}
                            />
                        </Space>
                    </div>
                    <div className="admin_add_blog_section_add_blog_add_description">
                        <h3 className="admin_add_blog_section_add_blog_title_name">
                            Description
                        </h3>
                        <TextArea
                            style={{
                                width: 624,
                                height: 329,
                                marginBottom: 20,
                            }}
                            placeholder="Description"
                        />
                    </div>
                </div>
            </div>
            <div className="admin_add_blog_section_image_add_container">
                <div className="admin_add_blog_section_Add_Blogs_image">
                    <h3>Images</h3>
                </div>
                <div className="admin_add_blog_section_image_add_border">
                    <div className="admin_add_blog_section_image_add">
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                            open={previewOpen}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img
                                alt="example"
                                style={{
                                    width: "100px",
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </div>
                    <div className="admin_add_blog_section_blog_add_btn">
                        
                        <Button
                            style={{
                                width: 100,
                                height: 35,
                            }}
                            type="primary"
                            danger
                        >
                            Cancle
                        </Button>
                        <Button
                            style={{
                                width: 100,
                                height: 35,
                            }}
                            type="primary"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBlog;
