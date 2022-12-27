const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create comment model
class Comment extends Model {}

// Establish fields for the Comment model 
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
