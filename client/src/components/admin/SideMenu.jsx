import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import {logo_dark_with_tag} from '../../assets'

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
    getItem("Dashboard", "/admin", <Icon icon="material-symbols:dashboard-outline" />),
    getItem("Users", "sub1", <Icon icon="ph:user-bold" />, [
        getItem("Insights", "/admin/userinsights"),
        getItem("Users", "/admin/users"),
    ]),
    getItem("Packages", "/admin/packages", <Icon icon="ph:package-duotone" />),

    getItem("Inventory", "sub3", <Icon icon="ic:outline-inventory" />, [
        getItem("Insights", "/admin/inventoryinsights"),
        getItem("Inventory List", "/admin/inventorylist")
    ]),
    
    getItem("Bookings", "/admin/bookings", <Icon icon="mdi:cart-outline" />),

    getItem("Employees", "sub4", <Icon icon="healthicons:city-worker" />, [
        getItem("Employee List", "/admin/employeelist"),
        getItem("Leave Requests", "/admin/leaverequests")
    ]),
    getItem("Blogs", "sub5", <Icon icon="ri:news-line" />, [
        getItem("Add New", "/admin/addblog"),
        getItem("Existing Blog", "/admin/blogs")
    ]),
    getItem("Payments", "sub6", <Icon icon="mdi:auto-pay" />, [
        getItem("Insights", "/admin/paymentinsights"),
        getItem("Payroll", "/admin/payroll")
    ]),
    getItem("Messages", "sub7", <Icon icon="ri:message-2-line" />, [
        getItem("Insights", "/admin/messageinsights"),
        getItem("All Messages", "/admin/allmessages")
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7"];

function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(["/admin"]);
    const [selectedKeys, setSelectedKeys] = useState("/admin");

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
        <div className="Admin_SideMenu">
            <img src={logo_dark_with_tag} alt="logo" className="admin_sidebar_logo" />
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

export default SideMenu;
