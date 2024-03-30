const express = require("express");
const router = express.Router();

const messageModel = require("../models/message");

// app.get('/', async (req, res) => {

// });

router.post('/newMessage', async (req, res) => {
    const { customerID, message, category } = req.body;
    const sendDate = Date.now(); // Generate current date and time
    const status = "unread"; // Assuming default status is "unread"

    const newMessage = new messageModel({ customerID, message, sendDate, category, status });

    try {
        await newMessage.save();
        res.send("Message submitted successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;