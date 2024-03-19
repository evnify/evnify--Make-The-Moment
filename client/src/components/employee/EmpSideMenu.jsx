import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

import { Menu, ConfigProvider } from "antd";

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
    getItem("Statistics", "/employee", <Icon icon="streamline:graph-bar-increase" />),
    getItem("Assigned Events", "/employee/events", <Icon icon="ic:round-event-note" />),
    getItem("My Leaves", "/employee/leaves", <Icon icon="pepicons-pop:leave" />),
    getItem("Salary", "/employee/salary", <Icon icon="mdi:auto-pay" />),
];

// submenu keys of first level
const rootSubmenuKeys = [];

function EmpSideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(["/employee"]);
    const [selectedKeys, setSelectedKeys] = useState("/employee");

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
    return (
        <div className="Emp_SideMenu">
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            iconSize: "20px",
                            itemHeight: "40px",
                            subMenuItemBg : "#ffffff",
                        },
                    },
                }}
            >
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={[selectedKeys]}
                    onOpenChange={onOpenChange}
                    onClick={(item) => {
                        // Navigate to the clicked item's key
                        navigate(item.key);
                    }}
                    style={{
                        width: 256,
                        textAlign: "left",
                    }}
                    items={items}
                />
            </ConfigProvider>
        </div>
    );
}

export default EmpSideMenu;
