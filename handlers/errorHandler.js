const AppError = require('../utils/appError');

const handleJWTError = (err) =>
  new AppError("Invalid Token! Please login again", 401);

const handleTokenExpiredError = (err) =>
  new AppError("Session expired. Please login again!");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let error = Object.assign(err);

  if (error.name === "JsonWebTokenError") error = handleJWTError(error);
  if (error.name === "TokenExpiredError") error = handleTokenExpiredError(error);

  res.status(statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
};

module.exports = errorHandler;
