const express = require("express");
const {
  signUp,
  signIn,
  getUser,
  logOut,
} = require("../controller/authController.js");
const jwtAuth = require("../middleware/jwtAuth.js");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/user", jwtAuth, getUser);
authRouter.get("/logout", jwtAuth, logOut);
module.exports = authRouter;
