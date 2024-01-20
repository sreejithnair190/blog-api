// Installed Modules
const express = require("express");
const dotenv = require("dotenv");

// Defined Modules
const sequelize = require("./db");
const AppError = require("./utils/appError");
const errorHandler = require("./handlers/errorHandler");

// Models
const User = require("./models/userModel");
const Blog = require("./models/blogModel");
const Comment = require("./models/commentModel");
const associations = require("./models/associations");


dotenv.config();

const app = express();

app.use(express.json());

// Handling unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404));
});

// Error handler
app.use(errorHandler);


(async () => {
  try {
    // Synchronize models with the database
    await User.sync({ alter: true });
    await Blog.sync({ alter: true });
    await Comment.sync({ alter: true });

    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Database synchronization failed:", error);
  }

  // Starting server
  const port = process.env.APP_PORT || 3000;
  app.listen(port, () => console.log(`App started on port ${port}`));
})();
