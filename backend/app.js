const express = require('express')
const http = require('http');
const db = require('./models')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const userCtrl = require('./controllers/user')
const server = http.createServer(app)



// app.use(express.static('public'))
// app.use('/auth', require('./routes/auth'))
// app.use('/recovery', require('./routes/recovery'))
// app.use('/books', require('./routes/books'))

app.get('/user', userCtrl.getAll)

db.User.create({
    username: "Tom",
    email: "123@gmail.com",
    password: "123",
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err))

console.log('DB', db.user)

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