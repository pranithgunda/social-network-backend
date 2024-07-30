const router = require('express').Router();
const User = require('../../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
            // exclude document version key
            .select('-__v')
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.params.id })
            // exclude document version key
            .select('-__v')
            // populate thoughts and friends
            .populate('thoughts')
            .populate('friends');

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
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

// Update user
router.put('/:id', async (req, res) => {
    try {
        const filter = req.params.id;
        const update = req.body;
        const updateUser = await User.findByIdAndUpdate(filter, update, { new: true });
        if (!updateUser) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.status(200).json(updateUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a user

router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
        if (!deleteUser) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Add friend to user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete user friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            // use pull operator to remove specific element from array
            { $pull: { friends: req.params.friendId } },
            // {new:true} will return updated document
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;

