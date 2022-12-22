//Import models to connect the associations
// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post)