// usuariosController.js
const Usuario = require("../model/Usuario");
const ROLES = require("../constants/roles");
const bcrypt = require("bcrypt");

const usuariosController = {
  // Método para registrar un nuevo usuario desde la pagina
  registrarUsuario: async (req, res) => {
    const { nombre_usuario, email, contrasena, rol } = req.body;

    try {
      // Verificar si el rol es válido
      if (![ROLES.ADMIN, ROLES.RECOLECTOR].includes(rol)) {
        return res.status(400).json({ mensaje: "Rol no válido" });
      }

      // Crear un nuevo usuario
      const usuario = await Usuario.create({
        nombre_usuario,
        email,
        contrasena,
        rol,
      });

      // Si el usuario se crea con éxito, devolver un mensaje de éxito con estado 201
      res.status(201).json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
      console.error(error);

      // Manejar el error de clave duplicada
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          mensaje: "El Correo ya existe. Por favor, elige otro Correo.",
        });
      } else {
        // Otros errores
        res.status(500).json({ mensaje: "Error al registrar el usuario" });
      }
    }
  },

  obtenerUsuarios: async (req, res) => {
    try {
      // Obtener todos los usuarios de la base de datos
      const usuarios = await Usuario.findAll();

      // Enviar los datos de los usuarios al cliente
      res.json(usuarios);
    } catch (error) {
      console.error("Error al obtener los datos de los usuarios:", error);
      res.status(500).json({
        mensaje:
          "Se ha producido un error al intentar obtener los datos de los usuarios. Por favor, inténtalo de nuevo más tarde",
      });
    }
  },

  eliminarUsuario: async (req, res) => {
    const { id } = req.params;

    try {
      // Eliminar el usuario de la base de datos
      const resultado = await Usuario.destroy({ where: { id } });

      // Si el usuario se elimina con éxito, devolver un mensaje de éxito
      res.json({ mensaje: "Usuario eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);

      // Otros errores
      res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    }
  },

  async obtenerUsuarioPorId(req, res) {
    const id = req.params.id;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
  },

  actualizarUsuario: async (req, res) => {
    const id = req.params.id;
    const { nombre_usuario, email, rol, contrasena } = req.body;

    try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      usuario.nombre_usuario = nombre_usuario;
      usuario.email = email;
      usuario.rol = rol;

      // Cifrar la nueva contraseña antes de guardarla
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
      usuario.contrasena = hashedPassword;

      await usuario.save();

      res.json({ mensaje: "Usuario actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }
  },
};

module.exports = usuariosController;
