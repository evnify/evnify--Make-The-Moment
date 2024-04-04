const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

const generateUniquePwd = async () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateUniqueID = async () => {
    let id = 'U' + Math.floor(10000000 + Math.random() * 90000000);
    const existingLeave = await UserModel.findOne({ userID: id });
    if (existingLeave) {
        return generateUniqueID();
    }
    return id;
};


router.post("/addUser", async (req, res) => {
    const UserUserData = req.body;
    const password = await generateUniquePwd();
    const userID = await generateUniqueID();
    UserUserData.password = password;
    UserUserData.userID = userID;

    const newUser = new UserModel(UserUserData);

    try {
        await newUser.save();
        res.send("User added successfully");
        console.log("User added successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getUser", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
        console.log(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/deleteUser", async (req, res) => {
    try {
        const { userID } = req.body; // Extract userID from request body
        const deletedUser = await UserModel.findOneAndDelete({ userID });
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        console.log("Deleted user:", deletedUser);
        res.send("User deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/editUser', async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate({ userID: userID }, userData);
        res.send("Employee updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/suspendUser', async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate({ userID: userID }, { status: 'Suspended' });
        res.send("User suspended successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/activeUser', async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate({ userID: userID }, { status: 'Active' });
        res.send("User activated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});




router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email: email, password: password })
        if (user) {

            const temp = {
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                userType: user.userType,
                status: user.status
            }
            res.send(temp);
        }
        else {
            return res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

});





router.post("/register", async (req, res) => {

    const newuser = new UserModel(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password, 
        });

    try {
        const user = await newuser.save();
        return res.send('User Registered Successfully');
    } catch (error) {
        console.log("error in route")
        console.log(newuser)
        return res.status(400).json({ error });
    }

});




module.exports = router;
