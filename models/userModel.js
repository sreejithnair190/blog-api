const { DataTypes } = require("sequelize");
const sequelize = require("./../db");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name is required.",
        },
        len: {
          args: [2, 50],
          msg: "First name should be between 2 and 50 characters.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name is required.",
        },
        len: {
          args: [2, 50],
          msg: "Last name should be between 2 and 50 characters.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: "Email should be unique"
      },
      validate: {
        notNull: {
          msg: "Email is required.",
        },
        isEmail: {
          msg: "Invalid email format.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required.",
        },
        len: {
          args: [6, 50],
          msg: "Password should be between 6 and 50 characters.",
        },
      },
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
