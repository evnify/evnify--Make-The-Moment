const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageType : {
        type: String,
        required: true,
    },
    eventType : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    baseImage : {
        type: String,
        required: true,
    },
    inventories : [],
    extras : [],
    contentImages: [],

}, { timestamps: true });