const express = require("express");
const router = express.Router();

const rutaController = require("../controller/rutasControllador");
const authController = require("../controller/loginController");
const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

// CRUD

router.get(
  "/rutas",

  rutaController.obtenerRutas
);
router.get(
  "/rutas/:id",
  estaAutenticado,
  esAdministrador,
  rutaController.obtenerRutaPorId
);
router.post(
  "/rutas",
  estaAutenticado,
  esAdministrador,
  rutaController.crearRuta
);
router.put(
  "/rutas/:id",
  estaAutenticado,
  esAdministrador,
  rutaController.actualizarRuta
);
router.delete(
  "/rutas/:id",
  estaAutenticado,
  esAdministrador,
  rutaController.eliminarRuta
);

router.get("/gestion-rutas", estaAutenticado, esAdministrador, (req, res) => {
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
