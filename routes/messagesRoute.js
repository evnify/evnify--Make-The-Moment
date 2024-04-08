 const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const messageModel = require("../models/message");
dotenv.config();

// // Initialize Mailgun with your API key and domain
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN,
// });

// // Route to send an email
// router.post('/email', async (req, res) => {
//   try {
//     const { email, subject, message } = req.body;
//     console.log("email",email)
//     // Construct the email data
//     const data = {
//       from: 'YourName <youremail@example.com>',
//       to: email,
//       subject: subject,
//       html: `<p>${message}</p>`,
//     };

//     // Send the email using Mailgun
//     mg.messages().send(data, (error, body) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ message: 'Error in sending email' });
//       } else {
//         console.log("Email sent successfully:", body);
//         return res.status(200).json({ message: 'Email sent successfully' });
//       }
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


//Generate unique id for the message
const generateUniqueID = async () => {
    let id = 'TM' + Math.floor(100000 + Math.random() * 900000);
    const existingMessage = await messageModel.findOne({ messageId: id });
    if (existingMessage) {
        return generateUniqueID();
    }
    return id;
};

// Add a new message
router.post('/newMessage', async (req, res) => {

    const {customerID,message,sendDate,sendTime,category,status,sender,reciverId} = req.body;
    const messageId = await generateUniqueID();

    message.messageId = messageId;
    const newMessage = new messageModel({ messageId,customerID,message,sendDate,sendTime,category,status,sender,reciverId});
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

router.put('/updateMessage/:id', async (req, res) => {
    const messageId = req.params.id;
    const { message, sendDate, sendTime, category, status, sender } = req.body;

    try {
        // Find the message by ID and update it with the new data
        const updatedMessage = await messageModel.findByIdAndUpdate(
            messageId,
            { message, sendDate, sendTime, category, status, sender },
            { new: true } // Return the updated message after the update operation
        );

        if (!updatedMessage) {
            // If the message with the specified ID is not found, return a 404 status
            return res.status(404).json({ message: "Message not found" });
        }

        // If the message is successfully updated, send the updated message as a response
        res.json(updatedMessage);
    } catch (error) {
        // If there's an error, send an error response
        res.status(500).json({ message: error.message });
    }
});

// Route to mark messages as read for a specific user ID
router.put('/markMessagesAsRead/:userID', async (req, res) => {
    try {
      const userID = req.params.userID;
      // Update messages with status 'unread' to 'read' for the given user ID
      await messageModel.updateMany({ customerID: userID, status: 'unread' }, { status: 'read' });
      res.status(200).json({ message: 'Messages marked as read successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  



module.exports = router;