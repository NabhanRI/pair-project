const { User, Profile } = require('../models')
const bcrypt = require('bcrypt');

class AuthController {

   // ? (GET) Login
   static async login(req, res) {
      try {
         res.render("login", { error: req.query.error })
      } catch (error) {
         res.send(error)
      }
   }

   // ? (POST) Login
   static async postLogin(req, res) {
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
            username: user.username,
            role: user.role
         };

         res.redirect('/home');
      } catch (error) {
         if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.redirect(`/?error=${errors.join('||')}`);
         }
         res.send(error);
      }
   }

   // ? (GET) Register
   static async register(req, res) {
      try {
         res.render('register', { error: req.query.error }) //ngerender form regist
      } catch (error) {
         res.send(error);
      }
   }

   // ? (POST) Register
   static async postRegister(req, res) {
      try {
         const { username, email, password, fullName } = req.body;

         const newProfile = await Profile.create({
            fullName: fullName,
            bio: 'Saya siap belajar coding dari nol.'
         });

         await User.create({
            username,
            email,
            password,
            role: 'student',
            ProfileId: newProfile.id
         });

         res.redirect('/');
      } catch (error) {
         if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.redirect(`/register?error=${errors.join('||')}`);
         }
         res.send(error);
      }
   }

   // ? (GET) Logout
   static logout(req, res) {
      // Menghancurkan session yang sedang aktif
      try {
         req.session.destroy((err) => {
            if (err) {
               return res.send(err);
            }
            // Jika berhasil hancur, kembalikan ke halaman login
            res.redirect('/');
         });
      } catch (error) {
         res.send(error)
      }
   }

   // ? (GET) Show Profile
   static async showProfile(req, res) {
      try {
         const sessionUser = req.session.user;

         if (!sessionUser) {
            return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
         }

         const userData = await User.findByPk(sessionUser.id, {
            include: Profile
         });

         res.render("profile", { user: userData });
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }
}
module.exports = { AuthController }