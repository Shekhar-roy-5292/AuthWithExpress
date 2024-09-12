
const express = require("express");
const app = express();
const authRouter = require("./router/authRoute.js");
const databaseConnect = require("./config/databaseConfig.js");
databaseConnect();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/", (req, res) => {
  res.status(200).json({ data: "Hello World!" });
});

module.exports = app;
