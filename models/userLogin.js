const mongoose = require("mongoose");


const userLoginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ipAddress: String,
});


const userLogin = mongoose.model("userLogin", userLoginSchema);

module.exports = userLogin;
