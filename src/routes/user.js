const express = require("express");
const User = require("../../database/schema/user/user_up");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../../controllers/UserController");
// Añadimos dotenv para utilizar las variables de entorno
const dotenv = require("dotenv");
// Cargamos nuestro controlador

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/",async (req, res) =>{
console.log("hola");
})
router.get("/get_data", async (req, res) => {
  User.findById(req.body.id, function (err, user) {
    if (err) {
        res.send({status: 500,data: [],message: 'fail'});
    } else {
      res.send({status: 200,data: user,message: 'success'});
    }
  });
});

module.exports = router;