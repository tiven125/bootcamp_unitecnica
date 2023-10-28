const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");

const authController = {
  // Método para mostrar la vista de inicio de sesión
  mostrarLogin: (req, res) => {
    res.send("login");
  },

  // Método para manejar el inicio de sesión
  iniciarSesion: async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;

    try {
      // Buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ where: { nombreUsuario } });

      if (!usuario) {
        // Si el usuario no existe, enviar un mensaje de error
        res.status(400).json({
          mensaje: "El nombre de usuario o la contraseña son incorrectos",
        });
      } else {
        // Verificar la contraseña
        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (esValida) {
          // Si la contraseña es correcta, almacenar la información del usuario en la sesión
          req.session.usuario = usuario;
          // Redirigir al usuario a la página de inicio

          // res.render("auth/prueba");
          res.render("otros/inicio");
        } else {
          // Si la contraseña es incorrecta, enviar un mensaje de error
          res.status(400).json({
            mensaje: "El nombre de usuario o la contraseña son incorrectos",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje:
          "Se ha producido un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde",
      });
    }
  },
};

module.exports = authController;
