const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController"); // Asegúrate de que esta ruta apunta a tu archivo de controlador de usuarios

// Registrar Usuario
router.post("/usuarios", usuariosController.registrarUsuario);
// Iniciar Session

router.get("", (req, res) => {
  res.render(`../views/auth/login.html`);
});

router.get("/prueba", (req, res) => {
  res.render(`../views/auth/prueba.html`);
});
// router.get("/ejemplo", (req, res) => {
//   res.send("Esta es una ruta de ejemplo");
// });
module.exports = router;
