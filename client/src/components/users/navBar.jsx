import React, { useState } from "react";
import { Button, Grid, Menu, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom"; 


const { useToken } = theme;
const { useBreakpoint } = Grid;

function NavBarUser() {
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
                {
                    label: "Get Together",
                    key: "gettogether:3",
                },
                {
                    label: "Farewall Party",
                    key: "farewall:4",
                },
                {
                    label: "Bright to be",
                    key: "brighttobe:5",
                },
                {
                    label: "Aniversary",
                    key: "aniversary:6",
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
            margin: "auto",
            maxWidth: token.screenXL,
        },
        header: {
            backgroundColor: token.colorBgContainer,
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
            position: "relative",
        },
        logo: {
            display: "block",
            height: screens.md ? token.sizeLG * 2 : token.sizeLG,
            width: "auto",
            position: screens.xl ? "static" : "absolute",
            top: "50%",
            transform: screens.md ? " " : "translate(-50%, -50%)",
        },
        menu: {
            backgroundColor: "transparent",
            borderBottom: "none",
            lineHeight: screens.sm ? "4rem" : "3.5rem",
            marginLeft: screens.xl ? "0px" : `-${token.size}px`,
            width: screens.xl ? "inherit" : token.sizeXXL,
            fontSize: screens.md ? "1.05rem" : "1rem",
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
                <Space>
                    {screens.md ? (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button
                                className="btn_signin"
                                style={{ fontSize: "1.0rem" }}
                            >
                                Log in
                            </Button>
                        </Link>
                    ) : null}
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button
                            className="btn_signup"
                            style={{ fontSize: "1.0rem" }}
                        >
                            Sign up
                        </Button>
                    </Link>
                </Space>
            </div>
        </nav>
    );
}

export default NavBarUser;
