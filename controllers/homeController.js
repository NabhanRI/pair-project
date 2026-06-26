const { formatRupiah } = require('../helpers/formatRupiah');
const { Course, User } = require('../models');
const { Op } = require('sequelize');

class HomeController {
   // ? (GET) Halaman Utama (Home)
   static async home(req, res) {
      try {
         const { search, error, success } = req.query;
         const user = req.session.user;

         let queryOptions = {};

         if (search) {
            queryOptions.where = {
               title: {
                  [Op.iLike]: `%${search}%`
               }
            };
         }

         const courses = await Course.findAll(queryOptions);

         res.render("home", { courses, user, formatRupiah, error, success});
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }

   // ? (GET) Halaman Detail Course
   static async courseDetail(req, res) {
      try {
         const { error, success } = req.query;
         const { id } = req.params;
         const user = req.session.user;
         
         const course = await Course.getCourseDetail(id, User);

         if (!course) {
            return res.render('errorPage', { message: 'Materi JSkuy tidak ditemukan.' });
         }

         res.render('detailCourse', { course, user, error, success });
      } catch (error) {
         res.send(error)
      }
   }
}

module.exports = { HomeController };