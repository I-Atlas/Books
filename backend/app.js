const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

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

async function start() {
  try {
    server.listen(port, (err) => {
      if (err) {
        console.log(`Something went wrong: ${error.message}`);
        return;
      }
      console.log(`App has been started on port: ${port}.`);
    });
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
    process.exit(1);
  }
}

start();
