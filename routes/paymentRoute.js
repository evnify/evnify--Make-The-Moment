const express = require("express");
const router = express.Router();

const paymentModel = require("../models/payment");

router.get("/getPaymentData", async (req, res) => {
    try {
        const paymentData = await paymentModel.find();
        res.status(200).send(paymentData);
    } catch (error) {
        return res.status(400).json({ message: "something went wrong" });
    }
    })

module.exports = router;