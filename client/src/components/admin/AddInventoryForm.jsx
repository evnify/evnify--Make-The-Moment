import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, Row, message } from "antd";

import Title from "antd/es/typography/Title";

import { storage } from "./firebaseConfig";

import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import axios from "axios";

const baseURL = "http://localhost:5000/api/inventories";

const uploadFile = async (file, path) => {
    try {
        const fileRef = ref(storage, `products/${file.name}`);
        return await uploadBytesResumable(fileRef, file)
            .then(async (res) => {
                const url = await getDownloadURL(res.ref);
                return url;
            })
            .catch((err) => {
                throw Error(`${err}`);
            });
    } catch (error) {
        throw Error(`${error}`);
    }
};

const AddInventoryForm = ({ form, onClose, onUpdate, initialValues }) => {
    const [loading, setLoading] = useState(false);

    const createInventory = async (newInventory) => {
        try {
            const response = await axios.post(
                "/api/inventories/addInventory",
                newInventory
            );
            message.success("Inventory added successful");
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle the case where the item name already exists
                message.error("Item with the same name already exists.");
            } else {
                console.error("Error creating inventory:", error);
                throw error;
            }
        }
    };

    const updateInventory = async (id, updatedInventory) => {
        try {
            const response = await axios.put(
                `/api/inventories/putInventories/${id}`,
                updatedInventory
            );
            message.success("Inventory updated successfully");
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle the case where the item name already exists
                message.error("Item with the same name already exists.");
            } else {
                console.error("Error updating inventory:", error);
                throw error;
            }
        }
    };

    const onFinish = async (values) => {
        console.log(values);
        try {
            await form.validateFields();
            setLoading(true);
            if (values.unitPrice <= 0) {
                message.error("Unit price must be greater than zero");
                return;
            }
            if (values.quantity < 0) {
                message.error("Please enter a non-negative value for quantity");
                return;
            }
            if (initialValues) {
                const body = { ...values };
                await updateInventory(initialValues._id, body);
                await onUpdate();
            } else {
                const file = values.file[0].originFileObj;
                const filePath = `lectureMaterials/${file.name}`;
                const url = await uploadFile(file, filePath);
                const body = { ...values, itemImage: url };

                await createInventory(body);
                await onUpdate();
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
                name="category"
                label="Category"
                rules={[
                    { required: true, message: "Please select the category" },
                ]}
            >
                <Select placeholder="Category">
                    <Select.Option value="chairs">Chairs</Select.Option>
                    <Select.Option value="tables">Tables</Select.Option>
                    <Select.Option value="cakeholders">
                        Cake Holders
                    </Select.Option>
                    <Select.Option value="plates">Plates</Select.Option>
                    <Select.Option value="glasses"> Glasses</Select.Option>
                    <Select.Option value="trays">Trays</Select.Option>
                    <Select.Option value="decorations">
                        Decorations
                    </Select.Option>
                </Select>
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

            <Form.Item
                name="unitPrice"
                label="Unit Price"
                rules={[
                    { required: true, message: "Please input the unit price" },
                ]}
            >
                <Input type="number" min="0.01" step="0.01" addonAfter="$" />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    { required: true, message: "Please input the quantity" },
                    {
                        validator: (_, value) =>
                            value >= 0
                                ? Promise.resolve()
                                : Promise.reject(
                                      "Please enter a non-negative value for quantity"
                                  ),
                    },
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

            <Form.Item
                name="color"
                label="Colour"
                rules={[
                    { required: true, message: "Please select the colour" },
                ]}
            >
                <Select placeholder="Select colour">
                    <Select.Option value="black">Black</Select.Option>
                    <Select.Option value="brown">Brown</Select.Option>
                    <Select.Option value="white">White</Select.Option>
                    <Select.Option value="red">Red</Select.Option>
                    <Select.Option value="gray">Gray</Select.Option>
                    <Select.Option value="tan">Tan</Select.Option>
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
