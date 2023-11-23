const { Sequelize } = require("sequelize");

// Configurar la conexión a la base de datos
const sequelize = new Sequelize("bd_cafeteros", "postgres", "Tiven125", {
  host: "localhost",
  dialect: "postgres",
});

// Exportar la conexión
module.exports = sequelize;
