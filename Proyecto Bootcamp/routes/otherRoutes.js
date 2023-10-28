const express = require("express");
const router = express.Router();

router.get("/error", (req, res) => {
  res.render("otros/error");
});

router.get("/ayuda", (req, res) => {
  res.render("otros/ayuda");
});

router.get("/inicio", (req, res) => {
  res.render(`../views/auth/prueba.html`);
});

module.exports = router;
