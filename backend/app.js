const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.get('/', (request, response) => response.send('Book Store Application'))
app.listen(port, () => console.log(`App has been started on port: ${port}.`))