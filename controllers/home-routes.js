const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get ALL posts for homepage
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: ['id', 'post_title', 'post_body', 'created_at'],
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
    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Route to sign up page and login
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// Get ONE post on the homepage
router.get('/post/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'post_title', 'post_body', 'created_at'],
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
    if (!onePost) {
      res.status(404).json({ message: 'No post with this id found' });
      return;
    }
    // Serialize the data
    const post = dbPostData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('one-post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;