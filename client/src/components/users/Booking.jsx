import React, { useEffect, useState } from "react";
import {
    Table,
    Tag,
    Space,
    ConfigProvider,
    Modal,
    Steps,
    Radio,
    message,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import axios from "axios";
import jsPDF from "jspdf";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import EditPaymentForm from "../EditPaymentForm";

function Booking() {
    const [bookingList, setBookingList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingData, setSelectedBookingData] = useState(null);
    const [defaultCart, setDefaultCart] = useState([]);

    const stripePromise = loadStripe(
        "pk_test_51OW27PIgh0lMKMevGMnDm4suVchcjJqo78U5Zw86wYtbRbg1af16R1JXdYsKhzYhnFnyycKuoLyE3RtbmTR9sYPe00cNsii5yG"
    );

    // fetch user id
    const [userId, setUserId] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const userID = user.userID;
        setUserId(userID);
    }, []);

    var imgData = require("../../assets/backgrounds/reservationConformation.png");

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/bookings/getAllBookings`);
            setBookingList(response.data);
        } catch (error) {
            console.log("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (_id, paymentId) => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/bookings/refundPayment`,
                {
                    paymentId,
                }
            );
            await axios.get(`/api/bookings/updateBookingCancel/${_id}`);
            message.success("Booking cancelled successfully");
            fetchBookings();
            setIsModalOpen(false);
            setSelectedBookingData(null);
        } catch (error) {
            console.error(error);
            message.error("Error cancelling booking");
        }
    };
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });
    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const handleViewClick = async (record) => {
        setSelectedBookingData(record);
        setIsModalOpen(true);
        setDefaultCart(record.AssignedInventory);
        setCart(record.AssignedInventory);
        console.log(record.AssignedInventory);
    };

    function convertDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    const handelConformationDownload = async (record) => {
        const doc = new jsPDF();
        doc.addImage(imgData, "PNG", 0, 0, 215, 300);

        doc.setFont("helvetica");
        doc.setFontSize(14);
        doc.text(`${convertDate(record.updatedAt)}`, 80, 77.5);
        doc.text(`${record.transactionID}`, 80, 90);
        doc.text(`${record.eventType}`, 80, 102.2);
        doc.text(`${record.packageType}`, 80, 116.1);
        doc.text(`${convertDate(record.eventDate)}`, 80, 129);
        doc.text(`${record.amount} LKR`, 80, 142);
        doc.text(`${record.eventLocation[0].addressLine1}`, 80, 155.5);
        doc.text(
            `${record.eventLocation[0].city}, ${record.eventLocation[0].district}, `,
            80,
            163.5
        );
        doc.text(`${record.eventLocation[0].postalCode}`, 80, 171.5);

        doc.save(`Invoice_${record._id}.pdf`);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedBookingData(null);
    };

    const columns = [
        {
            title: "Booked On",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
                const date = new Date(createdAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Type",
            dataIndex: "packageType",
            key: "packageType",
        },
        {
            title: "Event Type",
            dataIndex: "eventType",
            key: "eventType",
        },
        {
            title: "Transaction ID",
            dataIndex: "transactionID",
            key: "transactionID",
        },
        {
            title: "Event Date",
            dataIndex: "eventDate",
            key: "eventDate",
            render: (eventDate) => {
                const date = new Date(eventDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => {
                return `${amount} LKR`;
            },
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                let color = "green";
                if (status === "Canceled") {
                    color = "red";
                    return <Tag color={color}> {"Canceled"}</Tag>;
                } else if (status === "Pending") {
                    color = "orange";
                    return <Tag color={color}> {"Pending"}</Tag>;
                }

                return <Tag color={color}>{"Confirmed"}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <button
                        style={{
                            fontSize: "14px",
                            border: "solid 1px #C4CDD5",
                            backgroundColor: "#ffff",
                            padding: "8px 20px",
                            color: "#000868E96",
                            fontWeight: 500,
                            borderRadius: "5px",
                            fontFamily: "Product Sans",
                        }}
                        onClick={() => handleViewClick(record)}
                    >
                        View
                    </button>
                    <button
                        style={{
                            fontSize: "14px",
                            border: "none",
                            backgroundColor: "#4094F7",
                            padding: "8px 18px",
                            color: "#fff",
                            borderRadius: "5px",
                            fontWeight: 500,
                            fontFamily: "Product Sans",
                        }}
                        onClick={() => handelConformationDownload(record)}
                        className="center"
                    >
                        <PrinterOutlined style={{ gap: "10" }} />
                        &nbsp; Export pdf
                    </button>
                </Space>
            ),
        },
    ];

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.unitPrice * item.addedQty,
            0
        );
    };

    const calculateDefault = () => {
        return defaultCart.reduce(
            (total, item) => total + item.unitPrice * item.addedQty,
            0
        );
    };

    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.itemID !== itemId);
        setCart(updatedCart);
        message.success("Item removed from cart");
    };

    const handleChangeQty = (e, itemId, index) => {
        if (e.target.value < defaultCart[index].addedQty) {
            return message.error(
                `Quantity cannot be less than existing quantity ${defaultCart[index].addedQty}`
            );
        }
        const updatedCart = cart.map((item) =>
            item.itemID === itemId
                ? { ...item, addedQty: parseInt(e.target.value, 10) }
                : item
        );
        setCart(updatedCart);
    };

    //edit booking
    const [bookingModal, setBookingModal] = useState(false);
    const [current, setCurrent] = useState(0);
    const [cart, setCart] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [zip, setZip] = useState("");
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleEdit = (record) => {
        setSelectedPackage([record ?? {}]);
        console.log("Selected Package", record);
        setBookingModal(true);
        setSelectedAddress(record.address);
        setCart(record.AssignedInventory);
        console.log("ASsigned", record.AssignedInventory);
    };

    const editBooking = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !cardNumber || !expDate || !cvc || !nameOnCard || !zip) {
            return message.error("Please fill all the fields");
        } else if (!emailRegex.test(email)) {
            message.error("Invalid email address");
            return;
        }

        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/bookings/editBookingById`,
                {
                    _id: selectedPackage[0]._id,
                    cart,
                }
            );
            message.success("Booking updated successfully");
            setBookingModal(false);
        } catch (error) {
            console.log("Error editing booking:", error);
            message.error("Error editing booking");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                            onChange={(current) => setCurrent(current)}
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
                                    {cart.map((item, index) => (
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
                                                            item.itemID,
                                                            index
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
                                        {(calculateTotal() ?? 0) -
                                            (calculateDefault() ?? 0)}
                                    </h6>
                                </div>
                                <button
                                    className="createBookingBtn_72 "
                                    onClick={() => setCurrent(1)}
                                >
                                    CONTINUE TO CHECKOUT
                                </button>
                                <p>
                                    You can only add, if you have any concern
                                    contact us
                                </p>
                            </div>
                        ) : current == 1 ? (
                            <div className="booking_cart_item_container">
                                <div className="booking_cart_billing_address_main">
                                    <div className="booking_cart_billing_address">
                                        <h4>Billing Address</h4>
                                    </div>
                                    <div>
                                        <button
                                            disabled
                                            className="add_new_address_Btn_72 "
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Add New Address
                                        </button>
                                    </div>
                                </div>
                                <hr className="billing_address_hr_tag" />
                                <div className="billing_address_radio_section">
                                    <Radio.Group disabled>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Radio
                                                value={1}
                                                className="billing_address_radio_btn1"
                                            >
                                                <div>
                                                    <div>
                                                        {" "}
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
                                                                1800, New Kandy
                                                                Road ,Malabe, SL
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Radio>
                                            {addressList.length > 0 && (
                                                <div className="billing_address_radio_btn1_txt1">
                                                    <h5>
                                                        Secondary Billing
                                                        Address
                                                    </h5>
                                                </div>
                                            )}
                                            {addressList.map((address) => (
                                                <Radio value={2}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                            gap: "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            {" "}
                                                            <div className="billing_address_radio_btn1_txt2">
                                                                <h5>
                                                                    {
                                                                        address.city
                                                                    }
                                                                </h5>
                                                            </div>
                                                            <div className="billing_address_radio_btn1_txt3">
                                                                <h5>
                                                                    {
                                                                        address.postalCode
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        address.addressLine1
                                                                    }{" "}
                                                                    ,
                                                                    {
                                                                        address.district
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        address.country
                                                                    }
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
                                                                    }}
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
                                                                    }}
                                                                >
                                                                    <Icon icon="tabler:edit" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Radio>
                                            ))}
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
                                            {(calculateTotal() ?? 0) -
                                                (calculateDefault() ?? 0)}{" "}
                                            LKR
                                        </h3>
                                    </div>
                                </div>
                                <Elements stripe={stripePromise}>
                                    <EditPaymentForm
                                        cart={cart}
                                        userId={userId}
                                        selectedPackage={selectedPackage}
                                        selectedAddress={selectedAddress}
                                        price={
                                            (calculateTotal() ?? 0) -
                                            (calculateDefault() ?? 0)
                                        }
                                    />
                                </Elements>
                            </div>
                        )}
                    </div>
                </Modal>
            </ConfigProvider>

            {/* View Modal */}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: { contentBg: "#E6E6E6", boxShadow: "none" },
                    },
                }}
            >
                <Modal
                    centered
                    onCancel={handleCancel}
                    open={isModalOpen}
                    footer={null}
                    width={715}
                >
                    {selectedBookingData && (
                        <>
                            <span>Package Includes</span>
                            <hr />
                            <div className="Package_includes_main_section_72">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div className="package_includes_left_container">
                                        <span>Event Type</span>
                                        <span>Package Type</span>
                                        <span>Event Date</span>
                                        <span>Trasaction Completed On</span>
                                    </div>
                                    <div className="package_includes_right_container">
                                        <span>
                                            {selectedBookingData.eventType}
                                        </span>
                                        <span>
                                            {selectedBookingData.packageType}
                                        </span>
                                        <span>
                                            {selectedBookingData.eventDate}
                                        </span>
                                        <span>
                                            {selectedBookingData.createdAt}
                                        </span>
                                    </div>
                                </div>
                                <hr
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "#000",
                                    }}
                                />
                                <span className="package_includes_txt_section">
                                    Package Includes
                                </span>
                                <div className="package_includes_container">
                                    {cart.map((item) => (
                                        <div
                                            key={item.itemId}
                                            className="Add_Address_popup_quntity_container"
                                        >
                                            <div className="add_booking_popup_container_left">
                                                <span>{item.itemName}</span>
                                            </div>
                                            <div className="add_booking_popup_container_right">
                                                <span>{item.addedQty}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "#000",
                                    }}
                                />
                                <div className="Add_Address_popup_container">
                                    <div className="add_employee_popup_details_container_right">
                                        <div className="add_quntity_price_section">
                                            <span>Total Amount</span>
                                            <span>
                                                {selectedBookingData.amount} LKR
                                            </span>
                                        </div>
                                        <div className="add_quntity_price_btn_section">
                                            {selectedBookingData.status ===
                                            "Pending" ? (
                                                <>
                                                    <button
                                                        className="cancel_Package_72 center"
                                                        onClick={() =>
                                                            handleCancelBooking(
                                                                selectedBookingData._id,
                                                                selectedBookingData.transactionID
                                                            )
                                                        }
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                    <button
                                                        className="saveAddressBtn_72 center"
                                                        onClick={() =>
                                                            handleEdit(
                                                                selectedBookingData
                                                            )
                                                        }
                                                    >
                                                        Update Booking
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="cancel_Package_72 center"
                                                        style={{
                                                            background: "gray",
                                                        }}
                                                        disabled
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                    <button
                                                        className="saveAddressBtn_72 center"
                                                        style={{
                                                            background: "gray",
                                                        }}
                                                        disabled
                                                    >
                                                        Update Booking
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Modal>
            </ConfigProvider>
            <div className="admin_leave_request_container">
                <div className="admin_leave_request_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>Billing History</h5>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={bookingList}
                            pagination={bookingList.length >= 8 ? {} : false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
