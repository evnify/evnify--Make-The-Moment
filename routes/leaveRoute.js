const express = require("express");
const router = express.Router();

const leaveModel = require("../models/leave");

//Generate unique id for leave
const generateUniqueID = async () => {
    let id = "SD" + Math.floor(100000 + Math.random() * 900000);
    const existingLeave = await leaveModel.findOne({ leaveID: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};

router.post("/newLeave", async (req, res) => {
    const leaveData = req.body;
    const leaveID = await generateUniqueID();

    leaveData.leaveID = leaveID;
    console.log(leaveData);
    const newLeave = new leaveModel(leaveData);

    try {
        await newLeave.save();
        res.send("Leave request submitted successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getAllLeaves", async (req, res) => {
    try {
        const allLeaves = await leaveModel.find();
        res.send(allLeaves);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/approveLeave", async (req, res) => {
    const leaveID = req.body.leaveID;
    try {
        await leaveModel.findOneAndUpdate(
            { leaveID: leaveID },
            { status: "Approved" }
        );
        res.send("Leave request approved successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/declineLeave", async (req, res) => {
    const leaveID = req.body.leaveID;
    try {
        await leaveModel.findOneAndUpdate(
            { leaveID: leaveID },
            { status: "Rejected" }
        );
        res.send("Leave request declined successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getLeaveByEmpID", async (req, res) => {
    const empID = req.body.empID;
    try {
        const leaves = await leaveModel.find({ empID: empID });
        res.send(leaves);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/editLeaveRequestByID", async (req, res) => {
    const leaveID = req.body.leaveID;
    const leaveData = req.body;
    try {
        const updatedLeave = await leaveModel.findOneAndUpdate(
            {
                leaveID,
            },
            leaveData,
            { new: true }
        );
        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave not found." });
        }
        res.json(updatedLeave);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/deleteLeaveRequestByID", async (req, res) => {
    const leaveID = req.body.leaveID;
    try {
        const deletedLeave = await leaveModel.findOneAndDelete({
            leaveID: leaveID,
        });
        if (!deletedLeave) {
            return res.status(404).json({ message: "Leave not found." });
        }
        res.json(deletedLeave);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
