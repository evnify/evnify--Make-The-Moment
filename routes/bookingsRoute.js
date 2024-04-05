const express = require("express");
const Booking = require("../models/booking");
const router = express.Router();

router.get('/getBookingsById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.send(booking);
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