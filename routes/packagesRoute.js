const express = require('express');
const router = express.Router();

const Package = require('../models/package');
const inventories = require('../models/inventory');

// Get all users
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by ID
router.get('/getPackage/:id', (req, res) => {
    const id = req.params.id;
    Package.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

// Create a new user
router.post('/createPackage', async (req, res) => {
    const packages = new User({
        packageType: req.body.packageType,
        eventType: req.body.eventType,
        price: req.body.price,
        inventories: req.inventories,
        description:req.body.description,
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

// Delete a user
router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})



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
    const { packageType, eventType, price, description, baseImage, inventories, extras, contentImages } = req.body;
    try {
      const newPackage = new Package({
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
  


module.exports = router;