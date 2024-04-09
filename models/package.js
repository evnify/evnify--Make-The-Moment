const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageId : {
        type: String,
        required: true,
    },
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

const packageModel = mongoose.model("packages", packageSchema);
module.exports = packageModel;