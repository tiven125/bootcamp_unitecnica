const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController"); // Asegúrate de que esta ruta apunta a tu archivo de controlador de usuarios
const authController = require("../controller/loginController"); // Asegúrate de que esta ruta apunta a tu archivo de controlador de autenticación

// Registrar Usuario
router.post("/usuarios", usuariosController.registrarUsuario);
// Iniciar Sesión
router.post("/iniciar-sesion", authController.iniciarSesion);

// Ruta para administradores
router.get("/admin/prueba", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/auth/prueba.html`);
});

// Ruta para recolectores
router.get("/cafetero", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los recolectores
  res.render(`../views/auth/prueba.html`);
});

router.get("", (req, res) => {
  res.render(`../views/auth/login.html`);
});

router.get("/prueba", (req, res) => {
  res.render(`../views/auth/prueba.html`);
});

module.exports = router;
