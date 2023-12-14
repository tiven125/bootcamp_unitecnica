const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const sequelize = require("./config/db");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

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
const testimonioRouter = require("./routes/testimoniosRoutes");
// Utilizar rutas

app.use("/", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/", principalRouter);
app.use("/", testimonioRouter);

// Sincronizar los modelos con la base de datos
sequelize
  .sync({ force: false }) // Usar { force: true } solo si quieres borrar y recrear las tablas
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });

// configuracion de correo

app.post("/enviar-correo", async (req, res) => {
  const { nombre, correo, ruta } = req.body;

  // Configuración del transporter para nodemailer
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: "tiven0125@gmail.com",
        pass: "lvva xlru rurc gfgd",
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  // Configuración del correo
  const mailOptions = {
    from: "tiven0125@gmail.com",
    to: correo,
    subject: `Detalles de la ruta ${ruta}`,
    html: `
    <p>Hola ${nombre},</p>
    <p>Estamos encantados de saber que estás interesado/a en la ruta ${ruta}.</p>
    <p>¿Necesitas más información o tienes alguna pregunta específica sobre la ruta?</p>
    `,
  };

  try {
    // Envía el correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({ mensaje: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo" });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
