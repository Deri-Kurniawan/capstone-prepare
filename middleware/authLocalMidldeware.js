const { body } = require("express-validator");

const authLocalMidldeware = {
  isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect('/login');
  },
  registerProcessMiddleware: (body('fullName').isString(), body('email').isEmail(), body('password').isStrongPassword()),
};

module.exports = authLocalMidldeware;
