const express = require('express')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Book Store Application'))
app.listen(3000, () => console.log(`App has been started on port: ${port}.`))