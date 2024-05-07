const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const UserLogin = require("../models/userLogin");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const bcrypt = require("bcryptjs");
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const generateUniquePwd = async () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateUniqueID = async () => {
    let userID = "U" + Math.floor(10000000 + Math.random() * 90000000);
    const userId = await UserModel.findOne({ userID: userID });
    if (userId) {
        return generateUniqueID(userID); // Pass the userID as an argument
    }
    return userID;
};

router.post("/addUser", async (req, res) => {
    const UserUserData = req.body;
    const password = await generateUniquePwd();
    const userID = await generateUniqueID();
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    UserUserData.password = hashedPassword;
    UserUserData.userID = userID;

    const existingEmail = await UserModel.findOne({
        email: UserUserData.email,
    });
    if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await UserModel.findOne({
        username: UserUserData.username,
    });
    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new UserModel(UserUserData);

    try {
        const response = await newUser.save();

        // Send email to user with the original password
        sendPasswordEmail(UserUserData.email, password);

        res.send(response);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getUser", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
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
        res.send("User deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/editUser", async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate({ userID: userID }, userData);
        res.send("User updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/updateUser/:id", async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        await UserModel.findOneAndUpdate({ userID: id }, userData);
        res.send("User updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/change-password", async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ userID: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords in plaintext
        if (user.password !== currentPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        await UserModel.findOneAndUpdate(
            { userID: userId },
            { password: newPassword }
        );
        res.send("Password changed successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/delete-account", async (req, res) => {
    const { userId } = req.body;

    try {
        const deletedUser = await UserModel.findOneAndDelete({
            userID: userId,
        });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/suspendUser", async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate(
            { userID: userID },
            { status: "Suspended" }
        );
        res.send("User suspended successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/activeUser", async (req, res) => {
    const userData = req.body;
    const userID = userData.userID;
    try {
        await UserModel.findOneAndUpdate(
            { userID: userID },
            { status: "Active" }
        );
        res.send("User activated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            // Compare password with hashed password using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const temp = {
                    userID: user.userID,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    userType: user.userType,
                    status: user.status,
                    profilePic: user.profilePic,
                };
                res.send(temp);

                const userLogin = new UserLogin({
                    userId: user._id,
                    userType: user.userType,
                    ipAddress: req.ip,
                });
                await userLogin.save();
            } else {
                return res.status(400).json({ message: "Login Failed" });
            }
        } else {
            return res.status(400).json({ message: "Login Failed" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/loginGoogle", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({
            email: email,
        });
        if (user) {
            const temp = {
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                userType: user.userType,
                status: user.status,
                profilePic: user.profilePic,
            };
            res.send(temp);

            const userLogin = new UserLogin({
                userId: user._id,
                userType: user.userType,
                ipAddress: req.ip,
            });
            await userLogin.save();
        } else {
            return res.status(400).json({ message: "Login Failed" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/login-data", async (req, res) => {
    try {
        const loginData = await UserLogin.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$timestamp",
                        },
                    },

                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json(loginData);
    } catch (error) {
        console.error("Error fetching login data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login-type", async (req, res) => {
    try {
        const loginData = await UserLogin.aggregate([
            {
                $match: {
                    // Filter by userType
                    userType: {
                        $in: ["Customer", "Hr-Manager", "Employee", "Admin"],
                    },
                },
            },
            {
                $group: {
                    _id: "$userType", // Group by userType
                    count: { $sum: 1 }, // Count the logins for each userType
                },
            },
        ]);

        res.json(loginData);
    } catch (error) {
        console.error("Error fetching login data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/register", async (req, res) => {
    const userID = await generateUniqueID();
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing the password

    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword, // Store hashed password
        userID: userID,
        username: req.body.username,
        profilePic: req.body.profilePic,
    });

    try {
        const user = await newUser.save();
        return res.send("User Registered Successfully");
    } catch (error) {
        console.log("Error in route:", error);
        return res.status(400).json({ error });
    }
});

router.post("/getUserById", async (req, res) => {
    const { userID } = req.body;
    try {
        const user = await UserModel.findOne({
            userID: userID,
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/updateUserProfile", async (req, res) => {
    const { userID, profilePic, username } = req.body;
    try {
        await UserModel.findOneAndUpdate(
            { userID: userID },
            { profilePic: profilePic }
        );
        res.send("Profile updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/updateUserCover", async (req, res) => {
    const { userID, coverPic } = req.body;
    try {
        await UserModel.findOneAndUpdate(
            { userID: userID },
            { coverPic: coverPic }
        );
        res.send("Cover updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/check-existing", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if a user with the provided email exists in the database
        const existingUser = await UserModel.findOne({ email });

        // If a user with the provided email exists, return true
        // Otherwise, return false
        return res.json({ exists: !!existingUser });
    } catch (error) {
        console.error("Error checking existing user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }

        // Generate token
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email }, secret, { expiresIn: "15m" });

        // Construct reset link without including token
        const resetLink = `http://localhost:5000/api/users/generate-reset-link/${oldUser.userID}/${token}`;
        console.log(resetLink);

        sendResetLinkByEmail(email, resetLink, token);

        res.json({ status: "Email sent with reset instructions" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

function sendResetLinkByEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Evnify",
            address: process.env.GMAIL_EMAIL,
        },
        to: email,
        subject: "Password Reset",
        html: `Click this link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

function sendPasswordEmail(email, password) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Evnify",
            address: process.env.GMAIL_EMAIL,
        },
        to: email,
        subject: "Temp password",
        html: `
            <!DOCTYPE html>
            <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f4f4f4;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .footer {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Here is your new password:</p>
            <h2>${password}</h2>
            <p>Please login with this password and change it immediately for security reasons.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Thank you,</p>
            <p>The Evnify Team</p>
        </div>
    </div>
</body>
</html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
router.get("/generate-reset-link/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    try {
        const oldUser = await UserModel.findOne({ userID: id });
        if (!oldUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            if (!verify) {
                return res.status(401).json({ message: "Token has expired" });
            }
            res.redirect(`http://localhost:3000/reset-password/${id}/${token}`);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Token has expired" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ userID: id });
        if (!oldUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            if (!verify) {
                return res.status(401).json({ message: "Token has expired" });
            }

            // No need to hash the password, use it directly
            await UserModel.findOneAndUpdate(
                { userID: id },
                { password: password } // Just set the password directly
            );
            return res
                .status(200)
                .json({ message: "Password updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Token has expired" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
