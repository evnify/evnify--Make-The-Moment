const express = require("express");
const router = express.Router();

const blogModel = require("../models/blog");

router.post("/addBlogs", async (req, res) => {
    try {
        const blog = new blogModel(req.body);
        await blog.save();
        res.send("Blog added successfully");
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

router.get("/getBlogs", async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.send(blogs);
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

module.exports = router;
