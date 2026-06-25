const { Course } = require('../models')


class AdminController {

   // ? (GET) Halaman Add Course
   static async getAdd(req, res) {
      try {
         const user = req.session.user;

         if (!user) {
            return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
         }

         res.render("addCourse", { user, error: req.query.error })
      } catch (error) {
         res.send(error)
      }
   }

   // ? (POST) Halaman Add Course
   static async postAdd(req, res) {
      try {
         const { title, description, price, imageUrl } = req.body;
         const UserId = req.session.user.id;

         await Course.create({
            title,
            description,
            price,
            imageUrl,
            UserId
         });

         res.redirect('/home');
      } catch (error) {
         if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.redirect(`/home/add?error=${errors.join('||')}`);
         }
         // console.log(error);
         res.send(error)
      }
   }

   //? (GET) edit course
   static async getEdit(req, res) {
      try {
         const user = req.session.user;

         if (!user) {
            return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
         }

         const { id } = req.params;
         const course = await Course.findByPk(id);

         if (!course) {
            return res.redirect('/home?error=Course tidak ditemukan');
         }

         res.render('editCourse', { user, course, error: req.query.error });
      } catch (error) {
         res.send(error)
      }
   }

   //? (POST) edit course
   static async postEdit(req, res) {
      try {
         const user = req.session.user;

         if (!user) {
            return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
         }

         const { id } = req.params;
         const { title, description, price, imageUrl } = req.body;

         const course = await Course.findByPk(id);

         if (!course) {
            return res.redirect('/home?error=Course tidak ditemukan');
         }

         await course.update({
            title,
            description,
            price,
            imageUrl
         });
         res.redirect(`/home/courses/${id}`);
      } catch (error) {
         if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.redirect(`/home/add?error=${errors.join('||')}`);
         }
         // console.log(error);
         res.send(error);
      }
   }

   //? (GET) delete course
   static async deleteCourse(req, res) {
      try {
         const { id } = req.params;

         const course = await Course.findByPk(id);

         if (!course) {
            return res.redirect('/home?error=Course tidak ditemukan');
         }

         await course.destroy();

         res.redirect('/home');
      } catch (error) {
         // console.log(error);
         res.send(error);
      }
   }
}

module.exports = { AdminController }