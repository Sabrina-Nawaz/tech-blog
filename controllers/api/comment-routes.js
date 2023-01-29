const router = require('express').Router();
const { response } = require('express');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get ALL Comments
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll({});
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a Comment
router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
// Delete a Comment
router.delete('/:id', async (req, res) => {
  // delete a Comment by its `id` value
  try {
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!deletedComment) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
