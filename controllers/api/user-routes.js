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
  // find one user by its `id` value
  try {
    const singleUser = await User.findOne({
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
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      category_name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Update a User
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a User by its `id` value
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deletedUser) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
