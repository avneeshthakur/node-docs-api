const User = require("../models/userModel");
const {
  generateHashPassword,
  generateAuthToken,
  checkHashPassword
} = require("../services/token-service");

//sign-up
const signupController = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let hashPass = await generateHashPassword(password);
  try {
    let newUser = new User({
      userName,
      email,
      password: hashPass
    });
    let user = await User.findOne({ email });
    if (!user) {
      newUser = await newUser.save();
      return res
        .status(201)
        .json({ status: true, message: "user created Successfully." });
    } else {
      return res
        .status(422)
        .json({ status: false, message: "Email is already used" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// login
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    let isMatch = await checkHashPassword(password, user);
    if (isMatch) {
      let token = await generateAuthToken(user);
      delete user.password;
      return res
        .status(200)
        .json({
          status: true,
          message: "Authentication Successful",
          user: { id: user._id, token }
        });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Authentication failed" });
    }
  } else {
    return res.status(404).json({ status: true, message: "User Not Found" });
  }
};

module.exports = {
  signupController,
  loginController
};
