const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

const generateUniquePwd = async () => {
    let id = Math.floor(10000000 + Math.random() * 90000000);
    return id;
};

const generateUniqueID = async () => {
    let id = 'U' + Math.floor(10000000 + Math.random() * 90000000);
    const existingLeave = await UserModel.findOne({ userId: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};

router.post('/addUser', async (req, res) => {
    const UserUserData = req.body;
    const userID = await generateUniqueID();
    console.log(userID);
    const password = await generateUniquePwd();

    UserUserData.userID = userID;
    UserUserData.password = password;

    const newUser = new UserModel(UserUserData);

    console.log(newUser);
    try {
        await newUser.save();
        res.send("User added successfully");
        console.log("User added successfully"	);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    

});

router.get('/getUser', async (req, res) => {
    try {
        const User = await UserModel.find();
        res.send(User);
        console.log(User)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = router;