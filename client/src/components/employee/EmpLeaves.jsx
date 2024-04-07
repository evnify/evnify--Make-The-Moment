import React, { useState, useEffect } from "react";
import { Table, Radio, Input, Space, Tag } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";

const { Search } = Input;

function EmpLeaves() {
    const [searchKey, setSearchKey] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });
    const [leavesList, setLeavesList] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: "Leave ID",
            dataIndex: "leaveID",
            key: "leaveID",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
                const date = new Date(createdAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            },
        },
        {
            title: "Leave Type",
            dataIndex: "leaveType",
            key: "leaveType",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                let color = "green";
                if (status === "Rejected") {
                    color = "red";
                } else if (status === "Pending") {
                    color = "orange";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "Pending" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="tabler:edit" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="mdi:download" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="tabler:edit" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
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
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const fetchLeaves = async () => {
        const leaveData = await axios.post(
            `${process.env.PUBLIC_URL}/api/leaves/getLeaveByEmpID`,
            {
                empID: "emp001",
            }
        );
        setLeavesList(leaveData.data);
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // Filter leaves
    useEffect(() => {
        let tempList = leavesList;

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter((item) =>
                item.leaveID.toLowerCase().includes(searchKey)
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter((item) => item.status === selectedType);
        }

        setFilteredLeaves(tempList);
    }, [searchKey, selectedType, leavesList]);

    return (
        <div>
            <div className="admin_leave_request_container">
                <div className="admin_leave_request_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>My Leaves</h5>
                        <Search
                            placeholder="Search "
                            size="large"
                            onSearch={(value) => setSearchKey(value)}
                            style={{
                                width: 265,
                                height: 40,
                            }}
                        />
                    </div>
                    <div style={{ marginLeft: "auto", alignItems: "center" }}>
                        <Radio.Group
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                            }}
                            size="large"
                            style={{
                                width: 350,
                            }}
                        >
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="Approved">
                                Approved
                            </Radio.Button>
                            <Radio.Button value="Pending">Pending</Radio.Button>
                            <Radio.Button value="Rejected">
                                Rejected
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={filteredLeaves}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpLeaves;
