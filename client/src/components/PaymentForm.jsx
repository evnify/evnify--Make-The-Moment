import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Input, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [terms, setTerms] = useState(false);

    const navigate = useNavigate();

    const { cart, userId, selectedPackage, selectedAddress, date } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || nameOnCard === "") {
            message.error("Please fill all the fields");
            return;
        } else if (cart.length === 0) {
            message.error("Please add items to the cart");
            return;
        } else if (date === null) {
            message.error("Please select a date");
            return;
        } else if (!emailRegex.test(email)) {
            message.error("Invalid email address");
            return;
        } else if (!terms) {
            message.error("Please agree to the terms and conditions");
            return;
        }

        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const { error, token } = await stripe.createToken(
            elements.getElement(CardElement)
        );

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            onToken(token);
        }
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.unitPrice * item.addedQty,
            0
        );
    };

    //Save booking
    const [email, setEmail] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");

    const saveBooking = (transaction) => {
        try {
            axios.post(`${process.env.PUBLIC_URL}/api/bookings/saveBooking`, {
                customerID: userId,
                transactionID: transaction.id,
                eventType: selectedPackage[0].eventType,
                packageType: selectedPackage[0].packageType,
                eventLocation: [selectedAddress],
                eventDate: date,
                amount: calculateTotal() + selectedPackage[0].price,
                status: "Pending",
                AssignedInventory: cart,
                AssignedEmployees: [],
            });
            axios.post(`${process.env.PUBLIC_URL}/api/bookings/savePayment`, {
                transactionID:  transaction.id,
                customerID: userId,
                customerEmail: email,
                packageType: selectedPackage[0].packageType,
                amount: calculateTotal() + selectedPackage[0].price ,
                paymentType: "card",
                description: transaction.description,
            });
            setLoading(false);
            message.success("Booking saved successfully");
            setEmail("");
            setNameOnCard("");
            navigate("/userprofile/booking")
        } catch (error) {
            console.error(error);
            message.error("Error saving booking");
        }
    };

    async function onToken(token) {

        const stripeToken = {
            token,
            amount: calculateTotal() + selectedPackage[0].price,
            description: `Payment for ${selectedPackage[0].packageType} Package by ${nameOnCard}`,
            email : email,
        };
        try {
            const response = await axios.post(`${process.env.PUBLIC_URL}/api/bookings/payment`, stripeToken);
            if (response.status === 200) {
                saveBooking(response.data);
            }
        }catch (error) {
            console.error(error);
            message.error("Error processing payment");
        }
    }

    const cardElementOptions = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Product Sans",
                fontSmoothing: "antialiased",
                fontSize: "14px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        width: 420,
                        padding: "0 50px",
                    }}
                >
                    <hr />
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
                                fontWeight: 600,
                            }}
                        >
                            Email
                        </span>
                        <Input
                            type="email"
                            placeholder="Email"
                            size="large"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                boxShadow:
                                    "0px 1.468px 3.669px 0px rgba(0, 0, 0, 0.08)",
                            }}
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
                                fontWeight: 600,
                            }}
                        >
                            Card Information
                        </span>
                        <div className="card-element-container">
                            <CardElement options={cardElementOptions} />
                        </div>
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
                                fontWeight: 600,
                            }}
                        >
                            Name On card
                        </span>
                        <Input
                            placeholder="Full name on card"
                            size="large"
                            style={{
                                boxShadow:
                                    "0px 1.468px 3.669px 0px rgba(0, 0, 0, 0.08)",
                            }}
                            onChange={(e) => setNameOnCard(e.target.value)}
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
                                fontWeight: 600,
                            }}
                        >
                            Country Or region
                        </span>

                        <Input
                            type="text"
                            placeholder="Country or region"
                            size="large"
                            style={{
                                boxShadow:
                                    "0px 1.468px 3.669px 0px rgba(0, 0, 0, 0.08)",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "8px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Checkbox onChange={()=> setTerms(!terms)}>Agree to the terms and conditions</Checkbox>
                    </div>
                    <div className="center">
                        <button
                            className="payment_confirm_btn_72"
                            type="submit"
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PaymentForm;
