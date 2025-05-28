  // A/model/user.js

  class UserModel {
    constructor() {}

    registerUser(nombreCompleto, correo, contrasena, conexion) {
      return new Promise((resolve, reject) => {
        //Se hashea la contraseña
        const contrasenaHasheada = require('crypto').createHash('md5').update(contrasena).digest('hex');
        const consulta = `INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES (?, ?, ?, ?)`;
        const valores = [nombreCompleto, correo, nombreCompleto.toLowerCase().replace(/\s+/g, '_'), contrasenaHasheada];

        conexion.query(consulta, valores, (err, resultado) => {
          if (err) {
            console.error('Error al registrar al usuario:', err);
            reject('Error al registrar al usuario');
          } else {
            console.log('¡Usuario registrado con éxito!');
            resolve('¡Usuario registrado con éxito!');
          }
        });
      });
    }

    loginUser(correo, contrasena, conexion) {
      return new Promise((resolve, reject) => {
        const contrasenaHasheada = require('crypto').createHash('md5').update(contrasena).digest('hex');

        //Se verifica si esta el usuario en la base de datos
        const consulta = `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`;
        const valores = [correo, contrasenaHasheada];

        conexion.query(consulta, valores, (err, resultados) => {
          if (err) {
            console.error('Error al ejecutar la consulta:', err);
            reject('Error al intentar iniciar sesión');
          } else {
            if (resultados.length > 0) {
              console.log('¡Usuario autenticado con éxito!');
              resolve('¡Usuario autenticado con éxito!');
            } else {
              console.log('Credenciales incorrectas');
              reject('Error: Credenciales incorrectas. Verifica tu correo y contraseña.');
            }
          }
        });
      });
    }
  }

  module.exports = UserModel;