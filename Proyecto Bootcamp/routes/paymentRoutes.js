const express = require("express");
const router = express.Router();

router.get("/agregar-caficultor", (req, res) => {
  res.render("pagos/agregarCaficultor");
});

router.get("/registrar-pago", (req, res) => {
  res.render("pagos/registrarPago");
});

router.get("/pagos-caficultor", (req, res) => {
  res.render("pagos/pagosCaficultor");
});

module.exports = router;
