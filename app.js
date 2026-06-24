const express = require('express');
const { AuthController } = require('./controllers/authController');
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get('/', AuthController.login)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})