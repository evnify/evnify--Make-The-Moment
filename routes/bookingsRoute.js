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

module.exports = router;
