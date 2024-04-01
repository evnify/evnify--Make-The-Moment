const express = require("express");
const router = express.Router();

const employeeModel = require("../models/user");

const generateUniquePwd = async () => {
    let id = Math.floor(10000000 + Math.random() * 90000000);
    return id;
};

const generateUniqueID = async () => {
    let id = 'U' + Math.floor(10000000 + Math.random() * 90000000);
    const existingLeave = await employeeModel.findOne({ empID: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};

router.post('/addUser', async (req, res) => {
    const UserUserData = req.body;
    const UserID = await generateUniqueID();
    const password = await generateUniquePwd();

    employeeData.UserID = UserID;

    const newUser = new UserModel(UserUserData);
    try {
        await newUser.save();
        res.send("User added successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    

});

router.get('/getUser', async (req, res) => {
    const User = await UserModel.find();
    res.send(User);
});

module.exports = router;