// usuariosController.js
const Usuario = require("../model/Usuario");
const ROLES = require("../constants/roles");

const usuariosController = {
  // Método para registrar un nuevo usuario
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
};

module.exports = usuariosController;
