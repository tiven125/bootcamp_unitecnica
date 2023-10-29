const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
const ROLES = require("../constants/roles");

const Usuario = sequelize.define(
  "usuario",
  {
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nombre_usuario",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: "email",
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "contrasena",
    },
    rol: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.RECOLECTOR),
      allowNull: false,
      field: "rol",
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
