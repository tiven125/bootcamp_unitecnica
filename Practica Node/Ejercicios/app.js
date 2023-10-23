const express = require("express");
const app = express();
const port = 3000;

const personajes = require("./data/personajes.js");

app.use(express.json());

//GET para obtener todos los personajes
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/personajes", (req, res) => {
  res.json(personajes);
});

// Get personajes

app.get("/personajes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const personaje = personajes.find((p) => p.id === id);
  if (!personaje) {
    return res.status(404).json({ message: "Personaje no encontrado" });
  }
  res.json(personaje);
});

// Crear

app.post("/newPersonaje", (req, res) => {
  const nuevoPersonaje = req.body;
  personajes.push(nuevoPersonaje);
  res.status(201).json(nuevoPersonaje);
});

// DELETE
app.delete("/personajesEliminar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = personajes.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Personaje no encontrado" });
  }
  personajes.splice(index, 1);
  res.status(204).send();
});

// UPDATE
app.put("/personajes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = personajes.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Personaje no encontrado" });
  }
  const actualizadoPersonaje = req.body;
  personajes[index] = actualizadoPersonaje;
  res.json(actualizadoPersonaje);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
