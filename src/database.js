const mongoose = require("mongoose");
const password = "zw2kqBwL8qNMPKbS";
const URL = `mongodb+srv://pinedathedev:${password}@cluster0.gssxwyu.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(URL, { UseNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

module.exports = mongoose;
