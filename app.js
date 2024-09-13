
const express = require("express");
const app = express();
const authRouter = require("./router/authRoute.js");
const databaseConnect = require("./config/databaseConfig.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
databaseConnect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
  // allowedHeaders: ["Content-Type", "Authorization"],
  // exposedHeaders: ["Authorization"]  // expose Authorization header in the response
}));
app.use("/api/auth", authRouter);
app.use("/", (req, res) => {
  res.status(200).json({ data: "Hello World!" });
});

module.exports = app;
