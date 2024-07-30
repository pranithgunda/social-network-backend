const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// routes defined for user
router.use('/users', userRoutes);
// routes defined for thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;