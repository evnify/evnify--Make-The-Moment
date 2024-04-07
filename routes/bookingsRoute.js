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
router.delete('/deleteBooking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}   );

router.post('/saveAddress', async (req, res) => {
    try {
        const addressData = req.body;
    
        // Find the booking document based on some identifier (e.g., booking ID)
        const booking = await Booking.findOneAndUpdate(
          { _id: req.body.bookingId }, // Assuming bookingId is sent from the frontend
          { $push: { eventLocation: addressData } }, // Add addressData to eventLocation array
          { new: true }
        );
    
        // Return success response
        return res.status(200).json({ message: 'Address saved successfully', booking });
      } catch (error) {
        console.error("Error saving address:", error);
        return res.status(500).json({ error: 'Failed to save address. Please try again later.' });
      }
    });
module.exports = router;