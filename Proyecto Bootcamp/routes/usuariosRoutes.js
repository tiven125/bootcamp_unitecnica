const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController");

const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

// Ruta protegida para administradores
router.get(
  "/gestion-usuarios",
  estaAutenticado,
  esAdministrador,
  (req, res) => {
    // Aquí deberías renderizar la vista que quieres mostrar para los administradores
    res.render(`../views/usuarios/gestionUsuarios.html`);
  }
);

// Ruta para obtener todos los usuarios
router.get(
  "/",
  esAdministrador,
  estaAutenticado,
  usuariosController.obtenerUsuarios
);
router.delete(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.eliminarUsuario
);

// Rutas para obtener y actualizar usuarios
router.get(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.obtenerUsuarioPorId
);
router.put(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.actualizarUsuario
);

module.exports = router;
