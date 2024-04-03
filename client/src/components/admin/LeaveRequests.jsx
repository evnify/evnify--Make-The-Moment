import React, { useEffect, useState } from "react";
import { Radio, Input, Table, Modal, Tag, Space, DatePicker, Button } from "antd";
import { Icon } from "@iconify/react";
import moment from "moment";
import axios from "axios";
import { set } from "mongoose";

const { Search, TextArea } = Input;

function LeaveRequests() {
    const [selectedType, setSelectedType] = useState("all");
    const [leaveList, setLeaveList] = useState([]);
    const [leaveRequestModelOpen, setLeaveRequestModelOpen] = useState(false);
    const [leaveRequestModelContent, setLeaveRequestModelContent] = useState(
        {}
    );

    const approveLeave = async (leaveID) => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/leaves/approveLeave`,
                {
                    leaveID,
                }
            );
            fetchLeaves();
            setLeaveRequestModelOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const declineLeave = async (leaveID) => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/leaves/declineLeave`,
                {
                    leaveID,
                }
            );
            fetchLeaves();
            setLeaveRequestModelOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const fetchLeaves = async () => {
        const leaveData = await axios.get(
            `${process.env.PUBLIC_URL}/api/leaves/getAllLeaves`
        );
        setLeaveList(leaveData.data);
    };

    useEffect(() => {
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
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
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
                                onClick={() => approveLeave(record.leaveID)}
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
                                onClick={() => declineLeave(record.leaveID)}
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
                                disabled
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
                                disabled
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

    //Model leave content
    const [name, setName] = useState("");
    const [leaveID, setLeaveID] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");
    const [empID, setEmpID] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const leaveModelContent = (record) => {
        setLeaveRequestModelOpen(true);
        setLeaveRequestModelContent(record);
        setName(record.name);
        setLeaveID(record.leaveID);
        setLeaveType(record.leaveType);
        setStartDate(record.startDate);
        setEndDate(record.endDate);
        setStatus(record.status);
        setReason(record.reason);
        setEmpID(record.empID);
        setCreatedAt(record.createdAt);
    };

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Modal
                centered
                open={leaveRequestModelOpen}
                onOk={() => setLeaveRequestModelOpen(false)}
                onCancel={() => setLeaveRequestModelOpen(false)}
                footer={null}
                width={550}
            >
                <div className="request_leave_model_body_container">

                    <div className="add_employee_popup_details_container">
                        <div className="add_employee_popup_details_container_left">
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Name
                                </span>
                                <Input
                                    size="large"
                                    
                                    value={name}
                                    onClick={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Emp ID
                                </span>
                                <Input
                                    type="email"
                                    size="large"
                                    value={empID}
                                    onClick={(e) => setEmpID(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    From Date
                                </span>
                                <Input
                                    size="large"
                                    value={startDate}
                                />
                            </div>
                        </div>
                        <div className="add_employee_popup_details_container_left">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height : "68px",
                                    display: "flex",
                                    alignItems: "flex-end",
                                }}
                                className="center"
                            >
                                {status === "Pending" ? (
                                    <Tag color="orange">Pending</Tag>
                                ) : status === "Approved" ? (
                                    <Tag color="green">Approved</Tag>
                                ) : (
                                    <Tag color="red">Rejected</Tag>
                                )}
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Type
                                </span>
                                <Input
                                    size="large"
                                    value={leaveType}
                                    
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    End Date
                                </span>
                                <Input
                                    size="large"
                                    value={endDate}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="add_emp_address_container">
                        <span>Reason</span>
                        <TextArea
                            style={{
                                width: 520,
                            }}
                            rows={4}
                            value={reason}
                            
                        />
                    </div>
                </div>
                <div className="add_emp_popup_footer_container center">
                {status === "Pending" ? (
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
                                onClick={() => approveLeave(leaveID)}
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
                                onClick={() => declineLeave(leaveID)}
                            >
                                Decline
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
                                disabled
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
                                disabled
                            >
                                Decline
                            </button>
                        </>
                    )}
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
