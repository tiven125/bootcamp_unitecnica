const express = require("express");
const router = express.Router();
const {
  obtenerTodosLosRegistrosDiarios,
  obtenerRegistrosDiariosPorRecolector,
  obtenerRegistroDiarioPorId,
  registrarCafeDiario,
  modificarRegistroDiario,
  eliminarRegistroDiario,
} = require("../controller/registroDiarioController");

router.get(
  "/Diarios",

  (req, res) => {
    res.render(`../views/usuarios/registroDiario.html`);
  }
);

// Rutas para los registros diarios
router.get("/", obtenerTodosLosRegistrosDiarios);
router.get("/:recolectorId", obtenerRegistrosDiariosPorRecolector);
// router.get("/registroDiario/:id", obtenerRegistroDiarioPorId);
router.post("/", registrarCafeDiario);
router.put("/:id", modificarRegistroDiario);
router.delete("/:id", eliminarRegistroDiario);

module.exports = router;
