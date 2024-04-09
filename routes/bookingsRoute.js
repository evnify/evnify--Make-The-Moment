const express = require("express");
const Booking = require("../models/booking");
const Payment = require("../models/payment");
const UserModel = require("../models/user");
const router = express.Router();

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

router.post("/getAddress", async (req, res) => {
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

router.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
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
        const { _id, cart } = req.body;
        const booking = await Booking.findByIdAndUpdate({ _id }, { AssignedInventory: cart }, { new: true });
        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
