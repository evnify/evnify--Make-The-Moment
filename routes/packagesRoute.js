const express = require("express");
const router = express.Router();
const Package = require("../models/package");
const Inventory = require("../models/inventory");

router.get("/getpackages", async (req, res) => {
    try {
        const packages = await Package.find();

        res.send(packages);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getPackagesByType", async (req, res) => {
    const eventType = req.body.eventType;
    try {
        const packages = await Package.find({ eventType: eventType });

        res.send(packages);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getBookingByID", async (req, res) => {
    const bookingID = req.body._id;
    try {
        const booking = await Package.find({ _id: bookingID });

        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}
);

module.exports = router;
