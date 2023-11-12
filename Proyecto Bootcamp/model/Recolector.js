const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Usuario = require("./Usuario");

const Recolector = sequelize.define("Recolector", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Definir la relación muchos a uno con Usuario
Recolector.belongsTo(Usuario, { as: "usuario", foreignKey: "usuario_id" });

module.exports = Recolector;
