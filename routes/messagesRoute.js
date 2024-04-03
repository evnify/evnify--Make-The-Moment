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


router.delete('/deleteMessage/:id', async (req, res) => {
    const messageId = req.params.id;

    try {
        // Find the message by ID and delete it
        const deletedMessage = await messageModel.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            // If the message with the specified ID is not found, return a 404 status
            return res.status(404).json({ message: "Message not found" });
        }

        // If the message is successfully deleted, send a success response
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        // If there's an error, send an error response
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;