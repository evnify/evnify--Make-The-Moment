import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logo_dark_with_tag } from "../../assets";
import axios from "axios";

import {
    Menu,
    ConfigProvider,
    Modal,
    Select,
    DatePicker,
    Input,
    Button,
    message,
} from "antd";
import moment from "moment";

const { TextArea } = Input;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        "Statistics",
        "/employee",
        <Icon icon="streamline:graph-bar-increase" />
    ),
    getItem(
        "My Leaves",
        "/employee/leaves",
        <Icon icon="pepicons-pop:leave" />
    ),
    getItem("Salary", "/employee/salary", <Icon icon="mdi:auto-pay" />),
];

const rootSubmenuKeys = [];

function EmpSideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(["/employee"]);
    const [selectedKeys, setSelectedKeys] = useState("/employee");
    const [leaveModelOpen, setLeaveModelOpen] = useState(false);
    const [employee, setEmployee] = useState({});

    // Leave Request model use states
    const [leaveType, setLeaveType] = useState("Sick leave");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onChangeFromDate = (date, dateString) => {
        setStartDate(dateString);
    };

    const onChangeToDate = (date, dateString) => {
        setEndDate(dateString);
    };

    const FetchEmployeeByUserID = async (userID) => {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/getEmployeeByUserID`,
                {
                    userID: userID,
                }
            );
            setEmployee(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    function calculateTotalDaysBetweenDates(startDateStr, endDateStr) {
        var startDate = new Date(startDateStr);
        var endDate = new Date(endDateStr);
        var difference = endDate - startDate;

        var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

        return daysDifference;
    }

    useEffect(() => {
        const emp = JSON.parse(localStorage.getItem("currentUser"));
        FetchEmployeeByUserID(emp.userID);
    }, []);

    const submitLeaveRequest = async () => {
        if (!leaveType || !startDate || !endDate || !reason) {
            return message.error("Please fill all the fields");
        } else if (startDate > endDate) {
            return message.error("Start date should be less than end date");
        } else if (startDate < new Date().toISOString().split("T")[0]) {
            return message.error("Start date should be greater than today");
        } else if (
            employee.leavesBalance[2].casualLeave -
                employee.leavesBalance[2].casualUsed ==
                0 ||
            employee.leavesBalance[2].casualLeave -
                employee.leavesBalance[2].casualUsed -
                calculateTotalDaysBetweenDates(startDate, endDate) <
                0
        ) {
            return message.error(
                "Your casual leave balance is not enough for this leave request"
            );
        } else if (
            employee.leavesBalance[1].sickLeave -
            employee.leavesBalance[1].sickUsed == 0 || employee.leavesBalance[1].sickLeave - employee.leavesBalance[1].sickUsed - calculateTotalDaysBetweenDates(startDate, endDate) < 0
        ){
            return message.error("Your sick leave balance is not enough for this leave request");
        }
        else if (employee.leavesBalance[0].halfLeave -
            employee.leavesBalance[0].halfUsed == 0 || employee.leavesBalance[0].halfLeave - employee.leavesBalance[0].halfUsed - calculateTotalDaysBetweenDates(startDate, endDate) < 0){
            return message.error("Your half leave balance is not enough for this leave request");
        }

            try {
                const leave = {
                    empID: employee.empID,
                    leaveType,
                    startDate,
                    endDate,
                    reason,
                    name: employee.firstName + " " + employee.lastName,
                };
                await axios.post("/api/leaves/newLeave", leave);
                message.success("Leave request submitted successfully");
                setLeaveModelOpen(false);
                setEndDate(null);
                setStartDate(null);
                setLeaveType("");
                setReason("");
                navigate("/employee");
            } catch (error) {
                console.log(error);
            }
    };

    return (
        <div className="Emp_SideMenu">
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
                <div className="emp_dashboard_logo_container">
                    <img
                        src={logo_dark_with_tag}
                        alt="logo"
                        className="emp_dashboard_logo"
                    />
                </div>
                <div className="request_leave_btn_container center">
                    <button
                        className="request_leave_btn"
                        onClick={() => setLeaveModelOpen(true)}
                    >
                        Request Leave
                    </button>
                </div>
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
                            onClick={submitLeaveRequest}
                            style={{
                                width: "120px",
                                height: "40px",
                            }}
                        >
                            Request
                        </Button>
                    </div>
                </Modal>

                <div className="employee_sidebar_container">
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={[selectedKeys]}
                        onOpenChange={onOpenChange}
                        onClick={(item) => {
                            navigate(item.key);
                        }}
                        style={{
                            width: 246,
                            textAlign: "left",
                        }}
                        items={items}
                    />
                </div>
            </ConfigProvider>

            <div className="emp_logout_btn_Container center">
                <button
                    className="emp_logout_btn"
                    onClick={() => {
                        localStorage.removeItem("currentUser");
                        navigate("/login");
                    }}
                >
                    <Icon
                        icon="ic:baseline-logout"
                        style={{ marginRight: "10px" }}
                    />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default EmpSideMenu;
