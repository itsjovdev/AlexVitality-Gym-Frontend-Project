// A/controller/userController.js
const UserModel = require('../model/user');

class UserController {
  constructor(conexion) {
    this.userModel = new UserModel(conexion);
  }

  registerUser(req, res) {
    const { nombreCompleto, correo, contrasena } = req.body;
    this.userModel.registerUser(nombreCompleto, correo, contrasena)
      .then((message) => res.status(200).send(message))
      .catch((error) => res.status(500).send(error));
      
      
  }

  loginUser(req, res) {
    const { correo, contrasena } = req.body;
    console.log('Intento de inicio de sesión con correo:', correo);

    this.userModel.loginUser(correo, contrasena)
      .then(() => {
        console.log('¡Usuario autenticado con éxito!');
        res.status(200).json({ message: '¡Usuario autenticado con éxito!' });
      })
      .catch((error) => {
        console.error('Error al intentar iniciar sesión:', error);

        if (error.message === 'Credenciales incorrectas') {
          res.status(401).json({ error: 'Credenciales incorrectas. Verifica tu correo y contraseña.' });
        } else {
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      });
  }
}

module.exports = UserController;
