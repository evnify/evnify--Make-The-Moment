import React, { useState, useEffect } from "react";
import {
    Space,
    Table,
    Modal,
    Select,
    Input,
    Upload,
    Button,
    message,
} from "antd";
import { PlusOutlined, PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const { TextArea } = Input;
const { Search } = Input;

// Define getBase64 function
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function Packages() {
    const [packageList, setPackageList] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [inventories, setInventories] = useState([]);
    const [extras, setExtras] = useState([]);
    const [extrasData, setExtrasData] = useState("");
    const [inventoryQuantities, setInventoryQuantities] = useState({});

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editImages, setEditImages] = useState([]);
    const [editFileList, setEditFileList] = useState([]);
    const [editBaseImageFileList, setEditBaseImageFileList] = useState([]);

    const [searchMessages, setFilteredMessages] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [newPackageData, setNewPackageData] = useState({
        packageType: "",
        eventType: "",
        price: "",
        description: "",
        baseImage: "",
        inventories: [],
        extras: [],
        contentImages: [],
    });
    useEffect(() => {
        const updatedContentImages = images.slice(1, 6);
        setNewPackageData((prevData) => ({
            ...prevData,
            extras: extras,
            contentImages: updatedContentImages,
            baseImage: images[0],
        }));
    }, [extras, images]);

    const [editPackageData, setEditPackageData] = useState({
        packageId: "",
        packageType: "",
        eventType: "",
        price: "",
        description: "",
        baseImage: "",
        inventories: [],
        extras: [],
        contentImages: [],
    });

    // Add modal functions
    const showModalAdd = () => {
        setIsAddModalOpen(true);
    };
    const handleCancelAdd = () => {
        setIsAddModalOpen(false);
    };

    // Edit modal functions
    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
    };

    ////Image Upload Section////

    //upload images
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
                "https://api.imgbb.com/1/upload?key=700c61f2bf87cf203338efe206d7e66f", //  API key for image upload
                formData
            )
            .then((response) => {
                if (response.data.data) {
                    onSuccess();
                    message.success("Image uploaded successfully");
                    setImages([...images, response.data.data.url]); // imgbb API returns image URL
                    console.log("img url:", images);

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

    const handleRemoveBaseImage = (fileList) => {
        setEditBaseImageFileList(fileList);
        const urls = fileList.map((file) => file.url);
        setEditPackageData({
            ...editPackageData,
            baseImage: urls.length > 0 ? urls[0] : "",
        });
    };

    const handleRemoveContentImages = (fileList) => {
        setEditFileList(fileList);
        const urls = fileList.map((file) => file.url);
        setEditPackageData({
            ...editPackageData,
            contentImages: urls.slice(1, 6),
        });
    };

    ////Inventory Add and Edit Section////

    // Create Inventories Dropdown Data
    const uniqueCategories = [
        ...new Set(inventories.map((inventory) => inventory.category)),
    ];
    const pkgData = uniqueCategories.map((category) => ({
        value: category,
        label: category,
    }));

    //quantities of selected inventories in add model
    const handleAddInventory = (values) => {
        const updatedQuantities = {};
        values.forEach((value) => {
            const selectedInventory = inventories.find(
                (inventory) => inventory.category === value
            );
            if (selectedInventory) {
                if (inventoryQuantities[selectedInventory.itemID]) {
                    updatedQuantities[selectedInventory.itemID] =
                        inventoryQuantities[selectedInventory.itemID];
                } else {
                    updatedQuantities[selectedInventory.itemID] = "1"; // Set default quantity to 1
                }
            }
        });
        setInventoryQuantities(updatedQuantities);
        setNewPackageData((prevData) => ({
            ...prevData,
            inventories: values.map((value) => ({
                category: value,
                quantity: updatedQuantities[value] ?? "1", // Set default quantity to 1 if not found
            })),
        }));
    };

    const handleEditInventory = (value) => {
        const selectedInventory = inventories.find(
            (inventory) => inventory.category === value
        );

        if (selectedInventory) {
            const existingIndex = editPackageData.inventories.findIndex(
                (item) => item.category === selectedInventory.category
            );
            if (existingIndex === -1) {
                // If inventory doesn't exist, add it to the editPackageData state
                setEditPackageData((prevData) => ({
                    ...prevData,
                    inventories: [
                        ...prevData.inventories,
                        {
                            category: selectedInventory.category,
                            id: selectedInventory.id,
                            quantity: "1",
                        },
                    ],
                }));
            }
        }
    };

    //update quantity in edit model
    const handleEditInventoryQuantity = (index, newQuantity) => {
        const updatedInventories = [...editPackageData.inventories];
        updatedInventories[index].quantity = newQuantity;
        setEditPackageData({
            ...editPackageData,
            inventories: updatedInventories,
        });
    };

    //remove inventory in edit model
    const handleRemoveInventory = (index) => {
        const updatedInventories = [...editPackageData.inventories];
        updatedInventories.splice(index, 1);
        setEditPackageData({
            ...editPackageData,
            inventories: updatedInventories,
        });
    };

    // Create a new package
    const AddPackage = async () => {
        try {
            console.log("New Package Data:", newPackageData);
            const response = await axios.post(
                "/api/packages/addPackage",
                newPackageData
            );
            console.log("New package added:", response.data);
            fetchAllPackages();
            message.success("New package added successfully");
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding new package:", error);
            message.error(error.response.data.message);
        }
    };

    //fetch all packages
    const fetchAllPackages = async () => {
        try {
            const response = await axios.get(`/api/packages/allPackages`);
            setPackageList(response.data);
            console.log("All Packages:", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllPackages();
        fetchBookings();
        fetchPkgViewCountData();
    }, []);

    // fetch all inventories drop down list
    const fetchAllInventories = async () => {
        try {
            const response = await axios.get(`/api/packages/allInventory`);
            setInventories(response.data);
            console.log("All Inventories:", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllInventories();
    }, []);

    // Delete an package
    const DeletePackage = async (packageId) => {
        try {
            await axios.delete(`/api/packages/deletePackage/${packageId}`);
            message.success("Package deleted successfully");
            fetchAllPackages();
        } catch (error) {
            console.error("Error deleting package:", error);
            message.error("Failed to delete package");
        }
    };

    // Function to fetch package details by ID
    const fetchPackageById = async (packageId) => {
        try {
            const response = await axios.get(
                `/api/packages/getPackage/${packageId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching package details:", error);
            throw new Error("Failed to fetch package details");
        }
    };

    // Function to handle editing data fetch to model
    const handleEditPackage = async (packageId) => {
        try {
            const packageData = await fetchPackageById(packageId);
            setEditPackageData(packageData);

            setEditImages(
                packageData.contentImages.map((url, index) => ({
                    uid: index,
                    name: "image.png",
                    status: "done",
                    url: url,
                }))
            );
            setEditFileList(
                packageData.contentImages.map((url, index) => ({
                    uid: index,
                    name: "image.png",
                    status: "done",
                    url: url,
                }))
            );
            setIsEditModalOpen(true);
            console.log("preview image:", previewImage);
            console.log("preview title:", previewTitle);
            console.log("editimage", editImages);
            console.log("setEditFileList", editFileList);
            console.log("filelist", fileList);
            console.log("Edit Package Data:", packageData);
        } catch (error) {
            console.error("Error handling edit package:", error);
            message.error("Failed to fetch package details");
        }
    };

    //update Packages Route
    const updatePackage = async () => {
        try {
            const response = await axios.put(
                `/api/packages/updatePackage/${editPackageData._id}`,
                editPackageData
            );
            console.log("Package updated:", response.data);
            fetchAllPackages();
            message.success("Package updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating package:", error);
            message.error("Failed to update package");
        }
    };

    ////Extras Add and Edit Section////

    // Function to remove an extra item from the edit package data
    const handleRemoveEditExtra = (index) => {
        const updatedExtras = [...editPackageData.extras];
        updatedExtras.splice(index, 1);
        setEditPackageData({ ...editPackageData, extras: updatedExtras });
    };

    // Function to handle editing an extra item in the edit package data
    const handleEditExtra = (index, newValue) => {
        const updatedExtras = [...editPackageData.extras];
        updatedExtras[index] = newValue;
        setEditPackageData({ ...editPackageData, extras: updatedExtras });
    };
    // Function to add a new extra item to the edit package data
    const handleAddNewExtra = () => {
        if (extrasData.trim() !== "") {
            const updatedExtras = [...editPackageData.extras];
            updatedExtras.push(extrasData);
            setEditPackageData({ ...editPackageData, extras: updatedExtras });
            setExtrasData("");
        }
    };

    const handelAddExtra = () => {
        setExtras([...extras, extrasData]);
        setExtrasData("");
        console.log(extras);
    };

    //search Filter
    const handleSearch = (value) => {
        const searchValue = value.toLowerCase();

        const filtered = (packageList ?? []).filter(
            (pkg) =>
                (pkg.packageId &&
                    pkg.packageId.toLowerCase().includes(searchValue)) ||
                (pkg.eventType &&
                    pkg.eventType.toLowerCase().includes(searchValue))
        );

        // Map the filtered packages to the items array format
        const searchResultItems = filtered.map((pkg, index) => ({
            key: index,
            packageId: pkg.packageId,
            packageType: pkg.packageType,
            eventType: pkg.eventType,
            price: pkg.price,
            description: pkg.description,
        }));

        // Set the filtered packages state
        setIsSearching(true);
        setFilteredMessages(searchResultItems);
        console.log(searchResultItems);
    };

    // Function to convert package data to a format compatible with react-csv
    const convertToCSVData = (data) => {
        const csvData = data.map((packaged) => ({
            "Package ID": packaged.packageId,
            "Package Type": packaged.packageType,
            "Event Type": packaged.eventType,
            Price: packaged.price,
            Description: packaged.description,
            Inventories: packaged.inventories
                .map((inv) => `${inv.itemType}(${inv.quantity})`)
                .join(";"), // Combine inventory items with quantities
            Extras: packaged.extras.join(";"), // Combine extras with semicolon separator
        }));
        return csvData;
    };

    ////chart configuration////

    //get daily view count
    const [viewCounts, setViewCounts] = useState([]);

    const createChart = (labels, data) => {
        const ctx = document.getElementById("lineChart");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "View Counts",
                        data: data,
                        borderColor: "#5b8ff9",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "transparent",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Date",
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "View Count",
                        },
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    const fetchPkgViewCountData = async () => {
        try {
            const response = await axios.get("/api/pkgViewCounts/getAllCounts");
            setViewCounts(response.data);
            console.log("All View Counts:", response.data);
            const last30DaysViewCounts = response.data.slice(-7); // Get the last 30 days' data
            const labels = last30DaysViewCounts.map((data) => data.date);
            const data = last30DaysViewCounts.map((data) => data.count);
            createChart(labels, data);
        } catch (error) {
            console.log(error);
        }
    };

    //get bookings
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("/api/bookings/getAllBookings");
            setBookings(response.data);
            console.log("All Bookings:", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const bookingPackages = bookings.map((booking) => booking.packageType); // Extract package types from bookings
    const packageCounts = bookingPackages.reduce((counts, packageType) => {
        counts[packageType] = (counts[packageType] || 0) + 1; // Count occurrences of each package type
        return counts;
    }, {});

    const pieChartData = {
        labels: Object.keys(packageCounts),
        datasets: [
            {
                label: "Packages",
                data: Object.values(packageCounts),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Package table columns
    const columns = [
        {
            title: "Package ID",
            dataIndex: "packageId",
            key: "packageId",
        },
        {
            title: "Package Type",
            dataIndex: "packageType",
            key: "packageType",
        },
        {
            title: "Event Type",
            dataIndex: "eventType",
            key: "eventType",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <span title={text}>
                    {text.length > 20 ? `${text.substring(0, 35)}...` : text}
                </span>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <button
                        style={{
                            fontSize: "20px",
                            color: "#757171",
                            border: "none",
                            background: "transparent",
                        }}
                    >
                        <Button
                            style={{ margin: "0 10px 0 0" }}
                            onClick={() => handleEditPackage(record._id)}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            type="primary"
                            style={{ margin: "0 10px 0 0" }}
                            onClick={() => DeletePackage(record._id)}
                        >
                            Delete
                        </Button>
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="booking-package-insight-div">
                <div className="booking-package-div-insight-left">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: "60px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <h4> Packages </h4>
                            </div>
                            <div>Daily package view count in past 07 days</div>
                        </div>
                        <div></div>
                    </div>
                    <div style={{ padding: "10px" }}>
                        <canvas id="lineChart" height={200}></canvas>
                    </div>
                </div>
                <div className="booking-package-div-insight-right">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: "60px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <h4> Packages </h4>
                            </div>
                            <div>Most popular Packages among users </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="package-insight-categories">
                        <Doughnut data={pieChartData} />
                    </div>
                </div>
            </div>

            <div className="booking-package-details-change">
                <div className="booking-package-details-change-top">
                    <div>
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={handleSearch}
                            style={{
                                width: 300,
                                margin: "5px 0 20px 0",
                            }}
                        />
                    </div>
                    <div></div>
                    <div>
                        <Modal
                            title="Add New Package"
                            visible={isAddModalOpen}
                            onOk={AddPackage}
                            onCancel={handleCancelAdd}
                            width={1100}
                        >
                            <div className="package-details-add-model">
                                <div className="package-details-add-model-left">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        Package Type
                                        <Select
                                            defaultValue=""
                                            style={{ width: 250 }}
                                            onChange={(value) =>
                                                setNewPackageData({
                                                    ...newPackageData,
                                                    packageType: value,
                                                })
                                            }
                                            options={[
                                                {
                                                    value: "Basic",
                                                    label: "Basic",
                                                },
                                                {
                                                    value: "Standard",
                                                    label: "Standard",
                                                },
                                                {
                                                    value: "Premium",
                                                    label: "Premium",
                                                },
                                            ]}
                                            required // Mark this field as required
                                        />
                                        {/* Add validation message for the package type */}
                                        {!newPackageData.packageType && (
                                            <span style={{ color: "red" }}>
                                                Package Type is required
                                            </span>
                                        )}
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                Event Type
                                            </div>
                                            <Select
                                                defaultValue=""
                                                style={{ width: 250 }}
                                                onChange={(value) =>
                                                    setNewPackageData({
                                                        ...newPackageData,
                                                        eventType: value,
                                                    })
                                                }
                                                options={[
                                                    {
                                                        value: "Wedding",
                                                        label: "Wedding",
                                                    },
                                                    {
                                                        value: "GetToGether",
                                                        label: "Get-Together",
                                                    },
                                                    {
                                                        value: "Birthday",
                                                        label: "Birthday",
                                                    },
                                                    {
                                                        value: "brideToBe",
                                                        label: "Bride To Be",
                                                    },
                                                    {
                                                        value: "Farewell",
                                                        label: "Farewell Party",
                                                    },
                                                    {
                                                        value: "Anniversary",
                                                        label: "Anniversary Party",
                                                    },
                                                ]}
                                                required // Mark this field as required
                                            />
                                            {/* Add validation message for the event type */}
                                            {!newPackageData.eventType && (
                                                <span style={{ color: "red" }}>
                                                    Event Type is required
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                Price
                                            </div>
                                            <Input
                                                placeholder="Enter price"
                                                style={{ width: "250px" }}
                                                onChange={(e) =>
                                                    setNewPackageData({
                                                        ...newPackageData,
                                                        price: e.target.value,
                                                    })
                                                }
                                                required // Mark this field as required
                                            />
                                            {/* Add validation message for the price */}
                                            {!newPackageData.price && (
                                                <span style={{ color: "red" }}>
                                                    Price is required
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                Inventories
                                            </div>
                                            <Select
                                                showSearch
                                                mode="multiple"
                                                style={{ width: 250 }}
                                                placeholder="Search Inventories"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label ?? ""
                                                    ).includes(input)
                                                }
                                                filterSort={(
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? "")
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ""
                                                            ).toLowerCase()
                                                        )
                                                }
                                                onChange={handleAddInventory}
                                                options={pkgData}
                                                required
                                            />

                                            {Object.entries(
                                                inventoryQuantities
                                            ).map(([inventoryId, quantity]) => {
                                                // Find the inventory object from the inventories array based on its ID
                                                const inventory =
                                                    inventories.find(
                                                        (inv) =>
                                                            inv.itemID ===
                                                            inventoryId
                                                    );
                                                if (!inventory) {
                                                    return null; // Skip if inventory not found
                                                }
                                                return (
                                                    <div
                                                        key={inventoryId}
                                                        style={{
                                                            marginTop: "10px",
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "5px",
                                                            }}
                                                        >
                                                            {inventory.category}
                                                        </span>
                                                        <span>
                                                            <Input
                                                                style={{
                                                                    width: 100,
                                                                    marginLeft:
                                                                        "10px",
                                                                }}
                                                                value={quantity}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const updatedQuantities =
                                                                        {
                                                                            ...inventoryQuantities,
                                                                            [inventoryId]:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        };
                                                                    setInventoryQuantities(
                                                                        updatedQuantities
                                                                    );
                                                                    setNewPackageData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            inventories:
                                                                                Object.entries(
                                                                                    updatedQuantities
                                                                                ).map(
                                                                                    ([
                                                                                        categoryId,
                                                                                        qty,
                                                                                    ]) => ({
                                                                                        category:
                                                                                            inventories.find(
                                                                                                (
                                                                                                    inv
                                                                                                ) =>
                                                                                                    inv.itemID ===
                                                                                                    categoryId
                                                                                            )
                                                                                                ?.category ??
                                                                                            "",
                                                                                        quantity:
                                                                                            qty,
                                                                                    })
                                                                                ),
                                                                        })
                                                                    );
                                                                }}
                                                                required
                                                            />
                                                            {/* Add validation message for the quantity */}
                                                            {!quantity && (
                                                                <span
                                                                    style={{
                                                                        color: "red",
                                                                        marginLeft:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    Quantity is
                                                                    required
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                Description
                                            </div>
                                            <TextArea
                                                rows={4}
                                                style={{ width: "250px" }}
                                                onChange={(e) =>
                                                    setNewPackageData({
                                                        ...newPackageData,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                required // Mark this field as required
                                            />
                                            {/* Add validation message for the description */}
                                            {!newPackageData.description && (
                                                <span style={{ color: "red" }}>
                                                    Description is required
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                Extras
                                            </div>
                                            <Input
                                                placeholder="Enter extras"
                                                style={{ width: "250px" }}
                                                onChange={(e) =>
                                                    setExtrasData(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {extrasData ? (
                                                <button
                                                    onClick={handelAddExtra}
                                                    style={{
                                                        width: "50px",
                                                        height: "30px",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        marginTop: "5px",
                                                        background: "#533c56",
                                                        color: "white",
                                                        cursor: "pointer",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <button
                                                    style={{
                                                        width: "50px",
                                                        height: "30px",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        marginTop: "5px",
                                                        background: "#ccc",
                                                        color: "#888",
                                                        cursor: "not-allowed",
                                                        marginLeft: "10px",
                                                    }}
                                                    disabled // Disable the button when extrasData is null
                                                >
                                                    Add
                                                </button>
                                            )}
                                            {extras.map((extra, index) => (
                                                <Input
                                                    key={index}
                                                    style={{
                                                        width: "250px",
                                                        border: "none",
                                                        marginTop: "2px",
                                                    }}
                                                    value={extra}
                                                    disabled
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div className="package-details-add-model-right">
                                    <p style={{ marginTop: "10px" }}>
                                        Package Image
                                    </p>
                                    <div className="package-details-add-model-right-top">
                                        {/* base img*/}
                                        <Upload
                                            customRequest={customRequest}
                                            listType="picture-card"
                                            fileList={editBaseImageFileList}
                                            onPreview={handlePreview}
                                            onChange={(info) => {
                                                handleChange(info);
                                                handleRemoveBaseImage(
                                                    info.fileList
                                                );
                                            }}
                                            required // Mark this field as required
                                        >
                                            {editBaseImageFileList.length >= 1
                                                ? null
                                                : uploadButton}
                                        </Upload>
                                        {/* Add validation message for the package image */}
                                        {!editBaseImageFileList.length && (
                                            <span style={{ color: "red" }}>
                                                Package Image is required
                                            </span>
                                        )}
                                    </div>
                                    <p>Package Content</p>
                                    <div className="package-details-add-model-right-down">
                                        {/* content img */}
                                        <Upload
                                            customRequest={customRequest}
                                            listType="picture-card"
                                            fileList={editFileList}
                                            onPreview={handlePreview}
                                            onChange={(info) => {
                                                handleChange(info);
                                                handleRemoveContentImages(
                                                    info.fileList
                                                );
                                            }}
                                            required // Mark this field as required
                                        >
                                            {editFileList.length >= 4
                                                ? null
                                                : uploadButton}
                                        </Upload>
                                        {/* Add validation message for the package content */}
                                        {!editFileList.length && (
                                            <span style={{ color: "red" }}>
                                                Package Content is required
                                            </span>
                                        )}
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
                        </Modal>
                        <CSVLink
                            data={convertToCSVData(packageList)}
                            filename={"package_details.csv"}
                        >
                            <button
                                style={{
                                    width: "100px",
                                    height: "40px",
                                    border: "none",
                                    borderRadius: "5px",
                                    background: "#4094f7",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    marginLeft: "20px",
                                }}
                            >
                                Download CSV
                            </button>
                        </CSVLink>

                        <button
                            onClick={showModalAdd}
                            style={{
                                width: "100px",
                                height: "40px",
                                border: "none",
                                borderRadius: "5px",
                                background: "#533c56",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "20px",
                            }}
                        >
                            Create New
                        </button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={isSearching ? searchMessages : packageList}
                />

                <Modal
                    title="Edit Package"
                    visible={isEditModalOpen}
                    onOk={updatePackage}
                    onCancel={handleCancelEdit}
                    width={1100}
                >
                    <div className="package-details-add-model">
                        <div className="package-details-add-model-left">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                Package Type
                                <Select
                                    defaultValue={editPackageData.packageType}
                                    style={{ width: 250 }}
                                    onChange={(value) =>
                                        setEditPackageData({
                                            ...editPackageData,
                                            packageType: value,
                                        })
                                    }
                                    options={[
                                        { value: "Basic", label: "Basic" },
                                        {
                                            value: "Standard",
                                            label: "Standard",
                                        },
                                        { value: "Premium", label: "Premium" },
                                    ]}
                                />
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Event Type
                                    </div>
                                    <Select
                                        defaultValue={editPackageData.eventType}
                                        style={{ width: 250 }}
                                        onChange={(value) =>
                                            setEditPackageData({
                                                ...editPackageData,
                                                eventType: value,
                                            })
                                        }
                                        options={[
                                            {
                                                value: "Wedding",
                                                label: "Wedding",
                                            },
                                            {
                                                value: "Get-Together",
                                                label: "Get-Together",
                                            },
                                            {
                                                value: "Birthday",
                                                label: "Birthday",
                                            },
                                            {
                                                value: "Bride To Be",
                                                label: "Bride To Be",
                                            },
                                            {
                                                value: "Farewell Party ",
                                                label: "Farewell Party",
                                            },
                                            {
                                                value: "Anniversary Party",
                                                label: "Anniversary Party",
                                            },
                                        ]}
                                    />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Price
                                    </div>
                                    <Input
                                        placeholder="Enter price"
                                        style={{ width: "250px" }}
                                        value={editPackageData.price}
                                        onChange={(e) =>
                                            setEditPackageData({
                                                ...editPackageData,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {/* Display existing inventories and quantity inputs */}
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Inventories
                                    </div>
                                    <Select
                                        showSearch
                                        style={{ width: 250 }}
                                        placeholder="Search Inventories"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                                input
                                            )
                                        }
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.label ?? ""
                                                    ).toLowerCase()
                                                )
                                        }
                                        onChange={handleEditInventory}
                                        options={pkgData}
                                    />
                                    {/* Display selected inventories and quantity inputs */}
                                    {editPackageData.inventories.map(
                                        (inventory, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    marginTop: "10px",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    {inventory.category}
                                                </span>
                                                <span>
                                                    <Input
                                                        style={{
                                                            width: 100,
                                                            marginLeft: "10px",
                                                        }}
                                                        value={
                                                            inventory.quantity
                                                        }
                                                        onChange={(e) =>
                                                            handleEditInventoryQuantity(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        style={{
                                                            marginLeft: "10px",
                                                            background:
                                                                "transparent",
                                                            border: "none",
                                                            color: "#f00",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleRemoveInventory(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Description
                                    </div>
                                    <TextArea
                                        rows={4}
                                        style={{ width: "250px" }}
                                        value={editPackageData.description}
                                        onChange={(e) =>
                                            setEditPackageData({
                                                ...editPackageData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Extras
                                    </div>
                                    <Input
                                        placeholder="Enter extras"
                                        style={{ width: "250px" }}
                                        value={extrasData} // Display the value from state
                                        onChange={(e) =>
                                            setExtrasData(e.target.value)
                                        }
                                    />
                                    {extrasData ? (
                                        <button
                                            onClick={handleAddNewExtra}
                                            style={{
                                                width: "50px",
                                                height: "30px",
                                                border: "none",
                                                borderRadius: "5px",
                                                marginTop: "5px",
                                                background: "#533c56",
                                                color: "white",
                                                cursor: "pointer",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            Add
                                        </button>
                                    ) : (
                                        <button
                                            style={{
                                                width: "50px",
                                                height: "30px",
                                                border: "none",
                                                borderRadius: "5px",
                                                marginTop: "5px",
                                                background: "#ccc",
                                                color: "#888",
                                                cursor: "not-allowed",
                                                marginLeft: "10px",
                                            }}
                                            disabled // Disable the button when extrasData is null
                                        >
                                            Add
                                        </button>
                                    )}
                                    {editPackageData.extras.map(
                                        (extra, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Input
                                                    style={{
                                                        width: "250px",
                                                        border: "none",
                                                        marginTop: "5px",
                                                    }}
                                                    value={extra}
                                                    onChange={(e) =>
                                                        handleEditExtra(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <button
                                                    style={{
                                                        marginLeft: "10px",
                                                        background:
                                                            "transparent",
                                                        border: "none",
                                                        color: "#f00",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveEditExtra(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="package-details-add-model-right">
                            <p style={{ marginTop: "10px" }}>Package Image</p>
                            <div className="package-details-add-model-right-top">
                                <Upload
                                    customRequest={customRequest}
                                    listType="picture-card"
                                    fileList={editBaseImageFileList}
                                    onPreview={handlePreview}
                                    onChange={(info) => {
                                        handleChange(info);
                                        handleRemoveBaseImage(info.fileList);
                                    }}
                                >
                                    {editBaseImageFileList.length >= 1
                                        ? null
                                        : uploadButton}
                                </Upload>
                            </div>
                            <p>Package Content</p>
                            <div className="package-details-add-model-right-down">
                                <Upload
                                    customRequest={customRequest}
                                    listType="picture-card"
                                    fileList={editFileList}
                                    onPreview={handlePreview}
                                    onChange={(info) => {
                                        handleChange(info);
                                        handleRemoveContentImages(
                                            info.fileList
                                        );
                                    }}
                                >
                                    {/* {editFileList.length >= 4
                                        ? null
                                        : uploadButton} */}
                                </Upload>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Packages;
