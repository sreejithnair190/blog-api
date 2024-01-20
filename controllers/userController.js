const User = require("./../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const userDetails = { firstName, lastName, email, password };
    const newUser = await User.create(userDetails);
    console.log(newUser);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
    });
  }
};
