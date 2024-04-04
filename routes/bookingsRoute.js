const express = require("express");
const Booking = require("../models/booking");
const router = express.Router();

router.get('/getbookings', async (req, res) => {
    try {
        const { page, limit } = req.query;
        const bookings = await Booking.find().skip((page - 1) * limit).limit(limit);
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});
router.get('/getAllBookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router;