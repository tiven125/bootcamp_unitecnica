const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const sequelize = require("./config/db");

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

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usuariosRoutes");
const principalRouter = require("./routes/principalRouter");

// Utilizar rutas

app.use("/", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/", principalRouter);

// Sincronizar los modelos con la base de datos
sequelize
  .sync({ force: false }) // Usar { force: true } solo si quieres borrar y recrear las tablas
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
