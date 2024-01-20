const { DataTypes } = require("sequelize");
const sequelize = require("./../db");

const Comment = sequelize.define(
  "Comment",
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Comment text is required.",
        },
      },
    },
  },
  {
    tableName: "comments",
  }
);


module.exports = Comment;