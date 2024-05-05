import React, { useState, useEffect } from "react";
import {
    Button,
    Dropdown,
    Space,
    Avatar,
    ConfigProvider,
    Grid,
    theme,
    Menu,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

const { useToken } = theme;
const { useBreakpoint } = Grid;

function NavBarUser() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [user, setUser] = useState(null);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchUserByID = async () => {
            // Retrieve user from localStorage
            const userJSON = localStorage.getItem("currentUser");
    
            // Check if user exists in localStorage
            if (!userJSON) {
                console.error("User not found in localStorage.");
                return;
            }
    
            // Parse user JSON
            const user = JSON.parse(userJSON);
    
            // Check if user has a valid userID
            if (!user || !user.userID) {
                console.error("Invalid user object or userID not found.");
                return;
            }
    
            const userID = { userID: user.userID };
    
            try {
                // Fetch user data by ID
                const res = await axios.post("/api/users/getUserById", userID);
                setUser(res.data);
                setFileList([
                    {
                        uid: "1",
                        name: "image.png",
                        status: "done",
                        url: res.data.profilePic,
                    },
                ]);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserByID();
    }, []);
    

    function logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem('selectedCategory');
        window.location.href = "/login";
    }
    const navigate = useNavigate();

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
            key: "contactus",
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
            
        } else if (e.key === "blog") {
            navigate("/blog");
        } else if (e.key === "wedings") {
            navigate("/packages/Wedding");
        } else if (e.key === "birthdays") {
            navigate("/packages/Birthday");
        } else if (e.key === "gettogether") {
            navigate("/packages/GetToGether");
        } else if (e.key === "farewall") {
            navigate("/packages/FarewallParty");
        } else if (e.key === "brighttobe") {
            navigate("/packages/BrightToBe");
        } else if (e.key === "aniversary") {
            navigate("/packages/Aniversary");
        } else if (e.key === "contactus") {
            navigate("/contactus");
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
            marginTop: "15px",
        },
    };

    const items = [
        {
            label: (
                <a
                    style={{ textDecoration: "none" }}
                    rel="noopener noreferrer"
                    href="/userprofile"
                >
                    My Account
                </a>
            ),
            key: "0",
        },
        user && user.userType !== "Customer" && {
            label: (
                <a
                    style={{ textDecoration: "none" }}
                    href="/admin"
                >
                    Admin
                </a>
            ),
            key: "admin",
        },
        {
            label: (
                <a
                    style={{ textDecoration: "none" }}
                    href="/login"
                    onClick={logout}
                >
                    Log Out
                </a>
            ),
            key: "2",
        },
    ];
    
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
    });

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
                        <Link to="/">
                            <img src={Logo} alt="logo" style={styles.logo} />
                        </Link>
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
                    {user ? (
                        <>
                            <div className="navbar_alogin">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12.0015 22C13.3066 22 14.3745 21.0769 14.3745 19.9487H9.62843C9.62843 20.4928 9.87845 21.0145 10.3235 21.3992C10.7685 21.7839 11.3721 22 12.0015 22ZM19.1205 15.8462V10.7179C19.1205 7.56923 17.1747 4.93333 13.7812 4.2359V3.53846C13.7812 2.68718 12.9863 2 12.0015 2C11.0167 2 10.2217 2.68718 10.2217 3.53846V4.2359C6.8164 4.93333 4.88238 7.55897 4.88238 10.7179V15.8462L3.35177 17.1692C2.60427 17.8154 3.12634 18.9231 4.18233 18.9231H19.8087C20.8647 18.9231 21.3987 17.8154 20.6512 17.1692L19.1205 15.8462Z"
                                        fill="#B2B2B2"
                                    />
                                    <circle
                                        cx="17"
                                        cy="7"
                                        r="4.5"
                                        fill="#FF5151"
                                        stroke="white"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M3 5.35403C3 4.72971 3.23705 4.13095 3.65901 3.68948C4.08097 3.24801 4.65326 3 5.25 3H18.75C19.3467 3 19.919 3.24801 20.341 3.68948C20.7629 4.13095 21 4.72971 21 5.35403V14.7702C21 15.3945 20.7629 15.9933 20.341 16.4347C19.919 16.8762 19.3467 17.1242 18.75 17.1242H7.96575C7.66741 17.1243 7.3813 17.2483 7.17037 17.4691L3.96075 20.8271C3.88215 20.9095 3.78193 20.9657 3.67279 20.9886C3.56365 21.0114 3.45049 20.9999 3.34762 20.9554C3.24476 20.9109 3.15683 20.8355 3.09495 20.7387C3.03307 20.6419 3.00002 20.5281 3 20.4116V5.35403ZM8.625 10.0621C8.625 9.74994 8.50647 9.45056 8.2955 9.22983C8.08452 9.00909 7.79837 8.88509 7.5 8.88509C7.20163 8.88509 6.91548 9.00909 6.7045 9.22983C6.49353 9.45056 6.375 9.74994 6.375 10.0621C6.375 10.3743 6.49353 10.6736 6.7045 10.8944C6.91548 11.1151 7.20163 11.2391 7.5 11.2391C7.79837 11.2391 8.08452 11.1151 8.2955 10.8944C8.50647 10.6736 8.625 10.3743 8.625 10.0621ZM13.125 10.0621C13.125 9.74994 13.0065 9.45056 12.7955 9.22983C12.5845 9.00909 12.2984 8.88509 12 8.88509C11.7016 8.88509 11.4155 9.00909 11.2045 9.22983C10.9935 9.45056 10.875 9.74994 10.875 10.0621C10.875 10.3743 10.9935 10.6736 11.2045 10.8944C11.4155 11.1151 11.7016 11.2391 12 11.2391C12.2984 11.2391 12.5845 11.1151 12.7955 10.8944C13.0065 10.6736 13.125 10.3743 13.125 10.0621ZM16.5 11.2391C16.7984 11.2391 17.0845 11.1151 17.2955 10.8944C17.5065 10.6736 17.625 10.3743 17.625 10.0621C17.625 9.74994 17.5065 9.45056 17.2955 9.22983C17.0845 9.00909 16.7984 8.88509 16.5 8.88509C16.2016 8.88509 15.9155 9.00909 15.7045 9.22983C15.4935 9.45056 15.375 9.74994 15.375 10.0621C15.375 10.3743 15.4935 10.6736 15.7045 10.8944C15.9155 11.1151 16.2016 11.2391 16.5 11.2391Z"
                                        fill="#B2B2B2"
                                    />
                                </svg>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Dropdown: {
                                                sizePopupArrow: "10px",
                                            },
                                        },
                                    }}
                                >
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                    >
                                        <a
                                            onClick={(e) => e.preventDefault()}
                                            style={{
                                                textDecoration: "none",
                                                color: "#454545",
                                            }}
                                        >
                                            <Space>
                                                <Avatar
                                                    size={30}
                                                    src={
                                                        <img
                                                            src={
                                                                user.profilePic
                                                            }
                                                            alt="avatar"
                                                        />
                                                    }
                                                />
                                                {user.username}
                                                <Icon icon="gridicons:dropdown" />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </ConfigProvider>
                            </div>
                        </>
                    ) : (
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
                            <Link
                                to="/signup"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    className="btn_signup"
                                    style={{ fontSize: "1.0rem" }}
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </Space>
                    )}
                </div>
            </nav>
        </ConfigProvider>
    );
}

export default NavBarUser;
