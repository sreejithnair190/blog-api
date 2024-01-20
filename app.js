// Installed Modules
const express = require("express");
const dotenv = require("dotenv");

// Defined Modules
const db = require("./db");
const AppError = require("./utils/appError");
const errorHandler = require("./handlers/errorHandler");

// Routers
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
// const userRouter = require('./routes/userRoutes');


dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/users/", userRouter);
app.use("/api/blogs/", blogRouter);
// app.use("/api/users/", userRouter);


// Handling unknown routes
app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next(new AppError(`${req.originalUrl} not found`, 404));
});

// Error handler
app.use(errorHandler);

// Starting server
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`App started on port ${port}`));
