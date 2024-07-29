const router = require('express').Router();
const { Thought, User } = require('../../models');

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
        res.status(500).json(err);
    }
})

module.exports = router;