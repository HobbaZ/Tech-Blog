const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth , async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      user_id: req.session.user_id,
      post_id: req.params.post_id,
    });
    res.status(200).json('Getting comment:', commentData)

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('post', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
    console.log('comment created:', newComment)
  } catch (err) {
    res.status(400).json(err);
    console.log('Error creating comment')
  }
});

//Get all Comments
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(commentData);
    console.log('Getting all comments ...')
  } catch (err) {
    res.status(400).json(err);
    console.log('Error getting all comments')
  }
});

//Delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const CommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        comment_id: req.body.comment_id,
      },
    });

    if (!CommentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json('Deleting comment', CommentData);
  } catch (err) {
    res.status(500).json(err);
    console.log('Error deleting comment')
  }
});

module.exports = router;
