import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Menu, ConfigProvider } from "antd";
import Navbar from "../../components/users/navBar";

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
    getItem("Profile", "/userprofile", <Icon icon="iconamoon:profile" />),
    getItem("Booking", "/userprofile/booking", <Icon icon="prime:book" />),
    getItem("Settings", "/userprofile/setting", <Icon icon="uil:setting" />),
    getItem("Contact Us", "/userprofile/contactus",<Icon icon="grommet-icons:contact" />),
];

// submenu keys of first level
const rootSubmenuKeys = [];

function UserSideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(["/userprofile"]);
    const [selectedKeys, setSelectedKeys] = useState("/userprofile");

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
        <>
            
            <div className="User_SideMenu">
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
        </>
    );
}

export default UserSideMenu;
