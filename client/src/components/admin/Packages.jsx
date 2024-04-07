import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Select, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Icon } from "@iconify/react";
import axios from "axios";
const { TextArea } = Input;

function Packages() {

  const [packageList, setPackageList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [newPackageData, setNewPackageData] = useState({
    packageType: '',
    eventType: '',
    price: '',
    description: '',
    baseImage: 'https://s3-alpha-sig.figma.com/img/b6fa/f4a9/06e0655ca5fa95b62a51b0952…',
    inventories: [],
    extras: '',
    contentImages: [],
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackageData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
      setIsModalOpen(false);
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

  // fetch all inventories
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
      value: inventory.itemName,
      label: inventory.itemName,
    };
  });

  // Package table columns
  const columns = [
    {
      title: "Package ID",
      dataIndex: "PackageID",
      key: "PackageID",
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
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              fontSize: "20px",
              color: "#757171",
              border: "none",
              background: "transparent",
            }}
          >
            <Icon icon="mdi:download" />
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

  return (
    <div>
      <div className='booking-package-insight-div'>
        <div className='booking-package-div-insight-left'></div>
        <div className='booking-package-div-insight-right'></div>
      </div>

      <div className='booking-package-details-change'>
        <div className='booking-package-details-change-top'>
          <div>Search</div>
          <div>Filter</div>
          <div>
            <Modal
              title="Add New Package"
              visible={isModalOpen}
              onOk={handleAddPackage}
              onCancel={handleCancel}
              width={1100}
            >
              <div className='package-details-add-model'>
                <div className='package-details-add-model-left'>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    Package Type
                    <Select
                      defaultValue="Basic"
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
                        defaultValue="Wedding"
                        style={{ width: 250 }}
                        onChange={(value) => setNewPackageData({ ...newPackageData, eventType: value })}
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
                        onChange={(e) => setNewPackageData({ ...newPackageData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>Inventories</div>
                      <Select
                        showSearch
                        style={{ width: 200, height: 40 }}
                        placeholder="Search Inventories"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? "").includes(input)}
                        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                        onChange={(value) => setNewPackageData({ ...newPackageData, inventories: value })}
                        options={pkgData}
                      />
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
                        onChange={(e) => setNewPackageData({ ...newPackageData, extras: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className='package-details-add-model-right'>
                  <p style={{ marginTop: "10px" }}>Package Image</p>
                  <div className='package-details-add-model-right-top'>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                  <p >Package Content</p>
                  <div className='package-details-add-model-right-down'>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Modal>

            <button onClick={showModal} style={{
              width: "100px", height: "40px", border: "none",
              borderRadius: "5px", background: "#533c56", color: "white", cursor: "pointer",
              fontSize: "16px", marginLeft: "20px",
            }}>
              Create New
            </button>
          </div>
        </div>
        <div><Table columns={columns} dataSource={packageList} /></div>
      </div>
    </div>
  )
}

export default Packages;
