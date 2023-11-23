const bcrypt = require("bcrypt");
const Usuario = require("../model/Usuario"); // Asegúrate de que esta ruta apunta a tu archivo de modelo de usuario

const authController = {
  iniciarSesion: async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;

    try {
      // Buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({
        where: { nombre_usuario: nombreUsuario },
      });

      if (!usuario) {
        console.log("Usuario no encontrado con nombre:", nombreUsuario);
        // Si el usuario no existe, enviar un mensaje de error
        res.status(400).json({
          mensaje: "El nombre de usuario o la contraseña son incorrectos",
        });
      } else {
        // Verificar la contraseña
        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (esValida) {
          // console.log("Inicio de sesión exitoso para:", nombreUsuario);
          console.log("Inicio de sesión exitoso para:", usuario.rol);

          // Configurar el objeto de sesión
          req.session.usuario = {
            nombreUsuario: usuario.nombre_usuario,
            rol: usuario.rol,
          };

          // Si la contraseña es correcta, enviar la información del usuario en la respuesta
          res.json({
            mensaje: "Inicio de sesión exitoso",
            data: {
              nombreUsuario: usuario.nombre_usuario,
              rol: usuario.rol,
            },
          });
        } else {
          console.log("Contraseña incorrecta para:", nombreUsuario);
          // Si la contraseña es incorrecta, enviar un mensaje de error
          res.status(400).json({
            mensaje: "El nombre de usuario o la contraseña son incorrectos",
          });
        }
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      res.status(500).json({
        mensaje:
          "Se ha producido un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde",
      });
    }
  },
};

module.exports = authController;
