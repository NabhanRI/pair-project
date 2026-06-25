const { AuthController } = require('./controllers/authController');
const { AdminController } = require('./controllers/adminController');
const { HomeController } = require('./controllers/homeController');
const express = require('express');
const app = express()
const port = 3000


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

// express session
const session = require("express-session");

app.use(session({
  secret: 'rahasia-negara-jskuy', // Bebas diisi string apa saja untuk enkripsi session
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

// ! AUTHENTICATION & PROFILE
// ? LOGIN
app.get('/', AuthController.login)
app.post('/login', AuthController.postLogin);
// ? Register
app.get('/register', AuthController.register)
app.post('/register', AuthController.postRegister)
// ? Logout
app.get('/logout', AuthController.logout);
// ? Profile
app.get('/profile', AuthController.showProfile)

// ! LANDING PAGE
// ? (GET) Home
app.get('/home', HomeController.home)

// ? (GET & POST) ADD
app.get('/home/add', AdminController.getAdd)
app.post('/home/add', AdminController.postAdd)

// ? (GET) Detail Course
app.get('/home/courses/:id', HomeController.courseDetail)

// ? (GET) EDIT Course
app.get('/home/courses/:id/edit', (req, res) => {
  res.send('Hello World!')
})

// ? (POST) EDIT Course
app.post('/home/courses/:id/edit', (req, res) => {
  res.send('Hello World!')
})

// ? (GET) DELETE Course
app.get('/home/courses/:id/delete', (req, res) => {
  res.send('Hello World!')
})

// ! USER (STUDENT)
// ? (GET) Transaction
app.get('/home/courses/:id/transaction', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})