const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    leaveID : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    empID : {
        type: String,
        required: true,
    },
    leaveType : {
        type: String,
        required: true,
    },
    startDate : {
        type: Object,
        required: true,
    },
    endDate : {
        type: Object,
        required: true,
    },
    reason : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        default: "Pending",
    },
}, { timestamps: true });

const leaveModel = mongoose.model("leaves", leaveSchema);
module.exports = leaveModel;
