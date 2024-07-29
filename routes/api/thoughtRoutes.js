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
        const user = await User.findByIdAndUpdate(
            { _id: req.body.userId },
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

// Update thought
router.put('/:id', async (req, res) => {
    try {
        const filter = req.params.id;
        const update = req.body;
        const updateThought = await Thought.findByIdAndUpdate(filter, update, { new: true });
        if (!updateThought) {
            res.status(404).json({ message: 'No thought found with that id' });
            return;
        }
        res.status(200).json(updateThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a thought

router.delete('/:id', async (req, res) => {
    try {
        const deleteThought = await Thought.findOneAndDelete({ _id: req.params.id });
        if (!deleteThought) {
            res.status(404).json({ message: 'No thought found with that id' });
            return;
        }
        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Add reactions to thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that id' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(200).json(err);
    }
})


module.exports = router;