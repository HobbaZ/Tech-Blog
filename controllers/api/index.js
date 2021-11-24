const router = require('express').Router();
//put routes here
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('/userRoutes');

router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;