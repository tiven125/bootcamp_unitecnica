const express = require("express");
const router = express.Router();

router.get("/perfil", (req, res) => {
  res.render("usuario/perfilUsuario");
});

router.get("/gestion-usuarios", (req, res) => {
  res.render("usuario/gestionUsuarios");
});

module.exports = router;
