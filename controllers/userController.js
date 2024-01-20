const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const { jwt_secret, jwt_expiry } = require("./../utils/constants");
const { catchAsync, successMessage } = require("./../utils/utils");


const signToken = (id) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: jwt_expiry,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  const userDetails = { firstName, lastName, email, password };
  const newUser = await User.create(userDetails);
  newUser.password = undefined;
  const token = signToken(newUser.id);
  successMessage(res, "Signed up successfully", 201, { user: newUser }, token);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));
  console.log(email);
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(user.id);
  successMessage(res, "Signed up successfully", 200, { user }, token);

  createSendToken(user, 200, res, "Login Successful");
});
