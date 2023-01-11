const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get ALL posts for the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const allDBPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
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
    // Serialize data so the template can read it
    const posts = allDBPosts.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('dashboard', { posts, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get ONE post for the dashboard
