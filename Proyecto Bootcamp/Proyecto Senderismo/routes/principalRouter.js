const express = require("express");
const router = express.Router();

const rutaController = require("../controller/rutasControllador");
const authController = require("../controller/loginController");
// const {
//   estaAutenticado,
//   esAdministrador,
//   esRecolector,
// } = require("../middlewares/autenticacion");

// CRUD

router.get("/rutas", rutaController.obtenerRutas);
router.get("/rutas/:id", rutaController.obtenerRutaPorId);
router.post("/rutas", rutaController.crearRuta);
router.put("/rutas/:id", rutaController.actualizarRuta);
router.delete("/rutas/:id", rutaController.eliminarRuta);

router.get("/gestion-rutas", (req, res) => {
  res.render(`../views/usuarios/gestionRutas.html`);
});

router.get("/index", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/principal/index.html`);
});

router.get("/about", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/principal/about.html`);
});

router.get("/contact", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/principal/contact.html`);
});

router.get("/package", (req, res) => {
  // Aquí deberías renderizar la vista que quieres mostrar para los administradores
  res.render(`../views/principal/package.html`);
});

module.exports = router;
