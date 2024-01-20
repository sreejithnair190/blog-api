exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.successMessage = (
  res,
  message,
  statusCode = 200,
  data = undefined,
  token = undefined
) => {
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data,
  });
};
