// models/Testimonio.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Testimonio = sequelize.define("Testimonio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Testimonio;
