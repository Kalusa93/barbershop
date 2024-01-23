const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');

const validateRegister = [
        body('name')
                .notEmpty().withMessage('Debes ingresar tu nombre'),
        body('surname')
                .notEmpty().withMessage('Debes ingresar tu apellido'),
        body('email')
                .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
                .isEmail().withMessage('Debes escribir un formato de correo válido').bail()
                .custom((value, { req }) => {
                        let filename = path.join(__dirname, "../data/usersDataBase.json")
                        let users = JSON.parse(fs.readFileSync(filename, "utf-8"));

                        if (users.find(u => u.email === req.body.email)) {
                                throw new Error("El correo ya se encuentra registrado");
                        }

                        return true;
                }),
        body('password')
                .notEmpty().withMessage('Debes ingresar una contraseña').bail()
                .isStrongPassword().withMessage('La contraseña debe tener un mínimo de 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'), 
        body('confirmpassword')
                .custom((value, { req }) => {
                        let { confirmpassword, password } = req.body;

                        if (confirmpassword !== password) {
                                throw new Error("Las contraseñas no coinciden")
                        }

                        return true;
                })
];

module.exports = validateRegister;