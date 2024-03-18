import React, { useState } from "react";

import { Button, Grid, Menu, Space, theme } from "antd";

import { MenuOutlined } from "@ant-design/icons";

import Logo from "../../assets/logo/logo.png";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function App() {
    const { token } = useToken();
    const screens = useBreakpoint();

    const menuItems = [
        {
            label: "Home",
            key: "home",
        },
        {
            label: "About",
            key: "about",
        },
        {
            label: "Pricing",
            key: "pricing",
            children: [
                {
                    label: "Weddings",
                    key: "wedings:1",
                },
                {
                    label: "Birthdays",
                    key: "birthdays:2",
                },
            ],
        },
        {
            label: "Blog",
            key: "blog",
        },
        {
            label: "Contac Us",
            key: "contact us",
        },
        {
            img: "../../assets/userNavToggleicon.png",
            key: "Projects",
        },
    ];

    const [current, setCurrent] = useState("projects");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const styles = {
        container: {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth: token.screenXL,
            padding: screens.md
                ? `0px ${token.paddingLG}px`
                : `0px ${token.padding}px`,
        },
        header: {
            backgroundColor: token.colorBgContainer,
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
            position: "relative",
        },
        logo: {
            display: "block",
            height: token.sizeLG * 2, // Adjusting logo size
            width: 'auto', // Ensuring aspect ratio remains correct
            position: screens.md ? "static" : "absolute",
            top: "50%",
            transform: screens.md ? " " : "translate(-50%, -50%)",
        },
        menu: {
            backgroundColor: "transparent",
            borderBottom: "none",
            lineHeight: screens.sm ? "4rem" : "3.5rem",
            marginLeft: screens.md ? "0px" : `-${token.size}px`,
            width: screens.md ? "inherit" : token.sizeXXL,
            fontSize: "1.1rem",
        },
        menuContainer: {
            alignItems: "center",
            display: "flex",
            gap: token.size,
            width: "100%",
        },
    };

    return (
        <nav style={styles.header}>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <img src={Logo} alt="logo" style={styles.logo} />
                    <Menu
                        style={{
                            ...styles.menu,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        mode="horizontal"
                        items={menuItems}
                        onClick={onClick}
                        selectedKeys={screens.md ? [current] : ""}
                        overflowedIndicator={
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                            ></Button>
                        }
                    />
                </div>
                <Space >
                    {screens.md ? <Button type="text">Log in</Button> : ""}
                    <Button type="primary">Sign up</Button>
                </Space>
            </div>
        </nav>
    );
}
