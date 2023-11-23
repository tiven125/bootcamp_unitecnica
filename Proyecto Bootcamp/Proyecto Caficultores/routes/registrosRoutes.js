const express = require("express");
const router = express.Router();
const registroRecoleccionController = require("../controller/registroRecoleccionController");

// Definir rutas para CRUD de registros de recolección
router.post("/", registroRecoleccionController.registrarRecoleccion);
router.get("/", registroRecoleccionController.obtenerRegistrosRecoleccion);
router.get(
  "/:id",
  registroRecoleccionController.obtenerRegistroRecoleccionPorId
);
router.put("/:id", registroRecoleccionController.actualizarRegistroRecoleccion);
router.delete(
  "/:id",
  registroRecoleccionController.eliminarRegistroRecoleccion
);

module.exports = router;
