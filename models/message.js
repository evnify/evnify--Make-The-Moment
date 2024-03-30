const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    
    customerID : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
    sendDate : {
        type: String,
        required: true,
    },
    sendTime : {
        type: String,
        required: true,
    },
    category : {
        type:String,
        required: true,
    },
    status : {
        type: String,
        default: "unread",
    },
}, { timestamps: true });

const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;
