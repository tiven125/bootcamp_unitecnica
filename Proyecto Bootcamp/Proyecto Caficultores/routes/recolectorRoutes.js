const express = require("express");
const router = express.Router();
const recolectoresController = require("../controller/recolectoresController");

const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

//! Ruta Para Usuarios
router.get(
  "/gestion-recolector",
  estaAutenticado,
  esAdministrador,
  (req, res) => {
    res.render(`../views/usuarios/gestionRecolector.html`);
  }
);

// Ruta para obtener todos los recolectores
router.get(
  "/",
  // estaAutenticado,
  // esAdministrador,
  recolectoresController.obtenerRecolectores
);

// Ruta para obtener un recolector por ID
router.get(
  "/:id",

  recolectoresController.obtenerRecolectorPorId
);

// Ruta para registrar un nuevo recolector
router.post(
  "/",
  // estaAutenticado,
  // esAdministrador,
  recolectoresController.registrarRecolector
);

// Ruta para actualizar un recolector
router.put(
  "/:id",
  // estaAutenticado,
  // esAdministrador,
  recolectoresController.actualizarRecolector
);

// Ruta para eliminar un recolector
router.delete(
  "/:id",
  // estaAutenticado,
  // esAdministrador,
  recolectoresController.eliminarRecolector
);

module.exports = router;
