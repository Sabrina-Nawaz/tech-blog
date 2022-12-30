const { Post } = require('../models');

const postInfo = [
  {
    post_title: 'Bebop is now live!',
    post_body:
      'The Bebop is the newest app where you can create fictional avatars to your own liking and give them a role, like space bounty hunting cowboys!',
    user_id: 1,
  },
  {
    post_title: 'Calendate is public!',
    post_body:
      'Calendate is a basic calendar application which allows the user to save events in each hour of the day. It runs in the browser and is dynamically updated using HTML and CSS, while also utilizing jQuery and Moment.js',
    user_id: 2,
  },
  {
    post_title: 'Tech Blog to be released!',
    post_body:
      "Amazing news about the Content Management Style blog, Tech Blog, is to be released in January 2023! Users can publish blog posts while also being able to commenting on other users' posts. The back-end uses an MVC format in terms of structure, Sequelize as the ORM, authenticating with npm express and Handlebars.js as the language.",
    user_id: 4,
  },
];

const postSeeds = () => Post.bulkCreate(postInfo);

module.exports = postSeeds;
