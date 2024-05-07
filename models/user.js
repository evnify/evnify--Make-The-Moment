const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    userID: {
        type: String,
        required: false,
    },

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "Customer",
    },
    city: {
        type: Array,
        required: false,
    },
    province: {
        type: Array,
        required: false,
    },
    address1: {
        type: Array,
        required: false,
    },
    addressArr: {
        type: Array,
        default: [],
        required: false
    },
    zipcode: {
        type: Number,
        default: null,
    },
    status: {
        type: String,
        default: "Active",
    },
    profilePic: {
        type: String,
        required: false,
    },

    coverPic: {
        type: String,
        required: false,
    },
    
},{ timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;
