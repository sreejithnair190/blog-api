const { DataTypes } = require("sequelize");
const sequelize = require("./../db");

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Blog title is required.",
        },
        len: {
          args: [2, 255],
          msg: "Blog title should be between 2 and 255 characters.",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Blog content is required.",
        },
      },
    },
  },
  {
    tableName: "blogs",
  }
);

module.exports = Blog;