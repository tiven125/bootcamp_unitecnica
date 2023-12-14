const express = require("express");
const router = express.Router();
const testimonioRouter = require("../controller/testimoniosController");

const {
  estaAutenticado,
  esAdministrador,
} = require("../middlewares/autenticacion");

router.get("/crear-testimonio", (req, res) => {
  res.render(`../views/testimonios/testimonios.html`);
});

router.get("/detalles/:id", (req, res) => {
  res.render(`../views/testimonios/detalle.html`);
});

router.get("/testimonios/:id", testimonioRouter.obtenerTestimonioPorId);

router.get(
  "/gestionar-testimonios",
  estaAutenticado,
  esAdministrador,
  (req, res) => {
    res.render(`../views/testimonios/gestionarTestimonios.html`);
  }
);

router.get("/testimonios", testimonioRouter.obtenerTestimonios);

router.get("/testimonios/:id", testimonioRouter.obtenerTestimonioPorId);

router.post("/testimonio", testimonioRouter.crearTestimonio);

router.put("/testimonios/:id", testimonioRouter.actualizarTestimonio);

router.delete("/testimonios/:id", testimonioRouter.eliminarTestimonio);

module.exports = router;
