import React, { useState, useEffect } from "react";
import {
    Table,
    Radio,
    Input,
    Space,
    Tag,
    Select,
    Modal,
    DatePicker,
    Button,
    ConfigProvider,
    message,
} from "antd";
import { Icon } from "@iconify/react";
import moment from "moment";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

const { Search, TextArea } = Input;
const { confirm } = Modal;

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

    const deleteLeave = async (id) => {
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/leaves/deleteLeaveRequestByID`, {
                leaveID: id,
            });
            message.success("Leave request deleted successfully");
            fetchLeaves();
        } catch (error) {
            message.error("Something went wrong");
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
                deleteLeave(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
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
                    {record.status.toLowerCase() === "pending" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => editModelOpen(record)}
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
                                onClick={() => showDeclineConfirm(record.leaveID)}
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
                                disabled
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
                                disabled
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
                                disabled
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

    // Edit Leave Request
    const [leaveModelOpen, setLeaveModelOpen] = useState(false);
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reason, setReason] = useState("");
    const [leaveID, setLeaveID] = useState("");

    const editModelOpen = (record) => {
        console.log(record);
        setLeaveType(record.leaveType);
        setStartDate(record.startDate);
        setEndDate(record.endDate);
        setReason(record.reason);
        setLeaveID(record.leaveID);
        setLeaveModelOpen(true);
    };

    const onChangeFromDate = (date, dateString) => {
        setStartDate(dateString);
    };

    const onChangeToDate = (date, dateString) => {
        setEndDate(dateString);
    };

    const editLeaveRequest = async () => {
        if (!leaveType || !startDate || !endDate || !reason) {
            return message.error("Please fill all the fields");
        } else if (startDate > endDate) {
            return message.error("Start date should be less than end date");
        } else if (startDate < new Date().toISOString().split("T")[0]) {
            return message.error("Start date should be greater than today");
        }
        try {
            const leave = {
                leaveID,
                leaveType,
                startDate,
                endDate,
                reason,
            };
            await axios.post("/api/leaves/editLeaveRequestByID", leave);
            message.success("Leave request submitted successfully");
            setLeaveModelOpen(false);
            setEndDate(null);
            setStartDate(null);
            setLeaveType("");
            setReason("");
            fetchLeaves();
        } catch (error) {
            message.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            iconSize: "20px",
                            itemHeight: "40px",
                            subMenuItemBg: "#ffffff",
                        },
                        Button: {
                            colorPrimary: "#4f46e5",
                            colorPrimaryHover: "#3d36b2",
                        },
                    },
                }}
            >
                <Modal
                    title="Request for leave"
                    centered
                    open={leaveModelOpen}
                    onOk={() => setLeaveModelOpen(false)}
                    onCancel={() => setLeaveModelOpen(false)}
                    footer={null}
                >
                    <div className="request_leave_model_body_container">
                        <div style={{ marginTop: "10px" }}>
                            <span style={{ marginRight: "60px" }}>
                                Leave Type
                            </span>
                            <Select
                                value={leaveType}
                                style={{
                                    width: 320,
                                    height: 40,
                                }}
                                onChange={(value) => setLeaveType(value)}
                                options={[
                                    {
                                        value: "Sick Leave",
                                        label: "Sick Leave",
                                    },
                                    {
                                        value: "Half Leave",
                                        label: "Half Leave",
                                    },
                                    {
                                        value: "Casual Leave",
                                        label: "Casual Leave",
                                    },
                                ]}
                            />
                        </div>
                        <div style={{ marginTop: "25px" }}>
                            <span style={{ marginRight: "66px" }}>
                                Start Date
                            </span>
                            <DatePicker
                                style={{
                                    width: 320,
                                    height: 40,
                                }}
                                onChange={onChangeFromDate}
                                value={startDate ? moment(startDate) : null}
                            />
                        </div>
                        <div style={{ marginTop: "25px" }}>
                            <span style={{ marginRight: "72px" }}>
                                End Date
                            </span>
                            <DatePicker
                                style={{
                                    width: 320,
                                    height: 40,
                                }}
                                onChange={onChangeToDate}
                                value={endDate ? moment(endDate) : null}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "25px",
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <span style={{ marginRight: "84px" }}>Reason</span>
                            <TextArea
                                style={{
                                    width: 320,
                                }}
                                rows={6}
                                value={reason}
                                placeholder="Enter Reason for leave"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="leave_request_popup_footer_container center">
                        <Button
                            onClick={() => setLeaveModelOpen(false)}
                            style={{
                                width: "120px",
                                height: "40px",
                            }}
                            danger
                        >
                            Cancel
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={editLeaveRequest}
                            style={{
                                width: "120px",
                                height: "40px",
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
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
