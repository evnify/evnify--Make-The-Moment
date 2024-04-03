const express = require("express");
const router = express.Router();

const salaryModel = require("../models/salary");

router.post("/addPayroll", async (req, res) => {
    try{
        const payRoll = new salaryModel(req.body);
        await payRoll.save();
        res.status(200).send("Payroll added successfully");
    }catch(err){
        return res.status(400).json({message: "something went wrong"});
    }
});

router.get("/getAllPayroll", async (req, res) => {
    try{
        const payRoll = await salaryModel.find();
        res.status(200).send(payRoll);
    }catch(err){
        return res.status(400).json({message: "something went wrong"});
    }
}
);





module.exports = router;