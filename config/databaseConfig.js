
const mongoose = require("mongoose");
const MONGOOSE_URL =
  process.env.MONGOOSE_URL;
const databaseConnect = () => {
  mongoose
    .connect(MONGOOSE_URL)
    .then((connection) => {
      console.log("Database Connected to " + connection.connection.host);
    })
    .catch((error) => {
      console.log("Error connecting to database", error);
    });
};

module.exports = databaseConnect;
