const userModel = require("../model/userSchema.js");
const emailValidator = require("email-validator");
const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  //   console.log(name, email, password, confirmPassword);
  if (!email || !name || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
      success: false,
    });
  }
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      message: "Please provide valid email",
      success: false,
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "password and confirm password doesn't match",
      success: false,
    });
  }
  try {
    // await userModel.create(req.body); //alternative
    const userInfo = userModel(req.body);
    const result = await userInfo.save(); // not necessary if you use line 5
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
        user: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Account already registered",
        success: false,
      });
    }
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
      success: false,
    });
  }
  //   const user = await userModel.findOne({ email: email }).select("+password");
  try {
    const user = await userModel.findOne({ email: email }).select("+password");
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const token = user.jwtToken();
    user.password = undefined;
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: false,
    };
    res.cookie("token", token, cookieOption).status(200).json({
      success: true,
      message: "User signed in successfully",
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      success: false,
    });
  }
};

module.exports = { signup, signin };
