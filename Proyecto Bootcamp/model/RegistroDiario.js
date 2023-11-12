// En RegistroDiario.js

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Recolector = require("./Recolector"); // Asegúrate de que la ruta del archivo sea correcta

class RegistroDiario extends Model {}

RegistroDiario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad_cafe_recolectado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RegistroDiario",
  }
);

// Verificar la relación muchos a uno con Recolector
RegistroDiario.belongsTo(Recolector, {
  as: "recolector",
  foreignKey: "recolector_id",
});

module.exports = RegistroDiario;
