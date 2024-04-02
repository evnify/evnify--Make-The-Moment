const express = require("express");
const router = express.Router();

const leaveModel = require("../models/leave");


//Generate unique id for leave
const generateUniqueID = async () => {
    let id = 'SD' + Math.floor(100000 + Math.random() * 900000);
    const existingLeave = await leaveModel.findOne({ leaveID: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};

router.post('/newLeave',async (req,res)=>{
    const leaveDate = req.body;
    const leaveID = await generateUniqueID();

    leaveDate.leaveID = leaveID;
    const newLeave = new leaveModel(leaveDate);

    try{
        await newLeave.save();
        res.send("Leave request submitted successfully");
    }catch(error){
        return res.status(400).json({message: error});
    }

});

router.get('/getAllLeaves',async (req,res)=>{
    try{
        const allLeaves = await leaveModel.find();
        res.send(allLeaves);
    }catch(error){
        return res.status(400).json({message: error});
    }
});



module.exports = router;