const isLoggedIn = (req, res, next) => {
   if (!req.session.user) {
      return res.redirect('/?error=Ups, kamu harus login terlebih dahulu!');
   }
   next();
};

const isAdmin = (req, res, next) => {
   if (req.session.user && req.session.user.role === 'admin') {
      next();
   } else {
      return res.redirect('/home?error=Akses ditolak! Fitur ini khusus Admin.');
   }
};

module.exports = { isLoggedIn, isAdmin };