const express = require("express");
const router = express.Router();
const ViewCount = require("../models/viewCount");

router.get("/trigger", async (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    
    const viewCount = await ViewCount.findOne({ date });
    if (!viewCount) {
        const newViewCount = new ViewCount({
            count: 1,
            date,
        });
        await newViewCount.save();
        return res.send("View count created");
    }
    viewCount.count += 1;
    const response = await viewCount.save();
    res.send("View count incremented " + response.count);
});

router.get("/getAllCounts", async (req, res) => {
    const viewCounts = await ViewCount.find();
    res.send(viewCounts);
});

module.exports = router;