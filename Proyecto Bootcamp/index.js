const express = require("express");
const path = require("path");
const app = express();
const sequelize = require("./config/db");
const session = require("express-session");

// Variables de Desarrollo
require("dotenv").config({ path: "variables.env" });

app.use(express.json());

// <!-- Include the SweetAlert2 library from node_modules -->
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Configurar el motor de vistas
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

// Configurar la carpeta pública para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración de express-session para iniciar sesión

app.use(
  session({
    secret: "mi-secreto",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// Middleware de autenticación
function estaAutenticado(req, res, next) {
  console.log(req.session);
  if (req.session.usuario) {
    return next();
  }
  res.redirect("/");
}

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const otherRoutes = require("./routes/otherRoutes");

// Utilizar rutas
app.use("/", authRoutes);
app.use("/usuario", estaAutenticado, userRoutes);
app.use("/pagos", estaAutenticado, paymentRoutes);
app.use("/otros", estaAutenticado, otherRoutes);

// Conectar a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
