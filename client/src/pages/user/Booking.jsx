import { React, useState, useEffect } from "react";
import { Input } from "antd";
import { Navbar, Footer, PaymentForm } from "../../components";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import moment from "moment";
import {
    Checkbox,
    Menu,
    DatePicker,
    Button,
    Modal,
    message,
    ConfigProvider,
    Steps,
    Radio,
    Cascader,
} from "antd";
import { Icon } from "@iconify/react";
import { Carousel } from "primereact/carousel";
import axios, { all } from "axios";
import { Loader } from "../../components/admin";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
// add billing address
const options = [
    {
        value: "Colombo",
        label: "Colombo",
        price: 200,
    },
    {
        value: "Gampaha",
        label: "Gampaha",
        price: 250,
    },
    {
        value: "Kalutara",
        label: "Kalutara",
        price: 300,
    },
    {
        value: "Kandy",
        label: "Kandy",
        price: 350,
    },
    {
        value: "Matale",
        label: "Matale",
        price: 350,
    },
    {
        value: "Nuwara Eliya",
        label: "Nuwara Eliya",
        price: 400,
    },
    {
        value: "Galle",
        label: "Galle",
        price: 400,
    },
    {
        value: "Matara",
        label: "Matara",
        price: 450,
    },
    {
        value: "Hambantota",
        label: "Hambantota",
        price: 500,
    },
    {
        value: "Jaffna",
        label: "Jaffna",
        price: 600,
    },
    {
        value: "Kilinochchi",
        label: "Kilinochchi",
        price: 650,
    },
    {
        value: "Mannar",
        label: "Mannar",
        price: 650,
    },
    {
        value: "Mullaitivu",
        label: "Mullaitivu",
        price: 650,
    },
    {
        value: "Vavuniya",
        label: "Vavuniya",
        price: 650,
    },
    {
        value: "Trincomalee",
        label: "Trincomalee",
        price: 550,
    },
    {
        value: "Batticaloa",
        label: "Batticaloa",
        price: 600,
    },
    {
        value: "Ampara",
        label: "Ampara",
        price: 600,
    },
    {
        value: "Badulla",
        label: "Badulla",
        price: 450,
    },
    {
        value: "Monaragala",
        label: "Monaragala",
        price: 500,
    },
    {
        value: "Ratnapura",
        label: "Ratnapura",
        price: 350,
    },
    {
        value: "Kegalle",
        label: "Kegalle",
        price: 300,
    },
    {
        value: "Anuradhapura",
        label: "Anuradhapura",
        price: 500,
    },
    {
        value: "Polonnaruwa",
        label: "Polonnaruwa",
        price: 550,
    },
    {
        value: "Puttalam",
        label: "Puttalam",
        price: 400,
    },
    {
        value: "Kurunegala",
        label: "Kurunegala",
        price: 300,
    },
];
const filter = (inputValue, path) => {
    return path.some(
        (option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
};
// Main Component
function Booking() {
    const [navbarSticky, setNavbarSticky] = useState(true);
    const { category, id } = useParams();
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewProduct, setPreviewProduct] = useState({});

    //Filters
    const [chairsFilter, setChairsFilter] = useState(false);
    const [tablesFilter, setTablesFilter] = useState(false);
    const [cakeHoldersFilter, setCakeHoldersFilter] = useState(false);
    const [platesFilter, setPlatesFilter] = useState(false);
    const [glassesFilter, setWineGlassesFilter] = useState(false);
    const [decorationsFilter, setDecorationsFilter] = useState(false);
    const [allFilter, setAllFilter] = useState(true);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const items = [
        getItem("Category", "sub1", null, [
            <Menu.Item key="all">
                <Checkbox
                    checked={allFilter}
                    onChange={() => {
                        setAllFilter(!allFilter);
                        setChairsFilter(false);
                        setTablesFilter(false);
                        setCakeHoldersFilter(false);
                        setPlatesFilter(false);
                        setWineGlassesFilter(false);
                        setDecorationsFilter(false);
                    }}
                >
                    All
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="chairs">
                <Checkbox
                    checked={chairsFilter}
                    onChange={() => {
                        setChairsFilter(!chairsFilter);
                        setAllFilter(false);
                    }}
                >
                    Chairs
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="tables">
                <Checkbox
                    checked={tablesFilter}
                    onChange={(e) => {
                        setTablesFilter(!tablesFilter);
                        setAllFilter(false);
                    }}
                >
                    Tables
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="cakeHolders">
                <Checkbox
                    checked={cakeHoldersFilter}
                    onChange={() => {
                        setCakeHoldersFilter(!cakeHoldersFilter);
                        setAllFilter(false);
                    }}
                >
                    Cake Holders
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="plates">
                <Checkbox
                    checked={platesFilter}
                    onChange={() => {
                        setPlatesFilter(!platesFilter);
                        setAllFilter(false);
                    }}
                >
                    Plates
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="glassesFilter">
                <Checkbox
                    checked={glassesFilter}
                    onChange={() => {
                        setWineGlassesFilter(!glassesFilter);
                        setAllFilter(false);
                    }}
                >
                    Glasses
                </Checkbox>
            </Menu.Item>,
            <Menu.Item key="decorations">
                <Checkbox
                    checked={decorationsFilter}
                    onChange={() => {
                        setDecorationsFilter(!decorationsFilter);
                        setAllFilter(false);
                    }}
                >
                    Decorations
                </Checkbox>
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
                        onClick={() => setColor("Black")}
                    ></Button>
                    <span className="colorText">Black</span>
                </div>
                <div className="colorBtnContainer">
                    <Button
                        type="primary"
                        className="colorBtn2"
                        shape="circle"
                        style={{ marginRight: "8px" }}
                        onClick={() => setColor("Brown")}
                    ></Button>
                    <span className="colorText">Brown</span>
                </div>
                <div className="colorBtnContainer">
                    <Button
                        type="primary"
                        className="colorBtn3"
                        shape="circle"
                        style={{ marginRight: "8px" }}
                        onClick={() => setColor("White")}
                    ></Button>
                    <span className="colorText">White</span>
                </div>
                <div className="colorBtnContainer">
                    <Button
                        type="primary"
                        className="colorBtn4"
                        shape="circle"
                        style={{ marginRight: "8px" }}
                        onClick={() => setColor("Red")}
                    ></Button>
                    <span className="colorText">Red</span>
                </div>
                <div className="colorBtnContainer">
                    <Button
                        type="primary"
                        className="colorBtn5"
                        shape="circle"
                        style={{ marginRight: "8px" }}
                        onClick={() => setColor("Grey")}
                    ></Button>
                    <span className="colorText">Grey</span>
                </div>
                <div className="colorBtnContainer">
                    <Button
                        type="primary"
                        className="colorBtn6"
                        shape="circle"
                        style={{ marginRight: "8px" }}
                        onClick={() => setColor("Tan")}
                    ></Button>
                    <span className="colorText">Tan</span>
                </div>
            </div>,
        ]),
    ];

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
                    navbar.style.display = "none";
                    navbar.style.top = footerTop - navbarHeight + "px";
                } else {
                    setNavbarSticky(true);
                    navbar.style.display = "block";
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

    // fetch user id
    const [userId, setUserId] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
        setUserId(userID);
    }, []);

    const [date, setDate] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    //Cart Functions
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        if (cart.length == 0) {
            setBookingModal(false);
        }
    }, [cart]);

    const addToCart = (product) => {
        const itemInCartIndex = cart.findIndex(
            (item) => item.itemID === product.itemID
        );

        if (itemInCartIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[itemInCartIndex].addedQty += 1;
            setCart(updatedCart);
        } else {
            const newItem = {
                _id: product._id,
                itemID: product.itemID,
                itemName: product.itemName,
                itemImage: product.itemImage,
                color: product.color,
                itemType: product.itemType,
                addedQty: 1,
                category: product.category,
                unitPrice: product.unitPrice,
            };
            setCart([...cart, newItem]);
        }
        message.success("Item added to cart");
    };

    const handleChangeQty = (e, itemId) => {
        if (e.target.value < 1) {
            return message.error("Quantity cannot be less than 1");
        }
        const updatedCart = cart.map((item) =>
            item.itemID === itemId
                ? { ...item, addedQty: parseInt(e.target.value, 10) }
                : item
        );
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.unitPrice * item.addedQty,
            0
        );
    };

    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.itemID !== itemId);
        setCart(updatedCart);
        message.success("Item removed from cart");
    };

    //Carousel Functions
    const [products, setProducts] = useState([]);

    const productTemplate = (product) => {
        return (
            <div className="Carousel_card_container">
                <div
                    className="Carousel_card_container_image"
                    style={{
                        backgroundImage: `url(${product.itemImage})`,
                    }}
                    onClick={() => {
                        setPreviewOpen(true);
                        setPreviewProduct(product);
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
                        <h4>{product.itemName}</h4>
                        <button
                            style={{
                                fontSize: "20px",
                                margin: "0 20px 0 0",
                                zIndex: 1000,
                                transition: "transform 0.3s ease",
                            }}
                            className="center booking_cart_button"
                            onClick={(event) => {
                                addToCart(product);
                                event.target.style.transform = "scale(1.1)";
                                setTimeout(() => {
                                    event.target.style.transform = "scale(1)";
                                }, 300);
                            }}
                        >
                            <ShoppingCartOutlined />
                        </button>
                    </div>
                    <div
                        className="center"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <h6>{product.unitPrice} LKR</h6>
                        <p>{product.inventoryStatus}</p>
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
        if (id !== "custom") {
            fetchBookingDetails();
        }
        fetchInventories();
    }, [id]);

    const fetchInventories = async () => {
        setLoading(true);
        try {
            if (selectedPackage) {
                const response = await axios.get(
                    `${
                        process.env.PUBLIC_URL
                    }/api/packages/getInventoriesByEventType/${category.toLowerCase()}`
                );
                setProducts(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAddress = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
        let temp = [];
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/bookings/getDefaultAddress`,
                { userID: userID }
            );
            setDefaultAddress(response.data);
            setSelectedAddress(response.data);
            temp.push(response.data);
            try {
                const response1 = await axios.post(
                    `${process.env.PUBLIC_URL}/api/bookings/getSecondaryAddress`,
                    { userID: userID }
                );
                response1.data.map((address) => {
                    temp.push(address);
                });
                setAddressList(temp);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Filters
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [chairs, setChairs] = useState(false);
    const [tables, setTables] = useState(false);
    const [cakeHolders, setCakeHolders] = useState(false);
    const [plates, setPlates] = useState(false);
    const [glasses, setGlasses] = useState(false);
    const [decorations, setDecorations] = useState(false);

    useEffect(() => {
        const filterProducts = () => {
            let temp = [];
            products.map((product) => {
                if (
                    product.itemName.toLowerCase().includes(searchKey.toLowerCase())
                ) {
                    temp.push(product);
                }
            });

            console.log(temp);

            if (color === "Black") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "black"
                );
            } else if (color === "Brown") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "brown"
                );
            } else if (color === "White") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "white"
                );
            } else if (color === "Red") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "red"
                );
            } else if (color === "Grey") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "grey"
                );
            } else if (color === "Tan") {
                temp = temp.filter(
                    (item) => item.color.toLowerCase() === "tan"
                );
            }
            console.log(temp);
            setFilteredProducts(temp);
        };

        filterProducts();
        setChairs([]);
        setTables([]);
        setCakeHolders([]);
        setPlates([]);
        setGlasses([]);
        setDecorations([]);
    }, [searchKey, products, color]);

    const filterProductsByType = () => {
        if (filteredProducts.length === 0) return null;
        filteredProducts.map((item) => {
            if (item.category.toLowerCase() === "chairs") {
                setChairs((itm) => [...(itm || []), item]);
            } else if (item.category.toLowerCase() === "tables") {
                setTables((itm) => [...(itm || []), item]);
            } else if (item.category.toLowerCase() === "cake holders") {
                setCakeHolders((itm) => [...(itm || []), item]);
            } else if (item.category.toLowerCase() === "plates") {
                setPlates((itm) => [...(itm || []), item]);
            } else if (item.category.toLowerCase() === "glasses") {
                setGlasses((itm) => [...(itm || []), item]);
            } else if (item.category.toLowerCase() === "decorations") {
                setDecorations((itm) => [...(itm || []), item]);
            }
        });
    };

    useEffect(() => {
        filterProductsByType();
    }, [filteredProducts]);

    //Booking popup
    const [bookingModal, setBookingModal] = useState(false);
    const [current, setCurrent] = useState(0);

    //Add Billing Address
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addressData, setAddressData] = useState({
        country: "Sri Lanka",
        addressLine1: "",
        addressLine2: "",
        district: "",
        city: "",
        postalCode: "",
    });

    const saveAddressData = () => {
        console.log(addressData);
        try {
            axios.post(
                `${process.env.PUBLIC_URL}/api/bookings/addAddressToUser`,
                { userID: userId, address: addressData }
            );
            message.success("Address saved successfully");
            fetchAddress();
            setIsModalOpen(false);
            //clear form
            setAddressData({
                country: "Sri Lanka",
                addressLine1: "",
                addressLine2: "",
                district: "",
                city: "",
                postalCode: "",
            });
        } catch (error) {
            console.error(error);
            message.error("Error saving address");
        }
    };

    //Retrieve Address
    const [addressList, setAddressList] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState({});
    useEffect(() => {
        setAddressList([]);
        fetchAddress();
    }, [userId]);

    setTimeout(() => {
        setLoading(false);
    }, 3000);

    const goToCheckout = () => {
        let chairsCount = 0;
        let tablesCount = 0;
        let cakeHoldersCount = 0;
        let platesCount = 0;
        let glassesCount = 0;
        let decorationsCount = 0;

        console.log(cart);

        cart.map((item) => {
            if (item.category.toLowerCase() === "chairs") {
                chairsCount += item.addedQty;
            } else if (item.category.toLowerCase() === "tables") {
                tablesCount += item.addedQty;
            } else if (item.category.toLowerCase() === "cake holders") {
                cakeHoldersCount += item.addedQty;
            } else if (item.category.toLowerCase() === "plates") {
                platesCount += item.addedQty;
            } else if (item.category.toLowerCase() === "glasses") {
                glassesCount += item.addedQty;
            } else if (item.category.toLowerCase() === "decorations") {
                decorationsCount += item.addedQty;
            }
        });

        const maxChairs =
            selectedPackage[0].inventories.find(
                (item) => item.category === "chairs"
            )?.quantity || 0;

        const maxTables =
            selectedPackage[0].inventories.find(
                (item) => item.category === "tables"
            )?.quantity || 0;

        const maxCakeHolders =
            selectedPackage[0].inventories.find(
                (item) => item.category === "cake holders"
            )?.quantity || 0;

        const maxPlates =
            selectedPackage[0].inventories.find(
                (item) => item.category === "plates"
            )?.quantity || 0;

        const maxGlasses =
            selectedPackage[0].inventories.find(
                (item) => item.category === "glasses"
            )?.quantity || 0;

        const maxDecorations =
            selectedPackage[0].inventories.find(
                (item) => item.category === "decorations"
            )?.quantity || 0;

        if (chairsCount < parseInt(maxChairs)) {
            message.error(
                `Please add ${parseInt(maxChairs) - chairsCount} more chairs`
            );
            setIsHelpModalOpen(true);
            return;
        }
        if (tablesCount < parseInt(maxTables)) {
            message.error(
                `Please add ${parseInt(maxTables) - tablesCount} more tables`
            );
            setIsHelpModalOpen(true);
            return;
        }
        if (cakeHoldersCount < parseInt(maxCakeHolders)) {
            message.error(
                `Please add ${
                    parseInt(maxCakeHolders) - cakeHoldersCount
                } more cake holders`
            );
            setIsHelpModalOpen(true);
            return;
        }
        if (platesCount < parseInt(maxPlates)) {
            message.error(
                `Please add ${parseInt(maxPlates) - platesCount} more plates`
            );
            setIsHelpModalOpen(true);
            return;
        }
        if (glassesCount < parseInt(maxGlasses)) {
            message.error(
                `Please add ${parseInt(maxGlasses) - glassesCount} more glasses`
            );
            setIsHelpModalOpen(true);
            return;
        }
        if (decorationsCount < parseInt(maxDecorations)) {
            message.error(
                `Please add ${
                    parseInt(maxDecorations) - decorationsCount
                } more decorations`
            );
            setIsHelpModalOpen(true);
            return;
        }

        if (cart.length === 0) {
            message.error("Please add items to the cart");
            return;
        }
        setCurrent(1);
    };

    const handleRadioChange = (e, a) => {
        setSelectedAddress(a);
        console.log(a);
        console.log(selectedAddress);
    };

    // address delete
    const handleDeleteAddress = async (address) => {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/bookings/deleteAddress`,
                { userID: userId, address: address }
            );
            message.success("Address deleted successfully");
            fetchAddress();
        } catch (error) {
            console.error(error);
        }
    };

    //edit address
    const [editIndex, setEditIndex] = useState(0);
    const editAddressData = () => {
        console.log(addressData, editIndex);
        try {
            axios.post(`${process.env.PUBLIC_URL}/api/bookings/updateAddress`, {
                userID: userId,
                addressIndex: editIndex,
                newAddress: addressData,
            });
            message.success("Address edited successfully");
            fetchAddress();
            setIsModalOpen(false);
            //clear form
            setAddressData({
                country: "Sri Lanka",
                addressLine1: "",
                addressLine2: "",
                district: "",
                city: "",
                postalCode: "",
            });
        } catch (error) {
            console.error(error);
            message.error("Error saving address");
        }
    };

    const handleEditAddress = (address, index) => {
        setIsEdit(true);
        setEditIndex(--index);
        setAddressData({
            country: "Sri Lanka",
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            district: address.district,
            city: address.city,
            postalCode: address.postalCode,
        });
        setIsModalOpen(true);
    };

    const stripePromise = loadStripe(
        "pk_test_51OW27PIgh0lMKMevGMnDm4suVchcjJqo78U5Zw86wYtbRbg1af16R1JXdYsKhzYhnFnyycKuoLyE3RtbmTR9sYPe00cNsii5yG"
    );

    return (
        <div style={{ backgroundColor: "#efefef" }}>
            {/* image view */}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "rgba(0,0,0,0)",
                            boxShadow: "none",
                        },
                    },
                }}
            >
                <Modal
                    open={previewOpen}
                    onCancel={() => setPreviewOpen(false)}
                    footer={null}
                    width={700}
                    height={635}
                    centered
                >
                    <div className="center">
                        <div className="popUpPackageBigImg_72">
                            <p>{previewProduct.itemName}</p>
                            <div
                                className="innerBoxBigImg_72"
                                style={{
                                    backgroundImage: `url(${previewProduct.itemImage})`,
                                }}
                            ></div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: "15px",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h5
                                    style={{
                                        color: "#49516F",
                                        margin: "10px 0 10px 40px",
                                    }}
                                >
                                    Price: {previewProduct.unitPrice} LKR
                                </h5>
                                <button
                                    className="center booking_cart_button"
                                    onClick={(event) => {
                                        addToCart(previewProduct);
                                        event.target.style.transform =
                                            "scale(1.1)";
                                        setTimeout(() => {
                                            event.target.style.transform =
                                                "scale(1)";
                                        }, 300);
                                        setPreviewOpen(false);
                                    }}
                                >
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: "25px",
                                            marginRight: "10px",
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>

            {/* Booking Modal */}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "#E6E6E6",
                        },
                        Steps: {},
                    },
                }}
            >
                <Modal
                    open={bookingModal}
                    onCancel={() => setBookingModal(false)}
                    footer={null}
                    width={1080}
                    centered
                >
                    <div className="booking_model_main_container">
                        <Steps
                            current={current}
                            onChange={(current) => {
                                if (current == 1) {
                                    goToCheckout();
                                } else {
                                    setCurrent(current);
                                }
                            }}
                            style={{
                                marginBottom: 24,
                                marginTop: 10,
                                textAlign: "center",
                                width: 400,
                            }}
                            items={[
                                {
                                    title: "Step 1",
                                },
                                {
                                    title: "Step 2",
                                },
                                {
                                    title: "Step 3",
                                },
                            ]}
                        />
                        {current == 0 ? (
                            <div className="booking_cart_item_container">
                                <div
                                    style={{
                                        marginRight: "230px",
                                        marginTop: "30px",
                                    }}
                                >
                                    <h4>Your Package</h4>
                                </div>
                                <div className="booking_cart_item">
                                    {cart.map((item) => (
                                        <div
                                            className="booking_cart_item_body"
                                            key={item.itemId}
                                        >
                                            <div className="booking_cart_item_image">
                                                <img src={item.itemImage} />
                                            </div>
                                            <div className="booking_cart_item_description">
                                                <h5>{item.itemName}</h5>
                                                <p>{item.unitPrice} LKR</p>
                                            </div>
                                            <div className="booking_cart_item_qty">
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.itemID
                                                        )
                                                    }
                                                >
                                                    <Icon icon="material-symbols:delete-outline" />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.addedQty}
                                                    onChange={(e) =>
                                                        handleChangeQty(
                                                            e,
                                                            item.itemID
                                                        )
                                                    }
                                                />
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                                <div className="booking_cart_item_footer">
                                    <p>Subtotal({cart.length} Items)</p>
                                    <h6>
                                        LKR{" "}
                                        {(calculateTotal() ?? 0) +
                                            (selectedPackage[0]?.price ?? 0)}
                                    </h6>
                                </div>
                                <button
                                    className="createBookingBtn_72 "
                                    onClick={goToCheckout}
                                >
                                    CONTINUE TO CHECKOUT
                                </button>
                                <p>Please, get it now before it sells out.</p>
                            </div>
                        ) : current == 1 ? (
                            <div className="booking_cart_item_container">
                                <div className="booking_cart_billing_address_main">
                                    <div className="booking_cart_billing_address">
                                        <h4>Billing Address</h4>
                                    </div>
                                    <div>
                                        <button
                                            className="add_new_address_Btn_72 "
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setIsEdit(false);
                                            }}
                                        >
                                            Add New Address
                                        </button>
                                    </div>
                                </div>
                                <hr className="billing_address_hr_tag" />
                                <div className="billing_address_radio_section">
                                    <Radio.Group defaultValue={0}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Radio
                                                value={0}
                                                className="billing_address_radio_btn1"
                                                onChange={(e) =>
                                                    handleRadioChange(
                                                        e,
                                                        defaultAddress
                                                    )
                                                }
                                            >
                                                <div>
                                                    <div>
                                                        <div className="billing_address_radio_btn1_txt1">
                                                            <h5>
                                                                Default Billing
                                                                Address
                                                            </h5>
                                                        </div>
                                                        <div className="billing_address_radio_btn1_txt2">
                                                            <h5>Colombo</h5>
                                                        </div>
                                                        <div className="billing_address_radio_btn1_txt3">
                                                            <h5>
                                                                {
                                                                    defaultAddress.addressLine1
                                                                }{" "}
                                                                ,
                                                                {
                                                                    defaultAddress.district
                                                                }
                                                                ,{" "}
                                                                {
                                                                    defaultAddress.city
                                                                }{" "}
                                                                SL
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Radio>
                                            {addressList.length > 1 && (
                                                <>
                                                    <div className="secondary_address_radio_btn1_txt1">
                                                        <h5>
                                                            Secondary Billing
                                                            Address
                                                        </h5>
                                                    </div>
                                                    {addressList
                                                        .slice(
                                                            1,
                                                            addressList.length
                                                        )
                                                        .map(
                                                            (
                                                                address,
                                                                index
                                                            ) => (
                                                                <>
                                                                    <Radio
                                                                        value={
                                                                            ++index
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleRadioChange(
                                                                                e,
                                                                                address
                                                                            )
                                                                        }
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                display:
                                                                                    "flex",
                                                                                flexDirection:
                                                                                    "row",
                                                                                gap: "20px",
                                                                            }}
                                                                        >
                                                                            <div>
                                                                                {" "}
                                                                                <div className="billing_address_radio_btn1_txt3">
                                                                                    <h5>
                                                                                        {
                                                                                            address.addressLine1
                                                                                        }{" "}
                                                                                        ,
                                                                                        {
                                                                                            address.district
                                                                                        }

                                                                                        ,{" "}
                                                                                        {
                                                                                            address.city
                                                                                        }{" "}
                                                                                        {
                                                                                            address.postalCode
                                                                                        }{" "}
                                                                                        SL
                                                                                    </h5>
                                                                                </div>
                                                                            </div>
                                                                            <div className="billing_address_radio_btn1_txt4">
                                                                                <div className="billing_address_radio_btn1_delete_btn">
                                                                                    <button
                                                                                        style={{
                                                                                            border: "none",
                                                                                            background:
                                                                                                "none",
                                                                                            marginRight:
                                                                                                "10px",
                                                                                            color: "#49516f",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            handleDeleteAddress(
                                                                                                address
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <Icon icon="material-symbols:delete-outline" />
                                                                                    </button>
                                                                                </div>
                                                                                <div className="billing_address_radio_btn1_edit_btn">
                                                                                    <button
                                                                                        style={{
                                                                                            border: "none",
                                                                                            background:
                                                                                                "none",
                                                                                            color: "#49516f",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            handleEditAddress(
                                                                                                address,
                                                                                                index
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <Icon icon="tabler:edit" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Radio>
                                                                    <hr
                                                                        style={{
                                                                            width: "400px",
                                                                        }}
                                                                    />
                                                                </>
                                                            )
                                                        )}
                                                </>
                                            )}
                                        </div>
                                    </Radio.Group>
                                </div>
                                <di></di>
                                <button
                                    className="createBookingBtn_72 "
                                    onClick={() => setCurrent(2)}
                                >
                                    CONTINUE TO CHECKOUT
                                </button>
                            </div>
                        ) : (
                            <div className="booking_cart_item_container_3">
                                <div id="" style={{ flex: 1 }}>
                                    <div className="booking_cart_item_2">
                                        {cart.map((item) => (
                                            <div
                                                className="booking_cart_item_body"
                                                key={item.itemId}
                                            >
                                                <div className="booking_cart_item_image">
                                                    <img src={item.itemImage} />
                                                </div>
                                                <div className="booking_cart_item_description">
                                                    <h5>{item.itemName}</h5>
                                                    <p>{item.unitPrice} LKR</p>
                                                </div>

                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="total_calculate_section">
                                        <h3>
                                            Total :{" "}
                                            {(calculateTotal() ?? 0) +
                                                (selectedPackage[0]?.price ??
                                                    0)}{" "}
                                            LKR
                                        </h3>
                                    </div>
                                </div>
                                <Elements stripe={stripePromise}>
                                    <PaymentForm
                                        cart={cart}
                                        userId={userId}
                                        selectedPackage={selectedPackage}
                                        selectedAddress={selectedAddress}
                                        date={date}
                                    />
                                </Elements>
                            </div>
                        )}
                    </div>
                </Modal>
            </ConfigProvider>

            {/* add Billing address model */}
            <Modal
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={550}
            >
                <div className="request_leave_model_body_container">
                    <div>
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginRight: "60px",
                                    marginBottom: "3px",
                                    fontSize: 24,
                                    fontWeight: 700,
                                }}
                            >
                                Billing Address
                            </span>
                            <span>
                                Please provide the billing address with the
                                credit card you’ve provided.
                            </span>
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }}
                            >
                                Country
                            </span>
                            <Input
                                placeholder="Sri Lanka"
                                size="large"
                                value={"Sri Lanka"}
                                onChange={(e) =>
                                    setAddressData({
                                        ...addressData,
                                        country: e.target.value,
                                    })
                                }
                                disabled
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }}
                            >
                                Address Line 1
                            </span>
                            <Input
                                placeholder="New Kandy Road"
                                size="large"
                                onChange={(e) =>
                                    setAddressData({
                                        ...addressData,
                                        addressLine1: e.target.value,
                                    })
                                }
                                value={addressData.addressLine1}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }}
                            >
                                Address Line 2
                            </span>
                            <Input
                                placeholder="Pittugala"
                                size="large"
                                onChange={(e) =>
                                    setAddressData({
                                        ...addressData,
                                        addressLine2: e.target.value,
                                    })
                                }
                                value={addressData.addressLine2}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }}
                            >
                                District
                            </span>

                            <Cascader
                                options={options}
                                onChange={(value) => {
                                    setAddressData({
                                        ...addressData,
                                        district: value[0],
                                    });
                                }}
                                placeholder="Please select"
                                showSearch={{ filter }}
                                onSearch={(value) => console.log(value)}
                                value={addressData.district}
                            />
                        </div>
                    </div>
                    <div className="Add_Address_popup_container">
                        <div className="add_employee_popup_details_container_right">
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    City
                                    <Input
                                        placeholder="Malabe"
                                        size="large"
                                        onChange={(e) =>
                                            setAddressData({
                                                ...addressData,
                                                city: e.target.value,
                                            })
                                        }
                                        value={addressData.city}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="add_employee_popup_details_container_left">
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    Postal Code
                                </span>
                                <Input
                                    placeholder="10115"
                                    type="number"
                                    size="large"
                                    onChange={(e) =>
                                        setAddressData({
                                            ...addressData,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    value={addressData.postalCode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" center">
                    {isEdit ? (
                        <button
                            className="saveAddressBtn_72 center"
                            onClick={editAddressData}
                        >
                            Edit Address
                        </button>
                    ) : (
                        <button
                            className="saveAddressBtn_72 center"
                            onClick={saveAddressData}
                        >
                            Save Address
                        </button>
                    )}
                </div>
            </Modal>

            {/* Help model */}
            <Modal
                centered
                open={isHelpModalOpen}
                onCancel={() => setIsHelpModalOpen(false)}
                footer={null}
                width={550}
            >
                <div className="request_leave_model_body_container">
                    <div>
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginRight: "60px",
                                    marginBottom: "3px",
                                    fontSize: 24,
                                    fontWeight: 700,
                                }}
                            >
                                Instructions to follow
                            </span>
                            <span>
                                You have selected{" "}
                                {selectedPackage[0]?.packageType} . Please
                                follow the instructions below to complete the
                                booking.
                            </span>
                            <br />
                            <ul>
                                <li>
                                    <p>Step 1: Add items to the cart</p>
                                </li>
                                <p>
                                    &nbsp;&nbsp;&nbsp;*You must be select
                                    minimum these quantities according to{" "}
                                    {selectedPackage[0]?.packageType}{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;package policies.
                                </p>
                                <ol>
                                    {selectedPackage[0]?.inventories.map(
                                        (item) => (
                                            <li>
                                                {item.category} :{" "}
                                                {item.quantity}
                                            </li>
                                        )
                                    )}
                                </ol>
                                <br />
                                <p>
                                    &nbsp;if you want fully customize please
                                    select customize package
                                </p>
                                <br />
                                <li>
                                    <p>Step 2: Add or Select billing address</p>
                                </li>
                                <li>
                                    <p>Step 3: Make the payment</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>

            {loading ? (
                <div className="center" style={{ height: "100vh" }}>
                    <Loader />
                </div>
            ) : (
                <>
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
                                        <Menu.SubMenu
                                            key={item.key}
                                            title={item.label}
                                        >
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
                                onChange={(date, dateString) =>
                                    setDate(dateString)
                                }
                                defaultValue={date ? moment(date) : null}
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
                                <button
                                    style={{
                                        fontSize: "25px",
                                        margin: "0 60px",
                                    }}
                                    className="center booking_cart_button"
                                    onClick={() => {
                                        if (cart.length === 0) {
                                            return message.error(
                                                "Please add items to the cart"
                                            );
                                        } else if (date === null) {
                                            return message.error(
                                                "Please select a date"
                                            );
                                        } else {
                                            setBookingModal(true);
                                        }
                                    }}
                                >
                                    <ShoppingCartOutlined />
                                </button>
                            </div>
                        </div>
                        {filteredProducts.length > 0 ? (
                            <>
                                {chairs.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Chairs</h3>
                                        <Carousel
                                            value={chairs}
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
                                ) : null}
                                {tables.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Table</h3>
                                        <Carousel
                                            value={tables}
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
                                ) : null}
                                {cakeHolders.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Cake Holders</h3>
                                        <Carousel
                                            value={cakeHolders}
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
                                ) : null}
                                {plates.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Plates</h3>
                                        <Carousel
                                            value={plates}
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
                                ) : null}
                                {glasses.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Glasses</h3>
                                        <Carousel
                                            value={glasses}
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
                                ) : null}
                                {decorations.length > 0 ? (
                                    <div className="user_booking_corosal">
                                        <h3>Decorations</h3>
                                        <Carousel
                                            value={decorations}
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
                                ) : null}
                                <div
                                    className="center"
                                    style={{
                                        width: "100%",
                                        margin: "20px 0 80px 0",
                                    }}
                                >
                                    <button
                                        className="createBookingBtn_72 "
                                        onClick={() => {
                                            if (cart.length === 0) {
                                                return message.error(
                                                    "Please add items to the cart"
                                                );
                                            } else if (date === null) {
                                                return message.error(
                                                    "Please select a date"
                                                );
                                            } else {
                                                setBookingModal(true);
                                            }
                                        }}
                                    >
                                        CONTINUE TO CHECKOUT
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="center" style={{ height: "60vh" }}>
                                <h2 style={{ color: "#533c56" }}>
                                    No Products Found
                                </h2>
                            </div>
                        )}
                    </div>
                    <div id="footer">
                        <Footer />
                    </div>
                </>
            )}
        </div>
    );
}

export default Booking;
