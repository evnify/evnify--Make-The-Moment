const express = require("express");
const router = express.Router();
const PkgViewCount = require("../models/pkgViewCount");

router.get("/trigger", async (req, res) => {

    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const pkgViewCount = await PkgViewCount.findOne({ date });
    if (!pkgViewCount) {
        const newPkgViewCount = new PkgViewCount({
            count: 1,
            date,
        });
        await newPkgViewCount.save();
        return res.send("View count created");
    }
    pkgViewCount.count += 1;
    const response = await pkgViewCount.save();
    res.send("View count incremented " + response.count);
});

router.get("/getAllCounts", async (req, res) => {
    const pkgViewCount = await PkgViewCount.find();
    res.send(pkgViewCount);
});

module.exports = router;