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
         res.send(error)
      }
   }
}

module.exports = { AdminController }