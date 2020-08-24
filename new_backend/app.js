const express = require('express')
const http = require('http');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)

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