const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    messageId : {
        type: String,
        required: true,
        unique: true,
    },

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
    sender:{
        type:String,
        required:true,
    },
    reciverId:{
        type:String,
        required:true,
    }
}, { timestamps: true });

const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;
