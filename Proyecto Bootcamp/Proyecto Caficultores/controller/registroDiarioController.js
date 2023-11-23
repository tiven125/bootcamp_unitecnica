// controllers/registroDiarioController.js
const Recolector = require("../model/Recolector");
const RegistroDiario = require("../model/RegistroDiario");

const registrarCafeDiario = async (req, res) => {
  try {
    // Obtener la lista de recolectores disponibles
    const recolectores = await Recolector.findAll();

    // Validar la entrada (puedes hacer validaciones más detalladas según tus necesidades)
    if (!req.body.recolectorId || !req.body.cantidadCafeRecolectado) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son requeridos", recolectores });
    }

    // Obtener el recolector asociado
    const recolector = await Recolector.findByPk(req.body.recolectorId);

    if (!recolector) {
      return res
        .status(404)
        .json({ mensaje: "Recolector no encontrado", recolectores });
    }

    // Crear el registro diario
    const nuevoRegistro = await RegistroDiario.create({
      cantidad_cafe_recolectado: req.body.cantidadCafeRecolectado,
      recolector_id: req.body.recolectorId,
    });

    res.status(201).json({
      mensaje: "Registro diario creado exitosamente",
      nuevoRegistro,
      recolectores,
    });
  } catch (error) {
    console.error("Error al registrar el café diario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerTodosLosRegistrosDiarios = async (req, res) => {
  try {
    // Obtener la lista de recolectores disponibles
    const recolectores = await Recolector.findAll();

    // Obtener todos los registros diarios incluyendo la información del recolector asociado
    const registrosDiarios = await RegistroDiario.findAll({
      include: [{ model: Recolector, as: "recolector" }],
    });

    res.json({ registrosDiarios, recolectores });
  } catch (error) {
    console.error("Error al obtener todos los registros diarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerRegistrosDiariosPorRecolector = async (req, res) => {
  const { recolectorId } = req.params;

  try {
    // Validar la entrada
    if (!recolectorId) {
      return res
        .status(400)
        .json({ mensaje: "El ID del recolector es requerido" });
    }

    // Obtener el recolector asociado
    const recolector = await Recolector.findByPk(recolectorId);

    if (!recolector) {
      return res.status(404).json({ mensaje: "Recolector no encontrado" });
    }

    // Obtener los registros diarios asociados al recolector incluyendo la información del recolector
    const registrosDiarios = await RegistroDiario.findAll({
      where: { recolector_id: recolectorId },
      include: [{ model: Recolector, as: "recolector" }],
    });

    res.json({ registrosDiarios, recolector });
  } catch (error) {
    console.error("Error al obtener los registros diarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const eliminarRegistroDiario = async (req, res) => {
  const { id } = req.params;

  try {
    const registroDiario = await RegistroDiario.findByPk(id);

    if (!registroDiario) {
      return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    }

    await registroDiario.destroy();

    res.json({ mensaje: "Registro diario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el registro diario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Modificar un registro diario por ID
const modificarRegistroDiario = async (req, res) => {
  const { id } = req.params;
  const { cantidadCafeRecolectado, fecha, recolectorId } = req.body;

  try {
    const registroDiario = await RegistroDiario.findByPk(id);

    if (!registroDiario) {
      return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    }

    // Actualizar los campos necesarios
    registroDiario.cantidad_cafe_recolectado = cantidadCafeRecolectado;
    registroDiario.fecha = fecha;
    registroDiario.recolector_id = recolectorId;

    await registroDiario.save();

    res.json({
      mensaje: "Registro diario modificado exitosamente",
      registroDiario,
    });
  } catch (error) {
    console.error("Error al modificar el registro diario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  modificarRegistroDiario,
  eliminarRegistroDiario,
  obtenerTodosLosRegistrosDiarios,
  registrarCafeDiario,
  obtenerRegistrosDiariosPorRecolector,
};
