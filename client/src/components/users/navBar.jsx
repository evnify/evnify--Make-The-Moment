import React, { useEffect, useState } from "react";
import { Button, Grid, Menu, Space, theme, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;

function NavBarUser() {
    const { token } = useToken();
    const screens = useBreakpoint();

    const navigate  = useNavigate();

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
                    key: "wedings",
                },
                {
                    label: "Birthdays",
                    key: "birthdays",
                },
                {
                    label: "Get Together",
                    key: "gettogether",
                },
                {
                    label: "Farewall Party",
                    key: "farewall",
                },
                {
                    label: "Bright to be",
                    key: "brighttobe",
                },
                {
                    label: "Aniversary",
                    key: "aniversary",
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

    const [current, setCurrent] = useState("home");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
        if (e.key === "home") {
            navigate("/");
        } else if (e.key === "about") {
            navigate("/contactus");
        } else if (e.key === "pricing") {
            navigate("/contactus/#about-us-section");
        } else if (e.key === "blog") {
            navigate("/blog");
        } else if (e.key === "wedings") {
            navigate("/packages/Wedding");
        }else if (e.key === "birthdays") {
            navigate("/packages/Birthday")
        } else if (e.key === "gettogether") {
            navigate("/packages/GetToGether")
        } else if (e.key === "farewall") {
            navigate("/packages/FarewallParty")
        }  else if (e.key === "brighttobe") {
            navigate("/packages/BrightToBe")
        } else if (e.key === "aniversary") {
            navigate("/packages/Aniversary")
        }
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
            marginTop:"15px"
        },
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            setCurrent("home");
        } else if (window.location.pathname === "/contactus") {
            setCurrent("about");
        } else if (window.location.pathname === "/contactus/") {
            setCurrent("pricing");
        } else if (window.location.pathname === "/blog") {
            setCurrent("blog");
        } else if (window.location.pathname === "/contactus") {
            setCurrent("contact us");
        } else if (window.location.pathname === "/packages/Wedding") {
            setCurrent("wedings");
        } else if (window.location.pathname === "/packages/Birthday") {
            setCurrent("birthdays");
        } else if (window.location.pathname === "/packages/GetToGether") {
            setCurrent("gettogether");
        } else if (window.location.pathname === "/packages/FarewallParty") {
            setCurrent("farewall");
        } else if (window.location.pathname === "/packages/BrightToBe") {
            setCurrent("brighttobe");
        } else if (window.location.pathname === "/packages/Aniversary") {
            setCurrent("aniversary");
        }
    }
    );

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBorderColor: "#99707E",
                        defaultHoverColor: "#99707E",
                    },
                    Menu: {
                        horizontalItemSelectedColor: "#533C56",
                        horizontalItemHoverColor: "#533C56",
                    },
                },
            }}
        >
            <nav style={styles.header}>
                <div style={styles.container}>
                    <div style={styles.menuContainer}>
                        <Link to="/"><img src={Logo} alt="logo" style={styles.logo} /></Link>
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
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    className="btn_signin"
                                    style={{ fontSize: "1.0rem" }}
                                >
                                    Log in
                                </Button>
                            </Link>
                        ) : null}
                        <Link to="/signup" style={{ textDecoration: "none" }}>
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
        </ConfigProvider>
    );
}

export default NavBarUser;
