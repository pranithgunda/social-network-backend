const router = require('express').Router();
const User = require('../../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.params.id });
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;

