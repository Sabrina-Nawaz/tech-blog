const { Comment } = require('../models');

const commentInfo = [
  {
    user_id: 1,
    post_id: 2,
    comment_text: 'Cannot wait for this!',
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: 'We just launched, come check us out!',
  },
  {
    user_id: 2,
    post_id: 5,
    comment_text: 'Please go live ASAP!',
  },
];

const commentSeeds = () => Comment.bulkCreate(commentInfo);

module.exports = commentSeeds;
