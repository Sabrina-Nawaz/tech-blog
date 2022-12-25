//Import models to connect the associations
// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
