const Ruta = require("../model/Rutas");

const rutasController = {
  obtenerRutas: async (req, res) => {
    try {
      const rutas = await Ruta.findAll();
      res.json(rutas);
    } catch (error) {
      console.error("Error al obtener las rutas:", error);
      res.status(500).json({ error: "Error al obtener las rutas" });
    }
  },

  obtenerRutaPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const ruta = await Ruta.findByPk(id);
      if (!ruta) {
        res.status(404).json({ error: "Ruta no encontrada" });
        return;
      }
      res.json(ruta);
    } catch (error) {
      console.error("Error al obtener la ruta por ID:", error);
      res.status(500).json({ error: "Error al obtener la ruta por ID" });
    }
  },

  crearRuta: async (req, res) => {
    const { nombre, descripcion, kilometros, imagen, video } = req.body;
    try {
      const nuevaRuta = await Ruta.create({
        nombre,
        descripcion,
        kilometros,
        imagen,
        video,
      });
      res.status(201).json(nuevaRuta);
    } catch (error) {
      console.error("Error al crear la ruta:", error);
      res.status(500).json({ error: "Error al crear la ruta" });
    }
  },

  actualizarRuta: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, kilometros, imagen, video } = req.body;
    try {
      const ruta = await Ruta.findByPk(id);
      if (!ruta) {
        res.status(404).json({ error: "Ruta no encontrada" });
        return;
      }
      await ruta.update({ nombre, descripcion, kilometros, imagen, video });
      res.json(ruta);
    } catch (error) {
      console.error("Error al actualizar la ruta:", error);
      res.status(500).json({ error: "Error al actualizar la ruta" });
    }
  },

  eliminarRuta: async (req, res) => {
    const { id } = req.params;
    try {
      const ruta = await Ruta.findByPk(id);
      if (!ruta) {
        res.status(404).json({ error: "Ruta no encontrada" });
        return;
      }
      await ruta.destroy();
      res.json({ mensaje: "Ruta eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar la ruta:", error);
      res.status(500).json({ error: "Error al eliminar la ruta" });
    }
  },
};

module.exports = rutasController;
