const router = require('express').Router();
const { Thought, User } = require('../../models');

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById({ _id: req.params.id });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that id' });
        }
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

// Add a thought
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Thought created, but found no user with the username' });
        }
        res.status(200).json({ message: 'Thought created successfully' })

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;