const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const {catchAsync} = require("./../utils/utils");
const {jwt_secret} = require("./../utils/constants");
const AppError = require("./../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not Logged in", 403));
    }

    const decoded = await promisify(jwt.verify)(token, jwt_secret);

    const currentUser = await User.findOne({where:{id: decoded.id}});
    if (!currentUser) {
        return next(new AppError("User with this token doesn't exist", 403));
    }

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError("User recently changed password. Please login again", 403)
    //     );
    // }

    req.user = currentUser;
    next();
})
