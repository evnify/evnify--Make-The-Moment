const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    salaryID : {
        type: String,
        required: true,
    },
    employeeID : {
        type: String,
        required: true,
    },
    employeeName : {
        type: String,
        required: true,
    },
    employeeStatus : {
        type: String,
        required: true,
    },  
    basicSalary : {
        type: Number,
        required: true,
    },
    employeeEmail : {
        type: String,
        required: true,
    },
    
    allowance : [],
    deduction : [],
    
    netSalary : {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const salaryModel= mongoose.model('salary', salarySchema);
module.exports = salaryModel;
