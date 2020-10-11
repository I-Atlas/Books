const server = require('./app')
const http = require("http");


const server = http.createServer(app);
const port = process.env.PORT || 5000;

const start = async() => {
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

start()