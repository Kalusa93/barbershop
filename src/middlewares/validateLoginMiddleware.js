const { check } = require("express-validator")

const validateLogin = [
    check('email')
        .isEmail().withMessage('Debe ingresar un correo válido.'),
    check('password')
        .notEmpty().withMessage('Debe ingresar una contraseña'),
];

module.exports = validateLogin;