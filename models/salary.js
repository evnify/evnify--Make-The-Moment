const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    basicSalary: {
        type: String,
        required: true,
    },
    allowances: [],
    deductions: [],

    netSalary: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const salaryModel = mongoose.model('Salary', salarySchema);
module.exports = salaryModel;
