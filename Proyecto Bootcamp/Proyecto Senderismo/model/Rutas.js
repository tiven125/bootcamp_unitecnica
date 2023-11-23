const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rutas = sequelize.define("Rutas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kilometros: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Rutas;
