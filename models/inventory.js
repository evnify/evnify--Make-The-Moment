const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    itemID : {
        type: String,
        required: true,
    },
    itemName : {
        type: String,
        required: true,
    },
    unitPrice : {
        type: Number,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    color : {
        type: String,
        required: true,
    },
    itemType : {
        type: String,
        required: true,
    },
    itemImage : {
        type: String,
        required: false,
    },
    category : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        default: "Available",
    },
    AssignedEvents : [],

}, { timestamps: true });

const inventoryModel = mongoose.model("inventory", inventorySchema);
module.exports = inventoryModel;