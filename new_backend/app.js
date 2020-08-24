const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/", require("./routes/auth"));
app.use("/books", require("./routes/book"));
app.use("/users", require("./routes/user"));

async function start() {
    try {  
        server.listen(port, () => {
            console.log(`App has been started on port: ${port}.`)
        })
    } catch (error) {
      console.log(`Something went wrong: ${error.message}`)
      process.exit(1)
    }
}
  
start()