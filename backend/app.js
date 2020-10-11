const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/images", express.static("uploads"));
app.use("/", require("./routes/auth"));
app.use("/books", require("./routes/book"));
app.use("/users", require("./routes/user"));
app.use("/orders", require("./routes/order"));
app.use("/authors", require("./routes/author"));
app.use("/categories", require("./routes/category"));

module.exports = {
  app,
};
