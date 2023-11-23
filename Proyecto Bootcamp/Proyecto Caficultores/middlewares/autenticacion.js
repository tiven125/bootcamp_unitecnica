function estaAutenticado(req, res, next) {
  // Si el usuario está autenticado, continuar con el siguiente middleware
  if (req.session.usuario) {
    return next();
  }
  // Si no, redirigir al usuario a la página de inicio de sesión
  res.redirect("/");
}

function esAdministrador(req, res, next) {
  // Si el usuario está autenticado y es un administrador, continuar con el siguiente middleware
  if (req.session.usuario && req.session.usuario.rol === "administrador") {
    return next();
  }
  // Si no, enviar un error 403 (Prohibido)
  res
    .status(403)
    .json({ mensaje: "No tienes permisos para acceder a esta ruta" });
}

function esRecolector(req, res, next) {
  // Si el usuario está autenticado y es un recolector, continuar con el siguiente middleware
  if (req.session.usuario && req.session.usuario.rol === "recolector") {
    return next();
  }
  // Si no, enviar un error 403 (Prohibido)
  res
    .status(403)
    .json({ mensaje: "No tienes permisos para acceder a esta ruta" });
}

module.exports = {
  estaAutenticado,
  esAdministrador,
  esRecolector,
};
