const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController");
const authController = require("../controller/loginController");
const {
  estaAutenticado,
  esAdministrador,
  esRecolector,
} = require("../middlewares/autenticacion");

// Registrar Usuario
router.post("/usuarios", usuariosController.registrarUsuario);

// Iniciar Sesión
router.post("/iniciar-sesion", authController.iniciarSesion);

// Ruta protegida para administradores
router.get("/admin", estaAutenticado, esAdministrador, (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/auth/prueba.html`);
});

// Ruta protegida para recolectores
router.get("/cafetero", estaAutenticado, esRecolector, (req, res) => {
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
