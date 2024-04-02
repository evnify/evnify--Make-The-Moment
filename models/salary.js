const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    allowances: [String],
    deductions: [String],
    netSalary: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const salaryModel = mongoose.model('Salary', salarySchema);
module.exports = salaryModel;
