const router = require('express').Router();
const { UPSERT } = require('sequelize/types/query-types');
const { User, Post, Comment } = require('../../models');

//Get ALL users
router.get('/', async (req, res) => {
  // find all categories
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get ONE User
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const singleUser = await User.findOne({
      // be sure to include its associated Products
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          attributes: ['id', 'post_title', 'post_body', 'created_at'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title'],
          },
        },
      ],
    });
    if (!singleUser) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create a User
