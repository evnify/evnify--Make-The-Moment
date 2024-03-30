import React, { useState } from "react";
import { Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBarModal = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <SearchOutlined
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={showModal}
            />
            <Modal
                title="Search"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Input placeholder="Enter your search query" />
            </Modal>
        </div>
    );
};

export default SearchBarModal;
