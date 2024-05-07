const express = require("express");
const router = express.Router();

const salaryModel = require("../models/salary");

const generateUniqueID = async () => {
    let id = "S" + Math.floor(10000000 + Math.random() * 90000000);
    const available = await salaryModel.findOne({ salaryID: id });
    if (available) {
        return generateUniqueID();
    }
    return id;
};

router.post("/addPayroll", async (req, res) => {
    const salaryData = req.body;
    const salaryID = await generateUniqueID();
    salaryData.salaryID = salaryID;
    try {
        const existingPayroll = await salaryModel.findOne({
            employeeID: salaryData.employeeID,
            fromDate: { $lte: salaryData.toDate },
            toDate: { $gte: salaryData.fromDate }
        });

        if (existingPayroll) {
            return res.status(400).json({ message: "User already has a payroll within the specified date range" });
        }

        const payRoll = new salaryModel(salaryData);
        await payRoll.save();
        res.status(200).send("Payroll added successfully");
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.get("/getAllPayroll", async (req, res) => {
    try {
        const payRoll = await salaryModel.find();
        res.status(200).send(payRoll);
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.post("/setPaidByID", async (req, res) => {
    const salaryID = req.body.salaryID;
    try {
        await salaryModel.updateOne({ salaryID: salaryID }, { status: "Paid" });
        res.status(200).send("Salary paid successfully");
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.post("/deletePayrollByID", async (req, res) => {
    const salaryID = req.body.salaryID;
    try {
        await salaryModel.deleteOne({ salaryID: salaryID });
        res.status(200).send("Salary deleted successfully");
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.post("/updatePayroll", async (req, res) => {
    const salaryData = req.body;
    try {
        await salaryModel.updateOne(
            { salaryID: salaryData.salaryID },
            salaryData
        );
        res.status(200).send("Salary updated successfully");
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.post("/getPayrollByEmpID", async (req, res) => {
    const empID = req.body.empID;
    try {
        const payRoll = await salaryModel.find({ employeeID: empID });
        res.status(200).send(payRoll);
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

module.exports = router;
