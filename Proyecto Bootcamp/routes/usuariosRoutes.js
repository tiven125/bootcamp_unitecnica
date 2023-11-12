const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController");

const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

//! Ruta Para Usuarios
router.get(
  "/gestion-usuarios",
  estaAutenticado,
  esAdministrador,
  (req, res) => {
    res.render(`../views/usuarios/gestionUsuarios.html`);
  }
);

//? Ruta para obtener todos los usuarios
router.get(
  "/",
  esAdministrador,
  estaAutenticado,
  usuariosController.obtenerUsuarios
);

//? Ruta para eliminar

router.delete(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.eliminarUsuario
);

//? Rutas para obtener iD
router.get(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.obtenerUsuarioPorId
);

//? Rutas para obtener iD y actualizar usuarios

router.put(
  "/:id",
  esAdministrador,
  estaAutenticado,
  usuariosController.actualizarUsuario
);

module.exports = router;
