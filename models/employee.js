const mongoose = require("mongoose");

const leaveBalanceDefault = 
    [{"Half Leave": 7},
    {"Sick Leave": 7},
    {"Casual Leave": 7}]
;

const employeeSchema = new mongoose.Schema({
    empID : {
        type: String,
        required: true,
    },
    userID : {
        type: String,
        required: true,
    },
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    profileImage : {
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
    status : {
        type: String,
        default: "active",
    },
    leavesBalance : {
        type: Array,
        default: leaveBalanceDefault
    },
    leaves : [],

}, { timestamps: true });

const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
