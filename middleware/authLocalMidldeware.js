const authLocalMidldeware = {
  isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect('/login');
  },
};

module.exports = authLocalMidldeware;
