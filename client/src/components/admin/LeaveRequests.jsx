import React, { useEffect, useState } from "react";
import { Radio, Input, Table, Modal, Tag, Space } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";

const { Search } = Input;

function LeaveRequests() {
    const [selectedType, setSelectedType] = useState("all");
    const [leaveList, setLeaveList] = useState([]);
    const [leaveRequestModelOpen,   setLeaveRequestModelOpen] = useState(false);
    const [leaveRequestModelContent, setLeaveRequestModelContent] = useState({});

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    useEffect(() => {
        const fetchLeaves = async () => {
            const leaveData = await axios.get(
                `${process.env.PUBLIC_URL}/api/leaves/getAllLeaves`
            );
            setLeaveList(leaveData.data);
        };
        fetchLeaves();
    }, []);

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
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Emp ID",
            dataIndex: "empID",
            key: "empID",
        },
        {
            title: "Type",
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
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "Pending" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#4CAF50",
                                    width: "90px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                Approve
                            </button>
                            <button
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#FF5151",
                                    width: "90px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                Decline
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => leaveModelContent(record)}

                            >
                                <Icon icon="carbon:view-filled" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#DCDCDC",
                                    width: "90px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                Approve
                            </button>
                            <button
                                style={{
                                    fontSize: "14px",
                                    border: "none",
                                    backgroundColor: "#DCDCDC",
                                    width: "90px",
                                    height: "35px",
                                    color: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                Decline
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => leaveModelContent(record)}

                            >
                                <Icon icon="carbon:view-filled" />
                            </button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const leaveModelContent = (record) => {
        setLeaveRequestModelOpen(true);
        setLeaveRequestModelContent(record);
    }

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Modal
                        centered
                        title="Description"
                        open={leaveRequestModelOpen}
                        onOk={() => setLeaveRequestModelOpen(false)}
                        onCancel={() => setLeaveRequestModelOpen(false)}
                        footer={null}
                        width={550}
                    >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Leave ID</h5>
                                <h5>{leaveRequestModelContent.leaveID}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Name</h5>
                                <h5>{leaveRequestModelContent.name}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Emp ID</h5>
                                <h5>{leaveRequestModelContent.empID}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Type</h5>
                                <h5>{leaveRequestModelContent.leaveType}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Start Date</h5>
                                <h5>{leaveRequestModelContent.startDate}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>End Date</h5>
                                <h5>{leaveRequestModelContent.endDate}</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ marginRight: "auto" }}>Reason</h5>
                                <h5>{leaveRequestModelContent.reason}</h5>
                            </div>
                        </div>
                    </Modal>
            <div className="admin_leave_request_container">
                <div className="admin_leave_request_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>All Employees</h5>
                        <Search
                            placeholder="Search "
                            size="large"
                            onSearch={onSearch}
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
                                width: 250,
                            }}
                        >
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="active">Active</Radio.Button>
                            <Radio.Button value="suspended">
                                Suspended
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={leaveList}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveRequests;
