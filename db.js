const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
