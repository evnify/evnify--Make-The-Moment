import { React, useState, useEffect } from "react";
import { Input } from "antd";
import { Navbar, Footer } from "../../components";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Checkbox, Menu, DatePicker, Button } from "antd";
import { Carousel } from "primereact/carousel";
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

    useEffect(() => {
        setProducts([
            {
                id: "1000",
                code: "f230fh0g3",
                name: "Bamboo Watch",
                description: "Product Description",
                image: "bamboo-watch.jpg",
                price: 65,
                category: "Accessories",
                quantity: 24,
                inventoryStatus: "INSTOCK",
                rating: 5,
            },
            {
                id: "1001",
                code: "nvklal433",
                name: "Black Watch",
                description: "Product Description",
                image: "black-watch.jpg",
                price: 72,
                category: "Accessories",
                quantity: 61,
                inventoryStatus: "INSTOCK",
                rating: 4,
            },
            {
                id: "1002",
                code: "zz21cz3c1",
                name: "Blue Band",
                description: "Product Description",
                image: "blue-band.jpg",
                price: 79,
                category: "Fitness",
                quantity: 2,
                inventoryStatus: "LOWSTOCK",
                rating: 3,
            },
            {
                id: "1003",
                code: "244wgerg2",
                name: "Blue T-Shirt",
                description: "Product Description",
                image: "blue-t-shirt.jpg",
                price: 29,
                category: "Clothing",
                quantity: 25,
                inventoryStatus: "INSTOCK",
                rating: 5,
            },
            {
                id: "1004",
                code: "h456wer53",
                name: "Bracelet",
                description: "Product Description",
                image: "bracelet.jpg",
                price: 15,
                category: "Accessories",
                quantity: 73,
                inventoryStatus: "INSTOCK",
                rating: 4,
            },
            {
                id: "1005",
                code: "av2231fwg",
                name: "Brown Purse",
                description: "Product Description",
                image: "brown-purse.jpg",
                price: 120,
                category: "Accessories",
                quantity: 0,
                inventoryStatus: "OUTOFSTOCK",
                rating: 4,
            },
            {
                id: "1006",
                code: "bib36pfvm",
                name: "Chakra Bracelet",
                description: "Product Description",
                image: "chakra-bracelet.jpg",
                price: 32,
                category: "Accessories",
                quantity: 5,
                inventoryStatus: "LOWSTOCK",
                rating: 3,
            },
            {
                id: "1007",
                code: "mbvjkgip5",
                name: "Galaxy Earrings",
                description: "Product Description",
                image: "galaxy-earrings.jpg",
                price: 34,
                category: "Accessories",
                quantity: 23,
                inventoryStatus: "INSTOCK",
                rating: 5,
            },
            {
                id: "1008",
                code: "vbb124btr",
                name: "Game Controller",
                description: "Product Description",
                image: "game-controller.jpg",
                price: 99,
                category: "Electronics",
                quantity: 2,
                inventoryStatus: "LOWSTOCK",
                rating: 4,
            },
        ]);
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="Carousel_card_container">
                <div
                    className="Carousel_card_container_image"
                    style={{
                        backgroundImage: `url(https://s3-alpha-sig.figma.com/img/672a/15aa/ec109e9b7b26dfdacf4520bd38cb0dc4?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DfvMS8rkthOkCUS7wJ-a2~B9KRk~ZXO3wkhineYvtmi~fcf72vscoLxDk5YSsCH1lPL1aJ59CIodrgqDBhnel9whF71FvRsvfhEwuO2~22yDEsP5~UXl8qVcGYV6gfD2Hu~m8UK~O6WdVZBhxD0CZd-yaRIvaW9Je90X0MdH~OGehZ6F2nAwwgsfy0Mqm8pZscRi~Qfvy~6FpSsd3pDaSEYji6AWZyMwjgz-~WOAsBcDdnhuCbCjxHravnSWKX1L9Vm0Huo~-lAOtPTrLHC~US1UGwY4bpQfEQOQuVzpXc6eqsx7YpfCNMJBP~QZmoHnOaxLO0PR-pyxYpK80tuRyw__)`,
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
                        <h4>{product.name}</h4>
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
                        <h6>{product.price} LKR</h6>
                        <p>{product.inventoryStatus}</p>
                    </div>
                </div>
            </div>
        );
    };

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
                        responsiveOptions={responsiveOptions}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Tables</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="user_booking_corosal">
                    <h3>Cake Holders</h3>
                    <Carousel
                        value={products}
                        numScroll={1}
                        numVisible={4}
                        responsiveOptions={responsiveOptions}
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
