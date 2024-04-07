const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerID : {
        type: String,
        required: true,
    },
    transactionID : {
        type: String,
        required: true,
    },
    eventType : {
        type: String,
        required: true,
    },
    packageType : {
        type: String,
        required: true,
    },
    eventLocation : [],
    eventDate : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    status : {
        type: String,
        default: true,
    },
    AssignedInventory : [],
    AssignedEmployees : [],

}, { timestamps: true });

const bookingModel =  mongoose.model("booking",bookingSchema);

module.exports =  bookingModel;