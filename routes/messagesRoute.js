 const express = require("express");
const router = express.Router();

const messageModel = require("../models/message");

router.post('/newMessage', async (req, res) => {
    const {customerID,message,sendDate,sendTime,category,status} = req.body;

    const newMessage = new messageModel({ customerID,message,sendDate,sendTime,category,status});

    try {
        await newMessage.save();
        res.send("Message submitted successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


router.get('/allMessages', async (req, res) => {
    try {
        // Retrieve all messages from the database
        const messages = await messageModel.find();

        // Send the retrieved messages as a response
        res.json(messages);
    } catch (error) {
        // If there's an error, send an error response
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;