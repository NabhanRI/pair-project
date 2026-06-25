const { AuthController } = require('./controllers/authController');
const { AdminController } = require('./controllers/adminController');
const { HomeController } = require('./controllers/homeController');
const express = require('express');
const app = express()
const port = 3000


app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

// express session
const session = require("express-session");

app.use(session({
  secret: 'rahasia-negara-jskuy', // Bebas diisi string apa saja untuk enkripsi session
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// ? LOGIN & REGISTER (GET & POST)
app.get('/', AuthController.login)
app.post('/login', AuthController.handleLogin);


// ? (GET) Home

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})