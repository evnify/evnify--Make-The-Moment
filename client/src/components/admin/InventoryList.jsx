import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Modal,
    Row,
    Table,
    Popconfirm,
    message,
    Image,
    Input,
    Space
} from "antd";
import AddInventoryForm from "./AddInventoryForm";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
 
import axios from "axios";
const baseURL = "http://localhost:5000/api/inventories";

function InventoryList() {
    const [inventories, setInventories] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/inventories/getInventories");
            setInventories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    
//update inventory
    const handleEdit = (record) => {
        setEditData(record);
        setEditOpen(true);
        form.setFieldsValue(record);
    };

//delete inventory    
    const deleteInventory = async (id) => {
        try {
            await axios.delete(`/api/inventories/deleteInventories/${id}`);
            fetchData();
            message.success("Inventory deleted successfully");
            return true; // Success
            
        } catch (error) {
            console.error("Error deleting inventory:", error);
            throw error;
        }
    };

    const columns = [
        {
            title: "Item ID",
            dataIndex: "itemID",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Item Name",
            dataIndex: "itemName",
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Color",
            dataIndex: "color",
        },
        {
            title: "Item Type",
            dataIndex: "itemType",
            render: (text, record) => {
                return record.itemType === "consumable"
                    ? "Consumable"
                    : "Non Consumable";
            },
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "",
            render: (_, record) => (
                <span>
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => deleteInventory(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type="primary">
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Define columns for the table
        const columns = [
            "Item ID",
            "Item Name",
            "Unit Price",
            "Quantity",
            "Color",
            "Item Type",
            "Status",
            "category",
        ];

        // Extract data for selected items
        const selectedItemsData = inventories
            .filter((item) => selectedRowKeys.includes(item._id))
            .map(
                ({
                    itemID,
                    itemName,
                    unitPrice,
                    quantity,
                    color,
                    itemType,
                    status,
                    category,
                }) => [
                    itemID,
                    itemName,
                    unitPrice,
                    quantity,
                    color,
                    itemType,
                    status,
                    category,
                ]
            );

        // Add table to PDF
        doc.autoTable({
            head: [columns],
            body: selectedItemsData,
            startY: 10, // Y-position to start the table
            theme: "striped", // Optional: theme for the table
            styles: { overflow: "linebreak" }, // Optional: style settings
        });

        // Save the PDF
        doc.save("selected_inventory.pdf");
    };

    // Search

    const { Search } = Input;

    const [searchKey, setSearchKey] = useState("");
    const [FilteredInventoryList, setFilteredInventoryList] = useState([]);

    useEffect(() => {
        let tempList = inventories;
        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.itemName
                        .toLowerCase()
                        .includes(searchKey.toLowerCase())
            );
        }
    
        setFilteredInventoryList(tempList);
    
        console.log("InventoryList", inventories);
        console.log("searchKey", searchKey);
    }, [searchKey,FilteredInventoryList, inventories]);
    

    return (
        <div className="admin_inventory_list_counts_container">
            <div className="inventory_list_main_container">
                {/*total card*/}
                <div className="inventory_total_container1">
                    <div className="inventory_total_card1">
                        <div className="inventory_total_card1_txt">
                            <h3>Total Items</h3>
                            <h2>{inventories.length}</h2>
                        </div>
                    </div>
                </div>

                {/*low stock card*/}
                <div className="inventory_total_container2">
                    <div className="inventory_total_card2">
                        <div className="inventory_total_card2_txt">
                            <h3>Low Stock Items</h3>
                            <h2>13</h2>
                        </div>
                    </div>
                </div>

                {/*out of stock card*/}
                <div className="inventory_total_container3">
                    <div className="inventory_total_card3">
                        <div className="inventory_total_card3_txt">
                            <h3>Out of Stock Items</h3>
                            <h2>1</h2>
                        </div>
                    </div>
                </div>

                {/*consumable card*/}
                <div className="inventory_total_container4">
                    <div className="inventory_total_card4">
                        <div className="inventory_total_card4_txt">
                            <h3>Consumable Items</h3>
                            <h2>130</h2>
                        </div>
                    </div>
                </div>

                {/*non-consumable card*/}
                <div className="inventory_total_container5">
                    <div className="inventory_total_card5">
                        <div className="inventory_total_card5_txt">
                            <h3>Nonconsumable Items</h3>
                            <h2>458</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    padding: 16,
                    height: "80vh",
                    backgroundColor: "white",
                }}
            >
                <Row justify={"space-between"}>
                    <h3>Inventory List</h3>
                    <Search className="inventory_list_search button"
                        placeholder="Search by Name"
                        size="large"
                        onSearch={(value) => setSearchKey(value)}
                        style={{
                            width: 265,
                            height: 40,
                        }}
                    />
                    <Button
                        className="add_inventory_button"
                        onClick={() => {
                            setAddOpen(true);
                            form.resetFields();
                        }}
                    >
                        Add Inventory
                    </Button>
                </Row>
                <Table
                    dataSource={FilteredInventoryList}
                    columns={columns}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: onSelectChange,
                    }}
                    rowKey="_id"
                />

                <Modal
                    open={addOpen}
                    onCancel={() => {
                        setAddOpen(false);
                        form.resetFields();
                    }}
                    footer={null}
                >
                    <AddInventoryForm
                        form={form}
                        onClose={() => {
                            setAddOpen(false);
                        }}
                        onUpdate={fetchData}
                    />
                </Modal>
                <Modal
                    open={editOpen}
                    onCancel={() => {
                        setEditOpen(false);
                        form.resetFields();
                    }}
                    footer={null}
                >
                    <Image
                        src={form.getFieldValue("itemImage")}
                        width={300}
                        height={200}
                    />
                    <AddInventoryForm
                        form={form}
                        onClose={() => {
                            setEditOpen(false);
                        }}
                        onUpdate={fetchData}
                        initialValues={editData}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default InventoryList;
