import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, Row, message } from "antd";
import { uploadFile } from "../../controllers/uploadFileController";
import InventoryController from "../../controllers/inventory.controller";
import Title from "antd/es/typography/Title";
import { set } from "mongoose";

const AddInventoryForm = ({ form, onClose, onUpdate, initialValues }) => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            await form.validateFields();
            setLoading(true);
            if (initialValues) {
                const body = { ...values };

                await new InventoryController().updateInventory(
                    initialValues._id,
                    body
                );
                await onUpdate();
                message.success("Inventory updated successful");
            } else {
                const file = values.file[0].originFileObj;
                const filePath = `lectureMaterials/${file.name}`;
                const url = await uploadFile(file, filePath);
                const body = { ...values, itemImage: url };

                await new InventoryController().createInventory(body);
                await onUpdate();
                message.success("Inventory added successful");
            }
            onClose();
        } catch (error) {
            console.log(error);
            message.error("Add inventory failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="add-inventory-form"
            onFinish={onFinish}
            layout="vertical"
        >
            <Title>{initialValues ? "Edit Inventory" : "Add Inventory"} </Title>
            <Form.Item
                name="file"
                label="File"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
                rules={[
                    {
                        required: !initialValues,
                        message: "Please upload the file!",
                    },
                ]}
            >
                <Upload
                    action="/upload"
                    listType="text"
                    beforeUpload={() => false}
                >
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="itemID"
                label="Item ID"
                rules={[
                    { required: true, message: "Please input the item id" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="itemName"
                label="Item Name"
                rules={[
                    { required: true, message: "Please input the item name" },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select the category" }]}
      >
        <Select placeholder="Select a category">
          <Select.Option value="cakeStand">Cake Stand</Select.Option>
         
        </Select>
      </Form.Item> */}

            <Form.Item
                name="unitPrice"
                label="Unit Price"
                rules={[
                    { required: true, message: "Please input the unit price" },
                ]}
            >
                <Input type="number" addonAfter="$" />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    { required: true, message: "Please input the quantity" },
                ]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                name="AssignedEvents"
                label="Assigned Events"
                rules={[
                    {
                        required: true,
                        message: "Please select the assigned events",
                    },
                ]}
            >
                <Select mode="tags" placeholder="Select assigned events">
                    <Select.Option value="wedding">Wedding</Select.Option>
                    <Select.Option value="birthday">Birthday</Select.Option>
                    <Select.Option value="farewell">Farewell</Select.Option>
                    <Select.Option value="brideToBe">Bride to be</Select.Option>
                    <Select.Option value="getTogether">
                        Get together
                    </Select.Option>
                    <Select.Option value="anniversary">
                        Anniversary
                    </Select.Option>
                </Select>
            </Form.Item>

            {/* <Form.Item
        name="color"
        label="Colour"
        rules={[{ required: true, message: "Please input the colour" }]}
      >
        <Input />
      </Form.Item> */}

            <Form.Item
                name="color"
                label="Colour"
                rules={[
                    { required: true, message: "Please select the colour" },
                ]}
            >
                <Select placeholder="Select colour">
                    <Select.Option value="black">Black</Select.Option>
                    <Select.Option value="white">White</Select.Option>
                    <Select.Option value="gold">Gold</Select.Option>
                    <Select.Option value="red">Red</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="itemType"
                label="Item Type"
                rules={[
                    { required: true, message: "Please select the item type" },
                ]}
            >
                <Select placeholder="Select item type">
                    <Select.Option value="consumable">Consumable</Select.Option>
                    <Select.Option value="nonConsumable">
                        Non-consumable
                    </Select.Option>
                </Select>
            </Form.Item>

            <Row justify={"space-around"}>
                <Button
                    onClick={() => {
                        form.resetFields();
                        onClose();
                    }}
                    danger
                    type="primary"
                >
                    Cancel
                </Button>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                    )}
                </Form.Item>
            </Row>
        </Form>
    );
};

export default AddInventoryForm;
