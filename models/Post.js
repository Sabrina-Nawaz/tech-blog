const { Model, DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/connection');

// Create post model
class Post extends Model {}

// Establish fields for the Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'post',
  }
);

module.exports = Post;
