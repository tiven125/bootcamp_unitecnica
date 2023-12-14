const Testimonio = require("../model/Testimonios");

// Obtener todos los testimonios
exports.obtenerTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonio.findAll();
    res.json(testimonios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener testimonios" });
  }
};

// Crear un nuevo testimonio
exports.crearTestimonio = async (req, res) => {
  const { autor, contenido, imagen } = req.body;

  try {
    const nuevoTestimonio = await Testimonio.create({
      autor,
      contenido,
      imagen,
    });

    res.status(201).json({
      mensaje: "Testimonio creado con éxito",
      testimonio: nuevoTestimonio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear testimonio" });
  }
};

// Obtener un testimonio por su ID
exports.obtenerTestimonioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonio = await Testimonio.findByPk(id);

    if (testimonio) {
      res.json(testimonio);
    } else {
      res.status(404).json({ mensaje: "Testimonio no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener testimonio" });
  }
};

// Actualizar un testimonio por su ID
exports.actualizarTestimonio = async (req, res) => {
  const { id } = req.params;
  const { autor, contenido, imagen } = req.body;

  try {
    const testimonio = await Testimonio.findByPk(id);

    if (testimonio) {
      await testimonio.update({
        autor,
        contenido,
        imagen,
      });

      res.json({ mensaje: "Testimonio actualizado con éxito", testimonio });
    } else {
      res.status(404).json({ mensaje: "Testimonio no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar testimonio" });
  }
};

// Eliminar un testimonio por su ID
exports.eliminarTestimonio = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonio = await Testimonio.findByPk(id);

    if (testimonio) {
      await testimonio.destroy();
      res.json({ mensaje: "Testimonio eliminado con éxito" });
    } else {
      res.status(404).json({ mensaje: "Testimonio no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar testimonio" });
  }
};
