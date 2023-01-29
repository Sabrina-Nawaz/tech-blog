const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get ALL users
router.get('/', async (req, res) => {
  // find all categories
  console.log('========');
  try {
    const allUsers = await Post.findAll({
      attributes: ['id', 'post_title', 'created_at', 'post_body'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get ONE post
router.get('/:id', async (req, res) => {
  // find one post by its `id` value
  try {
    const singlePost = await Post.findOne({
      attributes: ['id', 'post_title', 'created_at', 'post_body'],
      where: { id: req.params.id },
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    if (!singlePost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(singlePost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update a post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      post_title: req.body.post_title,
      post_body: req.body.post_body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      if (!updatedPost) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(updatedPost);
    })
    .catch((err) => res.json(err));
  res.status(500).json(err);
});
// Delete a post
router.delete('/:id', async (req, res) => {
  // delete a Post by its `id` value
  try {
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!deletedPost) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
