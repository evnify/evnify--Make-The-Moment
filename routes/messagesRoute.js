const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const messageModel = require("../models/message");
const userModel = require("../models/user");
dotenv.config();

//fetch all users
router.get("/allUsers", async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Generate unique id for the message
const generateUniqueID = async () => {
    let id = "TM" + Math.floor(100000 + Math.random() * 900000);
    const existingMessage = await messageModel.findOne({ messageId: id });
    if (existingMessage) {
        return generateUniqueID();
    }
    return id;
};

const hateWords = [
    "hate",
    "bitch",
    "racism",
    "sexist",
    "homophobic",
    "bigot",
    "prejudice",
    "supremacist",
    "xenophobic",
    "misogyny",
    "anti-Semitic",
    "Islamophobic",
    "transphobic",
    "chauvinist",
    "hate-monger",
    "intolerant",
    "slurs",
    "dehumanizing",
    "derogatory",
    "offensive",
    "hate-filled",
    "hostile",
    "inflammatory",
    "hurtful",
    "bullying",
    "abusive",
    "violent",
    "threatening",
    "harassing",
    "taunting",
    "belittling",
    "demeaning",
    "offensive",
    "derogatory",
    "disrespectful",
    "degrading",
    "revolting",
    "repulsive",
    "vile",
    "loathsome",
    "abhorrent",
    "detestable",
    "despicable",
    "disgusting",
    "abominable",
    "monstrous",
    "appalling",
    "reprehensible",
    "odious",
    "execrable",
    "contemptible",
    "hateful",
    "vile",
    "nasty",
    "mean",
    "ugly",
    "rotten",
    "wicked",
    "evil",
    "despicable",
    "nefarious",
    "vicious",
    "malicious",
    "spiteful",
    "venomous",
    "malevolent",
    "malignant",
    "fuck",
    "pernicious",
    "noxious",
    "toxic",
    "harmful",
    "hurtful",
    "damaging",
    "injurious",
    "detrimental",
    "deleterious",
    "destructive",
    "dangerous",
    "poisonous",
    "virulent",
    "lethal",
    "murderous",
    "violent",
    "ferocious",
    "brutal",
    "savage",
    "barbaric",
    "cruel",
    "ruthless",
    "merciless",
    "sadistic",
    "psychopathic",
    "sociopathic",
    "monstrous",
    "inhumane",
    "heartless",
    "cold-blooded",
    "callous",
    "unfeeling",
];
// List of hate words to check against

// Add a new message
router.post("/newMessage", async (req, res) => {
    const { message } = req.body;

    // Check if the message contains any hate words
    const containsHateWords = hateWords.some((word) =>
        message.toLowerCase().includes(word)
    );

    if (containsHateWords) {
        return res
            .status(400)
            .json({ message: "Message contains prohibited content" });
    }

    const {
        customerID,
        sendDate,
        sendTime,
        category,
        status,
        sender,
        reciverId,
    } = req.body;
    const messageId = await generateUniqueID();

    const newMessage = new messageModel({
        messageId,
        customerID,
        message,
        sendDate,
        sendTime,
        category,
        status,
        sender,
        reciverId,
    });

    try {
        await newMessage.save();
        res.send("Message submitted successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get("/allMessages", async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/deleteMessage/:id", async (req, res) => {
    const messageId = req.params.id;
    try {
        const deletedMessage = await messageModel.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/updateMessage/:id", async (req, res) => {
    const messageId = req.params.id;
    const { message, sendDate, sendTime, category, status, sender } = req.body;

    try {
        const updatedMessage = await messageModel.findByIdAndUpdate(
            messageId,
            { message, sendDate, sendTime, category, status, sender },
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to mark messages as read for a specific user ID
router.put("/markMessagesAsRead/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        await messageModel.updateMany(
            { customerID: userID, status: "unread" },
            { status: "read" }
        );
        res.status(200).json({
            message: "Messages marked as read successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
