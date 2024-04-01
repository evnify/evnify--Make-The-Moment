
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID : {
        type: String,
        required: true,
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


const User = mongoose.model('users', userSchema);

module.exports = User;


