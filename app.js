const { AuthController } = require('./controllers/authController');
const { AdminController } = require('./controllers/adminController');
const { HomeController } = require('./controllers/homeController');
const { TransactionController } = require('./controllers/transactionController')
const { isLoggedIn, isAdmin } = require('./middlewares/auth');
const express = require('express');
const app = express()
const port = 3000


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
// buat nampilin qr
app.use(express.static('public'))

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
app.get('/home/courses/:id', isAdmin, HomeController.courseDetail)

// ? (GET) EDIT Course
app.get('/home/courses/:id/edit', isAdmin, AdminController.getEdit)

// ? (POST) EDIT Course
app.post('/home/courses/:id/edit', isAdmin, AdminController.postEdit)

// ? (GET) DELETE Course
app.get('/home/courses/:id/delete', isAdmin, AdminController.deleteCourse)

// ! USER (STUDENT)
// ? (GET) Transaction
app.get('/home/courses/:id/transaction', TransactionController.formTf)
app.post('/home/courses/:id/transaction', TransactionController.createPayment)

app.post('/home/courses/:id/transaction/finish', TransactionController.finishPayment)

//? (GET) Invoice
app.get('/home/courses/:id/invoice', TransactionController.invoice)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})