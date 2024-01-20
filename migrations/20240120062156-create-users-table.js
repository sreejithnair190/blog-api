module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Email should be unique",
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
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
