// models/Usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "recolector"),
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      // Antes de guardar el usuario, cifra la contraseña
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      },
    },
  }
);

module.exports = Usuario;
