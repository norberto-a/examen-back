const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Añadimos dotenv para utilizar las variables de entorno
const dotenv = require('dotenv');
const moment = require('moment');
// Cargamos nuestro modelo
const User = require('../database/schema/user/user_up');
// Cargamos nuestras variables de entorno
dotenv.config();
module.exports = async (req, res) => {
  const { password, passwordConfirmation, email, name, lastname} = req.body;
  if (password != "" && passwordConfirmation != "" && email != "" && name) {
    if (password === passwordConfirmation) {
      console.log(req.body);
      // Creamos una instancia para guardar el usuario
      const newUser = User({
        // Encriptamos el password, y ese password lo pasamos a la base de datos
        name,
        lastname,
        password: Bcrypt.hashSync(password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return err;
          }
        }),
        email,
        account_money: 0,
        role: 2,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        status: 1,
      });
      try {
        // Guardamos el usuario
        const savedUser = await newUser.save();
        // Si el usuario se guardó con éxito, entonces
        // regresamos el email, el id y el username, para firmarlo
        // con jsonwebtoken
        const token = { id: savedUser.id, name }
        // Cuando el usuario se firma, regresamos solamente el token
        // ya que este contiene la información necesaria para en un
        // futuro obtener todos los datos del usuario
        return res.status(200).json({ token });
      } catch (error) {
        console.log(error);
        // En caso que no se haya realizado la petición con éxito al guardar
        // regresamos un error 400 con el error en el "message" de la respuesta
        return res.status(400).json({
          status: 400,
          message: error,
        });
      }
    } else {
      // En caso de que las contraseñas no sean iguales
      // retornamos un error 400 en la petición
      return res.status(400).json({
        status: 400,
        message: '¡Las contraseñas no coinciden, intenta nuevamente!',
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: '¡falta informacion!',
    });
  }
};