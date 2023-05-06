const User = require("../database/schema/user/user_up");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Añadimos dotenv para utilizar las variables de entorno
const dotenv = require("dotenv");
module.exports = async ({ body }, res) => {
  console.log("body", body);
  // Pedimos solamente el password y el nombre de usuario
  const { password, email } = body;
  if (password !== "" && email !== "") {
    try {
      // Realizamos una búsqueda para validar si el usuario existe
      const userRecord = await User.findOne({ email: email });

      // Si el usuario existe, procedemos
      if (userRecord) {
        // Comparamos el password que nos está dando el usuario
        // en el inicio de sesión, contra el password que
        // tenemos guardado en la base de datos con Bcrypt
        if (password == userRecord.password) {
          // En dado caso de ser correcto, entonces firmamos
          // la petición con jsonwebtoken
          const token = {
              email: userRecord.email,
              id: userRecord._id,
              username: userRecord.name,
            }
          // Regresamos el token para verificar que el usuario
          // ha iniciado sesión correctamente
          return res.status(200).json({ token });
        } else {
          // En caso de que el password no sea correcto,
          // regresamos un error con un mensaje
          return res.status(400).json({
            status: 400,
            message: "Password incorrecto",
          });
        }
      } else {
        return res.status(401).json({
          status: 401,
          message:
            "¡Tu email o contraseña son incorrectos, por favor, veríficalo!",
        });
      }
    } catch (error) {
      // Este error se genera si se procesa mal la solicitud
      // en la base de datos
      console.log(error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "¡Por favor, ingresa tu email y contraseña!",
    });
  }
};
