import React, { useEffect, useState } from "react";
import {
    Radio,
    Input,
    Table,
    Modal,
    Tag,
    Space,
    DatePicker,
    Button,
} from "antd";
import { Icon } from "@iconify/react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { CSVLink } from 'react-csv';
import moment from "moment";

const { confirm } = Modal;

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

    const showApproveConfirm = (id) => {
        confirm({
            centered: true,
            title: "Approve this Leave?",
            icon: <ExclamationCircleFilled />,
            content: "This action cannot be undone.",
            okText: "Approve",
            okType: "danger",
            okButtonProps: { color: "green" },
            cancelText: "Cancel",
            onOk() {
                approveLeave(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
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

    const showDeclineConfirm = (id) => {
        confirm({
            centered: true,
            title: "Decline this Leave?",
            icon: <ExclamationCircleFilled />,
            content: "This action cannot be undone.",
            okText: "Decline",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                declineLeave(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
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

    const generateLeaveCSVData = (leaveList) => {
        // Check if leaveList is empty or undefined
        if (!leaveList || leaveList.length === 0) return '';

        // Define CSV headers
        const headers = ['Leave ID', 'Name', 'Employee ID', 'Leave Type', 'Start Date', 'End Date', 'Reason', 'Status'];

        // Map leave requests to CSV rows
        const rows = leaveList.map(leave => [
            leave.leaveID,
            leave.name,
            leave.empID,
            leave.leaveType,
            moment(leave.startDate).format('YYYY-MM-DD'),
            moment(leave.endDate).format('YYYY-MM-DD'),
            leave.reason,
            leave.status,
        ]);

        // Combine headers and rows
        const csvData = [headers, ...rows];

        // Convert to CSV string
        const csvContent = csvData.map(row => row.join(',')).join('\n');

        return csvContent;
    };

    // Function to handle CSV export
    const handleExport = () => {
        const csvData = generateLeaveCSVData(leaveList); // Generate CSV data using leaveList
        if (csvData) {
            // Create a Blob object and initiate download
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'leave_requests.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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
                                onClick={() =>
                                    showApproveConfirm(record.leaveID)
                                }
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
                                onClick={() =>
                                    showDeclineConfirm(record.leaveID)
                                }
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

    // Filter leaves
    const [searchKey, setSearchKey] = useState("");
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    useEffect(() => {
        let tempList = leaveList;

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchKey) ||
                    item.leaveID.toLowerCase().includes(searchKey) ||
                    item.empID.toLowerCase().includes(searchKey)
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter((item) => item.status === selectedType);
        }

        setFilteredLeaves(tempList);
    }, [searchKey, selectedType, leaveList]);

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
                                <Input size="large" value={startDate} />
                            </div>
                        </div>
                        <div className="add_employee_popup_details_container_left">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "68px",
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
                                <Input size="large" value={leaveType} />
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
                                <Input size="large" value={endDate} />
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
                                onClick={() => showApproveConfirm(leaveID)}
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
                                onClick={() => showDeclineConfirm(leaveID)}
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
                        <h5>All Leaves</h5>
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
                    <button className="admin_leave_request_top_menu_button center" onClick={() => handleExport()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <path
                                d="M14.1 4.27778H3.9V0.5H14.1V4.27778ZM14.1 9.47222C14.3408 9.47222 14.5428 9.38156 14.706 9.20022C14.8692 9.01889 14.9506 8.79474 14.95 8.52778C14.95 8.26019 14.8684 8.03604 14.7052 7.85533C14.542 7.67463 14.3403 7.58396 14.1 7.58333C13.8592 7.58333 13.6574 7.674 13.4948 7.85533C13.3322 8.03667 13.2506 8.26081 13.25 8.52778C13.25 8.79537 13.3316 9.01983 13.4948 9.20117C13.658 9.3825 13.8597 9.47285 14.1 9.47222ZM12.4 15.6111V11.8333H5.6V15.6111H12.4ZM14.1 17.5H3.9V13.7222H0.5V8.05556C0.5 7.25278 0.747917 6.58002 1.24375 6.03728C1.73958 5.49454 2.34167 5.22285 3.05 5.22222H14.95C15.6725 5.22222 16.2783 5.49391 16.7673 6.03728C17.2563 6.58065 17.5006 7.25341 17.5 8.05556V13.7222H14.1V17.5Z"
                                fill="#F6F8F9"
                            />
                        </svg>
                        &nbsp;
                        Export
                    </button>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={filteredLeaves}
                            pagination={filteredLeaves.length >= 10 ? pagination : false}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveRequests;
