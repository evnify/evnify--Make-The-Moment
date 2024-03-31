const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionID : {
        type: String,
        required: true,
    },
    customerID : {
        type: String,
        required: true,
    },
    customerEmail : {
        type: String,
        required: true,
    },
    packageType : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    paymentType : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
}, { timestamps: true });

const paymentModel= mongoose.model('payment', paymentSchema);
module.exports = paymentModel;