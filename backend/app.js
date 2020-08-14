const express = require('express')
require('dotenv').config()

const userCtrl = require('./controllers/users');

const app = express()
const port = process.env.PORT || 5000

app.get('/', (request, response) => response.send('Book Store Application'))
app.get('/users', userCtrl.getAll);
app.listen(port, () => console.log(`App has been started on port: ${port}.`))