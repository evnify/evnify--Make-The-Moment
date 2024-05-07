const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory");


const generateUniqueID = async () => {
    let itemID = 'I' + Math.floor(10000000 + Math.random() * 90000000);
    const itemId = await Inventory.findOne({ itemID: itemID });
    if (itemId) {
        return generateUniqueID(itemID); // Pass the itemID as an argument
    }
    return itemID;
};

// Create a new inventory item
router.post("/addInventory", async (req, res) => {
    try {
        // Check if the itemName already exists
        const existingItem = await Inventory.findOne({ itemName: req.body.itemName });
        if (existingItem) {
            // If itemName already exists, return an error
            return res.status(400).json({ message: "Item with the same name already exists." });
        }
        
        // If itemName doesn't exist, proceed to create the new item
        const itemID = await generateUniqueID();
        req.body.itemID = itemID;
        const newItem = await Inventory.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all inventory items
router.get("/getInventories", async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single inventory item
router.get("/:id", async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an inventory item
router.put("/putInventories/:id", async (req, res) => {
    try {
        const existingItem = await Inventory.findOne({ itemName: req.body.itemName });
        if (existingItem && existingItem._id.toString() !== req.params.id) {
            // If an item with the same name already exists and it's not the item being updated
            return res.status(400).json({ message: "Item name already exists" });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete an inventory item
router.delete("/deleteInventories/:id", async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
