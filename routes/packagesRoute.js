const express = require("express");
const router = express.Router();
const Package = require("../models/package")
const Inventory = require("../models/inventory")
router.get("/getpackages", async (req, res) => {
    try {
        const packages = await Package.find();
        
        res.send(packages);
        
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  });

    router.post("/getItemById", async (req, res) => {
        const itemId = req.body.itemId;
        try {
            const item = await Package.findOne({_id:itemId});
            
            res.send(item);
            
        } catch (error) {
            return res.status(400).json({ message: error });
        }
  });
router.post("/getInventoriesByIds", async (req, res) => {
    const inventoryId = req.body.itemID;
    console.log(inventoryId);
    try {
        const inventories = await Inventory.find({itemID:inventoryId});
        
        res.send(inventories);
        
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


module.exports = router;