const { body } = require("express-validator");

const validationMiddleware = {
  registerValidationMiddleWare: (body('fullName', 'Nama minimal 1 karakter').isString().isLength(1), body('email', 'Email tidak valid').isEmail(), body('password', 'Kata Sandi minimal 4 karakter').isLength(4)),
}

module.exports = validationMiddleware;