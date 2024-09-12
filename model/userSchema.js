const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username must be required"],
    },
    email: {
      type: String,
      required: [true, "email must be required"],
      unique: [true, "email already exists"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    forgetPasswordToken: {
      type: String,
    },
    forgetPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      { id: this.id, email: this.email },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
};
const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;
