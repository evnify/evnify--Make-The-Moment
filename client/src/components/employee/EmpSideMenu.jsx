import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logo_dark_with_tag } from "../../assets";

import {
    Menu,
    ConfigProvider,
    Modal,
    Select,
    DatePicker,
    Input,
    Button,
} from "antd";

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
        "Assigned Events",
        "/employee/events",
        <Icon icon="ic:round-event-note" />
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
        console.log(date, dateString);
    };

    const onChangeToDate = (date, dateString) => {
        console.log(date, dateString);
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
                        }
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
                                defaultValue="sick leave"
                                style={{
                                    width: 320,
                                    height: 40,
                                }}
                                onChange={(value) => console.log(value)}
                                options={[
                                    {
                                        value: "sick leave",
                                        label: "Sick Leave",
                                    },
                                    {
                                        value: "half leave",
                                        label: "Half Leave",
                                    },
                                    {
                                        value: "casual leave",
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
                                placeholder="Enter Reason for leave"
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
                            onClick={() => setLeaveModelOpen(false)}
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
                <button className="emp_logout_btn">
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
