const { Router } = require("express");
const router = Router();
const cors = require("cors");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../database/schema/user/user_up");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  router.use(cors());
  next();
});

router.post("/depositar", async (req, res) => {
  console.log("req.body: ", req.body);
  const { account, amount } = req.body;
  const user = await User.find({
    _id: id,
  });
  let amountNew = amount + JSON.parse(user[0].account_money);
  console.log('amountNew',amountNew);
  try {
    User.updateOne(
        { _id: account }, // búsqueda
        { account_money: amountNew }
      )
      .catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Transaction fail!",
          });
      })
      res.status(200).send({
        message: "Transaction saved successfully!",
      });
  } catch (error) {
    res.status(500).send({
        message: "Transaction fail!",
      });
  }
});
router.post("/retirar", async (req, res) => {
    console.log("req.body: ", req.body);
    const { account, amount } = req.body;
    const user = await User.find({
      _id: id,
    });
    let amountNew = JSON.parse(user[0].account_money) - amount;
    console.log('amountNew',amountNew);
    try {
      User.updateOne(
          { _id: account }, // búsqueda
          { account_money: amountNew }
        )
        .catch(err => {
          console.log(err)
          res.status(500).send({
              message: "Transaction fail!",
            });
        })
        res.status(200).send({
          message: "Transaction saved successfully!",
        });
    } catch (error) {
      res.status(500).send({
          message: "Transaction fail!",
        });
    }
  });

module.exports = router;
