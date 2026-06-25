const { formatRupiah } = require('../helpers/formatRupiah');
const { Course, User } = require('../models');
const { Op } = require('sequelize');

class HomeController {
   // ? (GET) Halaman Utama (Home)
   static async home(req, res) {
      try {
         const { search } = req.query;
         const user = req.session.user;
         if (!user) {
            return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
         }

         let queryOptions = {};

         if (search) {
            queryOptions.where = {
               title: {
                  [Op.iLike]: `%${search}%`
               }
            };
         }

         const courses = await Course.findAll(queryOptions);

         res.render("home", { courses, user, formatRupiah });
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }

   // ? (GET) Halaman Detail Course
   static async courseDetail(req, res) {
      try {
         // 1. Tangkap dulu 'id' dari URL (/home/courses/:id)
         const { id } = req.params;
         const user = req.session.user;
         const course = await Course.getCourseDetail(id, User);

         if (!course) {
            return res.render('errorPage', { message: 'Materi JSkuy tidak ditemukan.' });
         }

         res.render('detailCourse', { course, user });
      } catch (error) {
         res.send(error)
      }
   }
}

module.exports = { HomeController };