const express = require("express");
const Booking = require("../models/booking");
const Payment = require("../models/payment");
const UserModel = require("../models/user");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { v4: uuidv4 } = require("uuid");

router.get("/getBookings", async (req, res) => {
    try {
        const { page, limit } = req.query;
        const bookings = await Booking.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/addAddressToUser", async (req, res) => {
    const { userID, address } = req.body;
    try {
        const user = await UserModel.findOneAndUpdate(
            { userID },
            { $push: { addressArr: address } }
        );
        res.send("Address added successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/saveBooking", async (req, res) => {
    const bookingData = req.body;
    try {
        const booking = new Booking(bookingData);
        await booking.save();
        res.send("Booking saved successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/savePayment", async (req, res) => {
    const paymentData = req.body;
    try {
        const payment = new Payment(paymentData);
        await payment.save();
        res.send("Payment saved successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/getSecondaryAddress", async (req, res) => {
    const { userID } = req.body;
    try {
        const user = await UserModel.findOne({
            userID,
        });
        res.send(user.addressArr);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/getDefaultAddress", async (req, res) => {
    const { userID } = req.body;
    try {
        const user = await UserModel.findOne({
            userID,
        });

        const defaultAddress = {
            country: "Sri Lanka",
            addressLine1: user.address1[0],
            addressLine2: "",
            district: user.province[0],
            city: user.city[0],
            postalCode: user.zipcode,
        };

        res.send(defaultAddress);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/deleteAddress", async (req, res) => {
    const { userID, address } = req.body;
    try {
        const user = await UserModel.findOneAndUpdate(
            { userID },
            { $pull: { addressArr: address } }
        );
        res.send("Address deleted successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/updateAddress", async (req, res) => {
    const { userID, addressIndex, newAddress } = req.body; // Assuming addressIndex is the index of the address to update
    try {
        const user = await UserModel.findOneAndUpdate(
            { userID },
            { $set: { [`addressArr.${addressIndex}`]: newAddress } } // Update the address at the specified index
        );
        res.send("Address updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/updateBookingStatus/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const booking = await Booking.findByIdAndUpdate(
            _id,
            { status: "Conformed" },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/updateBookingCancel/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const booking = await Booking.findByIdAndUpdate(
            _id,
            { status: "Canceled" },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.delete("/deleteBooking/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/saveAddress", async (req, res) => {
    try {
        const addressData = req.body;

        const booking = await Booking.findOneAndUpdate(
            { _id: req.body.bookingId },
            { $push: { eventLocation: addressData } },
            { new: true }
        );

        // Return success response
        return res
            .status(200)
            .json({ message: "Address saved successfully", booking });
    } catch (error) {
        console.error("Error saving address:", error);
        return res
            .status(500)
            .json({ error: "Failed to save address. Please try again later." });
    }
});

router.post("/editBookingById", async (req, res) => {
    try {
        const { _id, cart, amount } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            { _id },
            { AssignedInventory: cart, amount },
            { new: true }
        );
        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/payment", async (req, res) => {
    const token = req.body.token;
    const amount = req.body.amount;
    const description = req.body.description;
    const email = req.body.email;
    const idempotencyKey = uuidv4();

    console.log(idempotencyKey);

    try {
        const customer = await stripe.customers.create({
            email: email,
            source: token.id,
        });

        const response = await stripe.charges.create(
            {
                amount: amount * 100,
                currency: "LKR",
                customer: customer.id,
                receipt_email: email,
                description: `${description}`,
            },
            {
                idempotencyKey: idempotencyKey,
            }
        );

        res.send(response);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/refundPayment", async (req, res) => {
    const { paymentId } = req.body;

    try {
        const refund = await stripe.refunds.create({
            charge: paymentId, // Assuming you stored the charge ID during payment creation
        });

        res.send(refund);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});




module.exports = router;
