import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Select, Input, Upload, Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Icon } from "@iconify/react";
import axios from "axios";
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
  const [baseImage, setBaseImage] = useState('');
  const [contentImages, setContentImages] = useState([]);
  const [editBaseImageFileList, setEditBaseImageFileList] = useState([]);

  const [searchMessages, setFilteredMessages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [newPackageData, setNewPackageData] = useState({
    packageType: '',
    eventType: '',
    price: '',
    description: '',
    baseImage: '',
    inventories: [],
    extras: [],
    contentImages: [],
  });
  useEffect(() => {
    const updatedContentImages = images.slice(1, 6);
    setNewPackageData(prevData => ({
      ...prevData,
      extras: extras,
      contentImages: updatedContentImages,
      baseImage: images[0],
    }));
  }, [extras, images]);

  const [editPackageData, setEditPackageData] = useState({
    packageId: '',
    packageType: '',
    eventType: '',
    price: '',
    description: '',
    baseImage: '',
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
          console.log(images);

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

  // Update handleInventory function to include quantity input
  const handleInventory = (values) => {
    const updatedQuantities = {};
    values.forEach(value => {
      // If the inventory is already selected, keep its quantity as it is
      if (inventoryQuantities[value]) {
        updatedQuantities[value] = inventoryQuantities[value];
      } else {
        // Otherwise, initialize the quantity as 2
        updatedQuantities[value] = 1;
      }
    });
    setInventoryQuantities(updatedQuantities);
    setNewPackageData(prevData => ({
      ...prevData,
      inventories: values.map(value => ({
        id: value,
        quantity: updatedQuantities[value] // Set quantity as per user input or default to 2
      }))
    }));
  };

  const handleAddNewInventory = (value) => {
    const selectedInventory = inventories.find(inventory => inventory.itemID === value);
    if (selectedInventory) {
      const existingIndex = newPackageData.inventories.findIndex(item => item.itemID === value);
      if (existingIndex === -1) {
        // Add the inventory with quantity 1
        setNewPackageData(prevData => ({
          ...prevData,
          inventories: [...prevData.inventories, { itemID: value, id: selectedInventory.id, quantity: 1 }]
        }));
      } else {
        // If inventory already exists, update its quantity
        const updatedInventories = [...newPackageData.inventories];
        updatedInventories[existingIndex].quantity += 1;
        setNewPackageData(prevData => ({
          ...prevData,
          inventories: updatedInventories
        }));
      }
    }
  };

  const handleEditInventoryQuantity = (index, newQuantity) => {
    const updatedInventories = [...editPackageData.inventories];
    updatedInventories[index].quantity = newQuantity;
    setEditPackageData({ ...editPackageData, inventories: updatedInventories });
  };

  // Function to handle adding base image
  const handleAddBaseImage = (file) => {
    setBaseImage(file.url || file.preview);
  };

  // Function to handle adding content images
  const handleAddContentImages = (newFileList) => {
    const newContentImages = newFileList.map(file => file.url || file.preview);
    setContentImages(newContentImages);
  };

  // Function to handle editing base image
  const handleEditBaseImage = (fileList) => {
    setEditBaseImageFileList(fileList);
  };

  // Function to handle editing content images
  const handleEditContentImages = (fileList) => {
    const newContentImages = fileList.map(file => file.url || file.preview);
    setEditFileList(fileList);
    setEditImages(newContentImages);
  };



  // Create a new package
  const handleAddPackage = async () => {
    try {
      console.log('New Package Data:', newPackageData); // Logging new package data
      const response = await axios.post('/api/packages/addPackage', newPackageData);
      console.log('New package added:', response.data);
      // Optionally, you can fetch all packages again to update the package list
      fetchAllPackages();
      message.success('New package added successfully');
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding new package:', error);
      message.error('Failed to add new package');
    }
  };

  //fetch all packages
  const fetchAllPackages = async () => {
    try {
      const response = await axios.get(`/api/packages/allPackages`);
      setPackageList(response.data);
      console.log('All Packages:', response.data); // Logging all packages
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPackages();
  }, []); // Run only once on component mount

  // fetch all inventories//drop down list
  const fetchAllInventories = async () => {
    try {
      const response = await axios.get(`/api/packages/allInventory`);
      setInventories(response.data);
      console.log('All Inventories:', response.data); // Logging all inventories
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllInventories();
  }, []); // Run only once on component mount

  // Create Inventories Dropdown Data
  const pkgData = inventories.map((inventory) => {
    return {
      value: inventory.itemID,
      label: inventory.itemName,

    };
  });


  // Delete an package
  const handleDeletePackage = async (packageId) => {
    try {
      // Make an HTTP request to delete the inventory by its ID
      await axios.delete(`/api/packages/deletePackage/${packageId}`);
      message.success('Inventory deleted successfully');
      fetchAllPackages();
    } catch (error) {
      console.error('Error deleting inventory:', error);
      message.error('Failed to delete inventory');
    }
  };

  //update package

  // Function to fetch package details by ID
  const fetchPackageById = async (packageId) => {
    try {
      const response = await axios.get(`/api/packages/getPackage/${packageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching package details:', error);
      throw new Error('Failed to fetch package details');
    }
  };
  // Function to handle editing package
  const handleEditPackage = async (packageId) => {
    try {
      const packageData = await fetchPackageById(packageId);
      // Set editPackageData with fetched package details
      setEditPackageData(packageData);
      // Populate editImages and editFileList with images from packageData
      setEditImages(packageData.contentImages.map((url, index) => ({
        uid: index,
        name: "image.png",
        status: "done",
        url: url,
      })));
      setEditFileList(packageData.contentImages.map((url, index) => ({
        uid: index,
        name: "image.png",
        status: "done",
        url: url,
      })));
      setIsEditModalOpen(true); // Open the Edit Package Modal
      console.log('Edit Package Data:', packageData); // Logging edit package data
    } catch (error) {
      console.error('Error handling edit package:', error);
      message.error('Failed to fetch package details');
    }
  };

  const handleUpdatePackage = async () => {
    try {
      // Send a PUT request to update the package to database
      const response = await axios.put(`/api/packages/updatePackage/${editPackageData._id}`, editPackageData);
      console.log('Package updated:', response.data);
      // Optionally, you can fetch all packages again to update the package list
      fetchAllPackages();
      message.success('Package updated successfully');
      setIsEditModalOpen(false); // Close the Edit Package Modal
    } catch (error) {
      console.error('Error updating package:', error);
      message.error('Failed to update package');
    }
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
            <Icon icon="mdi:delete" style={{ margin: "0 10px 0 0" }} onClick={() => handleDeletePackage(record._id)} />
            <Icon icon="mdi:pencil" style={{ margin: "0 5px 0 5px" }} onClick={() => handleEditPackage(record._id)} />
            <Icon icon="mdi:download" style={{ margin: "0 0 0 10px " }} />
          </button>
        </Space>
      ),
    },
  ];

  //upload images
  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
    if (extrasData.trim() !== '') {
      const updatedExtras = [...editPackageData.extras];
      updatedExtras.push(extrasData);
      setEditPackageData({ ...editPackageData, extras: updatedExtras });
      setExtrasData('');
    }
  };

  const handleRemoveInventory = (index) => {
    const updatedInventories = [...editPackageData.inventories];
    updatedInventories.splice(index, 1); // Remove the inventory at the specified index
    setEditPackageData({ ...editPackageData, inventories: updatedInventories });
  };


  const handelAddExtra = () => {
    setExtras([...extras, extrasData]);
    setExtrasData("");
    console.log(extras);
  }

  //search Filter

  const handleSearch = (value) => {
    // Convert search input to lowercase
    const searchValue = value.toLowerCase();

    // Filter messages based on search input (case-insensitive)
    const filtered = packageList.filter(pkg =>
      pkg.packageList.toLowerCase().includes(searchValue)
    );

    // Map the filtered messages to the items array format
    const searchResultItems = filtered.map((pkg, index) => ({
      label: pkg.packageList,
      key: index.toString(),
      name: pkg.packageId,

    }));

    // Set the filtered messages state
    setIsSearching(true);
    setFilteredMessages(searchResultItems);
    console.log(searchMessages)
  };


  return (
    <div>
      <div className='booking-package-insight-div'>
        <div className='booking-package-div-insight-left'></div>
        <div className='booking-package-div-insight-right'></div>
      </div>

      <div className='booking-package-details-change'>
        <div className='booking-package-details-change-top'>
          <div><Search
            placeholder="input search text"
            allowClear
            onSearch={handleSearch}
            style={{
              width: 300,
              margin: "5px 0 20px 0"
            }}
          /></div>
          <div></div>
          <div>
            <Modal
              title="Add New Package"
              visible={isAddModalOpen}
              onOk={handleAddPackage}
              onCancel={handleCancelAdd}
              width={1100}
            >
              <div className='package-details-add-model'>
                <div className='package-details-add-model-left'>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    Package Type
                    <Select
                      defaultValue=""
                      style={{ width: 250 }}
                      onChange={(value) => setNewPackageData({ ...newPackageData, packageType: value })}
                      options={[
                        { value: 'Basic', label: 'Basic' },
                        { value: 'Standard', label: 'Standard' },
                        { value: 'Premium', label: 'Premium' },
                      ]}
                    />
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Event Type</div>
                      <Select
                        defaultValue=""
                        style={{ width: 250 }}
                        onChange={(value) => setNewPackageData({ ...newPackageData, eventType: value })}
                        options={[
                          { value: 'Wedding', label: 'Wedding' },
                          { value: 'GetToGether', label: 'Get-Together' },
                          { value: 'Birthday', label: 'Birthday' },
                          { value: 'brideToBe', label: 'Bride To Be' },
                          { value: 'Farewell', label: 'Farewell Party' },
                          { value: 'Anniversary', label: 'Anniversary Party' },
                        ]}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Price</div>
                      <Input
                        placeholder="Enter price"
                        style={{ width: "250px" }}
                        onChange={(e) => setNewPackageData({ ...newPackageData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Inventories</div>
                      <Select
                        showSearch
                        mode="multiple" // Enable multiple selection
                        style={{ width: 250 }}
                        placeholder="Search Inventories"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? "").includes(input)}
                        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                        onChange={handleInventory} // Use handleInventory function
                        options={pkgData}
                      />
                      {/* Display selected inventories and quantity inputs */}
                      {Object.entries(inventoryQuantities).map(([inventoryId, quantity]) => {
                        // Find the inventory object from the inventories array based on its ID
                        const inventory = inventories.find(inv => inv.itemID === inventoryId);
                        if (inventory) {
                          return (
                            <div key={inventoryId} style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                              <span style={{ marginLeft: "5px" }}>{inventory.itemName}</span>
                              <span>
                                <Input
                                  style={{ width: 100, marginLeft: "10px" }}
                                  value={quantity}
                                  onChange={(e) => {
                                    const updatedQuantities = { ...inventoryQuantities, [inventoryId]: e.target.value };
                                    setInventoryQuantities(updatedQuantities);
                                    setNewPackageData(prevData => ({
                                      ...prevData,
                                      inventories: Object.keys(updatedQuantities).map(itemType => ({
                                        itemType,
                                        quantity: updatedQuantities[itemType]
                                      }))
                                    }));
                                  }}
                                />
                              </span>
                            </div>
                          );
                        } else {
                          return null; // Handle case where inventory is not found
                        }
                      })}

                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Description</div>
                      <TextArea
                        rows={4}
                        style={{ width: "250px" }}
                        onChange={(e) => setNewPackageData({ ...newPackageData, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Extras</div>
                      <Input
                        placeholder="Enter extras"
                        style={{ width: "250px" }}
                        onChange={(e) => setExtrasData(e.target.value)}
                      />
                      <button onClick={handelAddExtra} style={{
                        width: "50px", height: "30px",
                        border: "none", borderRadius: "5px",
                        marginTop: "5px", background: "#533c56", color: "white", cursor: "pointer",
                        marginLeft: "10px"
                      }}>
                        add
                      </button>
                      {extras.map((extra, index) => (
                        <Input
                          key={index}
                          style={{ width: "250px", border: "none", marginTop: "2px" }}
                          value={extra}
                          disabled
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className='package-details-add-model-right'>
                  <p style={{ marginTop: "10px" }}>Package Image</p>
                  <div className='package-details-add-model-right-top'>
                    {/* base img*/}
                    <Upload
                      customRequest={customRequest}
                      listType="picture-card"
                      fileList={editBaseImageFileList}
                      onPreview={handlePreview}
                      onChange={(info) => {
                        handleChange(info);
                        handleEditBaseImage(info.fileList);
                      }}
                    >
                      {editBaseImageFileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>
                  <p >Package Content</p>
                  <div className='package-details-add-model-right-down'>
                    {/* content img */}
                    <Upload
                      customRequest={customRequest}
                      listType="picture-card"
                      fileList={editFileList}
                      onPreview={handlePreview}
                      onChange={(info) => {
                        handleChange(info);
                        handleEditContentImages(info.fileList);
                      }}
                    >
                      {editFileList.length >= 4 ? null : uploadButton}
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
            </Modal>

            <button onClick={showModalAdd} style={{
              width: "100px", height: "40px", border: "none",
              borderRadius: "5px", background: "#533c56", color: "white", cursor: "pointer",
              fontSize: "16px", marginLeft: "20px",
            }}>
              Create New
            </button>
          </div>
        </div>
        <div><Table columns={columns} dataSource={packageList} /></div>
        <Modal
          title="Edit Package"
          visible={isEditModalOpen}
          onOk={handleUpdatePackage}
          onCancel={handleCancelEdit}
          width={1100}
        >
          <div className='package-details-add-model'>
            <div className='package-details-add-model-left'>
              <div style={{ display: "flex", flexDirection: "column" }}>
                Package Type
                <Select
                  defaultValue={editPackageData.packageType}
                  style={{ width: 250 }}
                  onChange={(value) => setEditPackageData({ ...editPackageData, packageType: value })}
                  options={[
                    { value: 'Basic', label: 'Basic' },
                    { value: 'Standard', label: 'Standard' },
                    { value: 'Premium', label: 'Premium' },
                  ]}
                />

                <div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Event Type</div>
                  <Select
                    defaultValue={editPackageData.eventType}
                    style={{ width: 250 }}
                    onChange={(value) => setEditPackageData({ ...editPackageData, eventType: value })}
                    options={[
                      { value: 'Wedding', label: 'Wedding' },
                      { value: 'Get-Together', label: 'Get-Together' },
                      { value: 'Birthday', label: 'Birthday' },
                      { value: 'Bride To Be', label: 'Bride To Be' },
                      { value: 'Farewell Party ', label: 'Farewell Party' },
                      { value: 'Anniversary Party', label: 'Anniversary Party' },
                    ]}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Price</div>
                  <Input
                    placeholder="Enter price"
                    style={{ width: "250px" }}
                    value={editPackageData.price}
                    onChange={(e) => setEditPackageData({ ...editPackageData, price: e.target.value })}
                  />
                </div>
                {/* Display existing inventories and quantity inputs */}
                <div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Inventories</div>
                  <Select
                    showSearch

                    style={{ width: 250 }}
                    placeholder="Search Inventories"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? "").includes(input)}
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    onChange={handleAddNewInventory} // Use handleAddNewInventory function to add new inventories
                    options={pkgData}
                  />
                  {/* Display selected inventories and quantity inputs */}
                  {editPackageData.inventories.map((inventory, index) => (
                    <div key={index} style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                      <span style={{ marginLeft: "5px" }}>{inventory.itemType}</span>
                      <span>
                        <Input
                          style={{ width: 100, marginLeft: "10px" }}
                          value={inventory.quantity}
                          onChange={(e) => handleEditInventoryQuantity(index, e.target.value)}
                        />
                        <button
                          style={{ marginLeft: "10px", background: "transparent", border: "none", color: "#f00", cursor: "pointer" }}
                          onClick={() => handleRemoveInventory(index)} // Call handleRemoveInventory function when the remove button is clicked
                        >
                          Remove
                        </button>
                      </span>
                    </div>
                  ))}

                </div>

                <div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Description</div>
                  <TextArea
                    rows={4}
                    style={{ width: "250px" }}
                    value={editPackageData.description}
                    onChange={(e) => setEditPackageData({ ...editPackageData, description: e.target.value })}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Extras</div>
                  <Input
                    placeholder="Enter extras"
                    style={{ width: "250px" }}
                    value={extrasData} // Display the value from state
                    onChange={(e) => setExtrasData(e.target.value)}
                  />
                  <button onClick={handleAddNewExtra} style={{
                    width: "50px", height: "30px",
                    border: "none", borderRadius: "5px",
                    marginTop: "5px", background: "#533c56", color: "white", cursor: "pointer",
                    marginLeft: "10px"
                  }}>
                    add
                  </button>
                  {editPackageData.extras.map((extra, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                      <Input
                        style={{ width: "250px", border: "none", marginTop: "5px" }}
                        value={extra}
                        onChange={(e) => handleEditExtra(index, e.target.value)}
                      />
                      <button
                        style={{
                          marginLeft: "10px",
                          background: "transparent",
                          border: "none",
                          color: "#f00",
                          cursor: "pointer"
                        }}
                        onClick={() => handleRemoveEditExtra(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                </div>

              </div>
              <div>
              </div>
            </div>
            <div className='package-details-add-model-right'>
              <p style={{ marginTop: "10px" }}>Package Image</p>
              <div className='package-details-add-model-right-top'>
                <Upload
                  customRequest={customRequest}
                  listType="picture-card"
                  fileList={editBaseImageFileList} // Use editBaseImageFileList to populate the file list
                  onPreview={handlePreview}
                  onChange={(info) => {
                    handleChange(info);
                    handleEditBaseImage(info.fileList);
                  }}
                >
                  {editBaseImageFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
              <p >Package Content</p>
              <div className='package-details-add-model-right-down'>
                <Upload
                  customRequest={customRequest}
                  listType="picture-card"
                  fileList={editFileList} // Use editFileList to populate the file list
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {editFileList.length >= 4 ? null : uploadButton}
                </Upload>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  )
}

export default Packages;
