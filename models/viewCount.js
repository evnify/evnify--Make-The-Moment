const mongoose = require("mongoose");

const viewCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const viewCountModel = mongoose.model('ViewCount', viewCountSchema);
module.exports = viewCountModel;
