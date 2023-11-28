const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController");
const authController = require("../controller/loginController");
const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

// Registrar Usuario
router.post("/usuarios", usuariosController.registrarUsuario);

// Iniciar Sesión
router.post("/iniciar-sesion", authController.iniciarSesion);

// Ruta protegida para administradores
router.get("/admin", estaAutenticado, esAdministrador, (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/auth/home.html`);
});

router.get("", (req, res) => {
  res.render(`../views/auth/login.html`);
});

// routes/authRoutes.js
router.get("/cerrar-sesion", estaAutenticado, esAdministrador, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar la sesión:", err);
    }
    res.redirect("/"); // Redirigir al usuario a la página de inicio después de cerrar la sesión
  });
});

module.exports = router;
