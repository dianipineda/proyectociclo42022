const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/invitados";
mongoose
  .connect(URL, { UseNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

module.exports = mongoose;
