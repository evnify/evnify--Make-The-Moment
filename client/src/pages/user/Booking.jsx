import { React, useState, useEffect } from "react";
import { Input } from "antd";
import { Navbar, Footer } from "../../components";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Checkbox, Menu, DatePicker, Button } from "antd";
import { Carousel } from "primereact/carousel";
import axios from "axios";
const { Search } = Input;

// Side Menu
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
    getItem("Category", "sub1", null, [
        <Menu.Item key="chairs">
            <Checkbox>Chairs</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Tables</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Cake Holders</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Plates</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Wine Glasses</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Other</Checkbox>
        </Menu.Item>,
    ]),
    getItem("Color", "sub2", null, [
        <div className="itemColorBtn_72">
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn1"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Black</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn2"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Brown</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn3"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">White</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn4"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Red</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn5"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Grey</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn6"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Tan</span>
            </div>
        </div>,
    ]),
];

// Main Component
const onSearch = (value, _e, info) => console.log(info?.source, value);
function Booking() {
    const [navbarSticky, setNavbarSticky] = useState(true);
    const { category, id } = useParams();

    // handel scroll view
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById("footer");
            const navbar = document.getElementById("navbar");

            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                const navbarHeight = navbar.offsetHeight;

                if (footerTop < window.innerHeight) {
                    setNavbarSticky(false);
                    navbar.style.position = "absolute";
                    navbar.style.top = footerTop - navbarHeight + "px";
                } else {
                    setNavbarSticky(true);
                    navbar.style.position = "sticky";
                    navbar.style.top = "0";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [date, setDate] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    //Carousel Functions
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const productTemplate = (product) => {
        return (
            <div className="Carousel_card_container">
                <div
                    className="Carousel_card_container_image"
                    style={{
                        backgroundImage: `url(${product[0].itemImage})`,
                    }}
                ></div>
                <div className="Carousel_card_container_description">
                    <div
                        className="center"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <h4>{product[0].itemName}</h4>
                        <ShoppingCartOutlined
                            style={{ fontSize: "20px", margin: "0 20px 0 0" }}
                        />
                    </div>
                    <div
                        className="center"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <h6>{product[0].unitPrice} LKR</h6>
                        <p>{product[0].inventoryStatus}</p>
                    </div>
                </div>
            </div>
        );
    };

    // Fetch data from the database
    const [selectedPackage, setSelectedPackage] = useState([]);
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.post(
                    `${process.env.PUBLIC_URL}/api/packages/getBookingByID`,
                    {
                        _id: id,
                    }
                );
                setSelectedPackage(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookingDetails();
    }, [id]);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                console.log(selectedPackage);
                if (selectedPackage) {
                    console.log("Selected type", selectedPackage);
                    let temp = selectedPackage[0].inventories;
                    let inventories = [];
                    for (let i = 0; i < temp.length; i++) {
                        console.log(temp[i].id);
                        const response = await axios.post(
                            `${process.env.PUBLIC_URL}/api/packages/getInventoryByID`,
                            {
                                itemID: temp[i].id,
                            }
                        );
                        if (response.data.length > 0) {
                            inventories.push(response.data);
                        }
                    }
                    console.log(inventories);
                    setProducts(inventories);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchInventories();
    }, [selectedPackage]);


    //Filters

    return (
        <div style={{ backgroundColor: "#efefef" }}>
            <div
                id="navbar"
                style={{
                    position: navbarSticky ? "sticky" : "absolute",
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Navbar />
            </div>
            <div style={{ position: "absolute" }}>
                <div>
                    <div className="sideBar_72">
                        <p>
                            <b>Products</b>
                        </p>
                        <hr />
                        <Menu
                            //onClick={onClick}
                            style={{
                                width: 256,
                            }}
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1", "sub2"]}
                            mode="inline"
                        >
                            {items.map((item) => (
                                <Menu.SubMenu key={item.key} title={item.label}>
                                    {item.children}
                                </Menu.SubMenu>
                            ))}
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="booking_page_main_container">
                <div className="user_booking_page_filter">
                    <DatePicker
                        onChange={(date, dateString) => setDate(dateString)}
                        style={{
                            width: 250,
                            height: 40,
                        }}
                    />
                    <div className="center">
                        <Search
                            placeholder="Search"
                            allowClear
                            onSearch={(value) => setSearchKey(value)}
                            size="large"
                            style={{
                                width: 300,
                                height: 40,
                            }}
                        />
                        <ShoppingCartOutlined
                            style={{ fontSize: "25px", margin: "0 60px" }}
                        />
                    </div>
                </div>

                <div className="user_booking_corosal">
                    <h3>Chairs</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Tables</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Cake Holders</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Plates</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Wine Glasses</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Other</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div
                    className="center"
                    style={{ width: "100%", margin: "20px 0 80px 0" }}
                >
                    <button className="createBookingBtn_72 ">
                        CONTINUE TO CHECKOUT
                    </button>
                </div>
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    );
}

export default Booking;
