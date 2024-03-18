const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    empID : {
        type: String,
        required: true,
    },
    userID : {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    dob : {
        type: Object,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    gender : {
        type: String,
        required: true,
    },
    leaves : [],
    leavesBalance : [],

}, { timestamps: true });

const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
