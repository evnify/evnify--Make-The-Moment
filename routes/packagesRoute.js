const express = require('express');
const router = express.Router();
const Package = require("../models/package");
const Inventory = require("../models/inventory");

const inventories = require('../models/inventory');
const packageModel = require('../models/package');

// Get all users
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/getPackage/:id', (req, res) => {
    const id = req.params.id;
    Package.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.post('/createPackage', async (req, res) => {
    const packages = new User({
        packageType: req.body.packageType,
        eventType: req.body.eventType,
        price: req.body.price,
        inventories: req.inventories,
        description: req.body.description,
        price: req.body.price,
        extras: req.body.extras,
    });

    try {
        const newPackage = await user.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update user
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package == null) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.name != null) {
            package.name = req.body.name;
        }

        if (req.body.email != null) {
            package.email = req.body.email;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/getpackages", async (req, res) => {
    try {
        const packages = await Package.find();

        res.send(packages);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


// Delete a user
router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.post("/getPackagesByType", async (req, res) => {
    const eventType = req.body.eventType;
    try {
        const packages = await Package.find({ eventType: eventType });


        res.send(packages);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//Generate unique id for leave
const generateUniqueID = async (packageType, eventType) => {
    let id = 'PKG' + Math.floor(100000 + Math.random() * 900000);
    const existingPackage = await packageModel.findOne({ packageId: id, packageType: packageType, eventType: eventType });
    if (existingPackage) {
        return generateUniqueID(packageType, eventType);
    }
    return id;
};

//get all packages
router.get('/allPackages', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get all inventory
router.get('/allInventory', async (req, res) => {
    try {
        const inven = await inventories.find();
        res.json(inven);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new package
router.post('/addPackage', async (req, res) => {
    const { packageType, eventType } = req.body;
    
    // Check if the event type already has three package types
    try {
        const packageCount = await Package.countDocuments({ eventType: eventType });
        if (packageCount >= 3) {
            return res.status(400).json({ message: 'Each event type can have only three package types.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // Generate unique package ID
    const packageId = await generateUniqueID(packageType, eventType);

    try {
        // Check if the package already exists
        const existingPackage = await Package.findOne({ packageType: packageType, eventType: eventType });
        if (existingPackage) {
            return res.status(400).json({ message: 'Package already exists for this event type and package type.' });
        }

        // Create new package
        const { price, description, baseImage, inventories, extras, contentImages } = req.body;
        const newPackage = new Package({
            packageId,
            packageType,
            eventType,
            price,
            description,
            baseImage,
            inventories,
            extras,
            contentImages
        });
        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete package by id

router.delete('/deletePackage/:id', async (req, res) => {
    const packageId = req.params.id;
    try {
        const deletedPackage = await Package
            .findByIdAndDelete(packageId);
        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

//get package by id
router.get('/getPackage/:id', async (req, res) => {
    const packageId = req.params.id;
    try {
        const package = await Package.findById(packageId);
        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update package route
router.put('/updatePackage/:packageId', async (req, res) => {
    const packageId = req.params.packageId;
    const updatedPackageData = req.body; // New package data

    try {
        // Update the package in the database using the packageId
        const updatedPackage = await Package.findByIdAndUpdate(packageId, updatedPackageData, { new: true });
        res.status(200).json(updatedPackage);
    } catch (error) {
        console.error('Error updating package:', error);
        res.status(500).json({ message: 'Failed to update package' });
    }
});

router.get('/getInventoriesByEventType/:eventType', async (req, res) => {
    const eventType = req.params.eventType;
    try {
        const inventories = await Inventory.find({ AssignedEvents: eventType });
        res.send(inventories);
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
});

router.post("/getInventoryByID", async (req, res) => {
    const inventoryID = req.body.itemID;
    try {
        const inventory = await Inventory.find({ itemID: inventoryID });

        res.send(inventory);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;

