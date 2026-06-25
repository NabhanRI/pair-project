const { User, Profile } = require('../models')
const bcrypt = require('bcrypt');

class AuthController {
   // ? (GET) Login
   static async login(req, res) {
      try {
         res.render("login")
      } catch (error) {
         res.send(error)
      }
   }

   // ? (POST) Login
   static async handleLogin(req, res) {
      try {
         const { email, password } = req.body;

         const user = await User.findOne({ where: { email } });

         // Cek kecocokan user DAN password sekaligus
         if (!user || !(await bcrypt.compare(password, user.password))) {
            const errorMsg = "Email atau password salah";
            return res.redirect(`/?error=${errorMsg}`);
         }

         req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
         };

         res.redirect('/home');
      } catch (error) {
         res.send(error);
      }
   }
}
module.exports = { AuthController }