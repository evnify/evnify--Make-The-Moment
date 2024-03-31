const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'user'
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
    address2: {
        type: Array,
        required: false,
    },
    zipcode: {
        type: Number,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    profilePic: {
        type: String,
        required: false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
