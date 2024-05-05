const mongoose = require("mongoose");

const pkgViewCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const pkgViewCountModel = mongoose.model('PkgViewCount', pkgViewCountSchema);
module.exports = pkgViewCountModel;