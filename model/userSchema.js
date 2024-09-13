const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      select: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  // this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return JWT.sign({ id: this.id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h",
    });
  },
};
const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;
