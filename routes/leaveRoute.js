const express = require("express");
const router = express.Router();

const leaveModel = require("../models/leave");
const employeeModel = require("../models/employee");

//Generate unique id for leave
const generateUniqueID = async () => {
    let id = "SD" + Math.floor(100000 + Math.random() * 900000);
    const existingLeave = await leaveModel.findOne({ leaveID: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};

function calculateTotalDaysBetweenDates(startDateStr, endDateStr) {
    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);
    var difference = endDate - startDate;

    var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

router.post("/newLeave", async (req, res) => {
    const leaveData = req.body;
    const leaveID = await generateUniqueID();

    leaveData.leaveID = leaveID;
    console.log(leaveData);
    const newLeave = new leaveModel(leaveData);

    const noOfDays = calculateTotalDaysBetweenDates(leaveData.startDate, leaveData.endDate);

    if(leaveData.leaveType === "Sick Leave") {
        const empID = leaveData.empID;
        const employee = await employeeModel.findOne({ empID: empID });
        if(employee) {
            employee.leavesBalance[1].sickUsed  = employee.leavesBalance[1].sickUsed + noOfDays;
            await employeeModel.findOneAndUpdate(
                { empID: empID },
                { leavesBalance: employee.leavesBalance }
            );
        }
    } else if(leaveData.leaveType === "Casual Leave") {
        const empID = leaveData.empID;
        const employee = await employeeModel.findOne({ empID: empID });
        if(employee) {
            employee.leavesBalance[2].casualUsed = employee.leavesBalance[2].casualUsed + noOfDays;
            await employeeModel.findOneAndUpdate(
                { empID: empID },
                { leavesBalance: employee.leavesBalance }
            );
        }
    } else if(leaveData.leaveType === "Half Leave") {
        const empID = leaveData.empID;
        const employee = await employeeModel.findOne({ empID: empID });
        if(employee) {
            employee.leavesBalance[0].halfUsed = employee.leavesBalance[0].halfUsed + noOfDays;
            await employeeModel.findOneAndUpdate(
                { empID: empID },
                { leavesBalance: employee.leavesBalance }
            );
        }
    }

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
        const leaveData = await leaveModel.findOne({ leaveID: leaveID });
        const noOfDays = calculateTotalDaysBetweenDates(leaveData.startDate, leaveData.endDate);

        if(leaveData.leaveType === "Sick Leave") {
            const empID = leaveData.empID;
            const employee = await employeeModel.findOne({ empID: empID });
            if(employee) {
                employee.leavesBalance[1].sickUsed  = employee.leavesBalance[1].sickUsed - noOfDays;
                await employeeModel.findOneAndUpdate(
                    { empID: empID },
                    { leavesBalance: employee.leavesBalance }
                );
            }
        } else if(leaveData.leaveType === "Casual Leave") {
            const empID = leaveData.empID;
            const employee = await employeeModel.findOne({ empID: empID });
            if(employee) {
                employee.leavesBalance[2].casualUsed = employee.leavesBalance[2].casualUsed - noOfDays;
                await employeeModel.findOneAndUpdate(
                    { empID: empID },
                    { leavesBalance: employee.leavesBalance }
                );
            }
        } else if(leaveData.leaveType === "Half Leave") {
            const empID = leaveData.empID;
            const employee = await employeeModel.findOne({ empID: empID });
            if(employee) {
                employee.leavesBalance[0].halfUsed = employee.leavesBalance[0].halfUsed - noOfDays;
                await employeeModel.findOneAndUpdate(
                    { empID: empID },
                    { leavesBalance: employee.leavesBalance }
                );
            }
        }
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

router.get("/getPendingLeaves", async (req, res) => {
    try {
        const pendingLeaves = await leaveModel.find({ status: "Pending" });
        res.send(pendingLeaves);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
