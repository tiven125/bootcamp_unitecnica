// controllers/recolectoresController.js
const Recolector = require("../model/Recolector");
const Usuario = require("../model/Usuario");
// const RegistroRecoleccion = require("../model/RegistroRecoleccion"); // Agrega esta línea

const recolectoresController = {
  obtenerRecolectores: async (req, res) => {
    try {
      const recolectores = await Recolector.findAll();
      res.json(recolectores);
    } catch (error) {
      console.error("Error al obtener los recolectores:", error);
      res.status(500).json({ mensaje: "Error al obtener los recolectores" });
    }
  },

  obtenerRecolectorPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const recolector = await Recolector.findByPk(id);
      if (!recolector) {
        return res.status(404).json({ mensaje: "Recolector no encontrado" });
      }
      res.json(recolector);
    } catch (error) {
      console.error("Error al obtener el recolector:", error);
      res.status(500).json({ mensaje: "Error al obtener el recolector" });
    }
  },

  registrarRecolector: async (req, res) => {
    const { nombre, telefono, direccion, usuario_id } = req.body;
    try {
      const recolectorExistente = await Recolector.findOne({
        where: { usuario_id: usuario_id },
      });

      if (recolectorExistente) {
        return res
          .status(400)
          .json({ mensaje: "El recolector ya está registrado" });
      }

      const nuevoRecolector = await Recolector.create({
        nombre,
        telefono,
        direccion,
        usuario_id,
      });

      res.status(201).json({
        mensaje: "Recolector registrado con éxito",
        recolector: nuevoRecolector,
      });
    } catch (error) {
      console.error("Error al registrar el recolector:", error);
      res.status(500).json({ mensaje: "Error al registrar el recolector" });
    }
  },

  actualizarRecolector: async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, usuario_id } = req.body;
    try {
      const recolector = await Recolector.findByPk(id);
      if (!recolector) {
        return res.status(404).json({ mensaje: "Recolector no encontrado" });
      }
      recolector.nombre = nombre;
      recolector.telefono = telefono;
      recolector.direccion = direccion;
      recolector.usuario_id = usuario_id;
      await recolector.save();
      res.json({ mensaje: "Recolector actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar el recolector:", error);
      res.status(500).json({ mensaje: "Error al actualizar el recolector" });
    }
  },

  eliminarRecolector: async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Recolector.destroy({ where: { id } });
      if (resultado === 0) {
        return res.status(404).json({ mensaje: "Recolector no encontrado" });
      }
      res.json({ mensaje: "Recolector eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el recolector:", error);
      res.status(500).json({ mensaje: "Error al eliminar el recolector" });
    }
  },
};

module.exports = recolectoresController;
