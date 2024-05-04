const express = require("express");
const router = express.Router();
const ViewCount = require("../models/viewCount");

router.get("/trigger", async (req, res) => {

    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const viewCount = await ViewCount.findOne({ date });
    if (!viewCount) {
        const newViewCount = new ViewCount({
            count: 1,
            date,
        });
        await newViewCount.save();
        return res.send("View count created");
    }
    viewCount.count += 0.5;
    const response = await viewCount.save();
    res.send("View count incremented " + response.count);
});

router.get("/getAllCounts", async (req, res) => {
    const viewCounts = await ViewCount.find();
    res.send(viewCounts);
});

module.exports = router;