const express = require("express");
const app = express();
const port = 3000;

const personas = require("./Datos/datos.js");

app.use(express.json());

//GET para obtener todos los Personas
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//? -------CRUD Personas-----------

// Get
app.get("/personas", (req, res) => {
  res.json(personas);
});

// Get por ID
app.get("/personas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const persona = personas.Personas.find((p) => p.id === id);
  if (!persona) {
    return res.status(404).json({ message: "Persona no encontrado" });
  }
  res.json(persona);
});

// POST
app.post("/personas", (req, res) => {
  const nuevopersona = req.body;
  personas.Personas.push(nuevopersona);
  res.status(201).json(nuevopersona);
});

// DELETE Por id
app.delete("/personas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = personas.Personas.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "persona no encontrado" });
  }
  personas.Personas.splice(index, 1);
  res.status(204).send();
});

// UPDATE
app.put("/personas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = personas.Personas.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "persona no encontrado" });
  }
  const actualizadopersona = req.body;
  personas[index] = actualizadopersona;
  res.json(actualizadopersona);
});

// ordenas personas ASCENDENTE
app.get("/personasAs", (req, res) => {
  const ordenar = personas.Personas.sort((a, b) =>
    a.Apellido.localeCompare(b.Apellido)
  );
  res.json(ordenar);
});

//  Mostrar todas las personas filtrar por Ciudad
app.get("/personasCiudad/:Ciudad", (req, res) => {
  const ciudad = req.params.Ciudad.toLowerCase();

  const personasEnCiudad = personas.Personas.filter(
    (persona) => persona.Ciudad.toLowerCase() === ciudad
  );
  if (personasEnCiudad.length === 0) {
    return res
      .status(404)
      .json({ error: "No se encontraron personas en la ciudad especificada" });
  }
  res.json(personasEnCiudad);
});

//  Mostrar todas las personas departamento y ciudad
app.get("/personasCidDept/filtro", (req, res) => {
  const departamento = req.query.departamento.toLowerCase();
  const ciudad = req.query.ciudad.toLowerCase();

  const personasFiltradas = personas.Personas.filter(
    (persona) =>
      (departamento
        ? persona.Departamento.toLowerCase() === departamento
        : true) && (ciudad ? persona.Ciudad.toLowerCase() === ciudad : true)
  );

  res.json(personasFiltradas);
});

//? -------CRUD ZONA DE VOTACION-----------

// Get
app.get("/zonasVotacion", (req, res) => {
  res.json(personas.Zona_Votacion);
});

// Get por ID
app.get("/zonasVotacion/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const zonaVotacion = personas.Zona_Votacion.find((p) => p.Id === id);
  if (!zonaVotacion) {
    return res.status(404).json({ message: "Persona no encontrado" });
  }
  res.json(zonaVotacion);
});

// POST por id
app.post("/zonasVotacion", (req, res) => {
  const nuevozonasVotacion = req.body;
  personas.Zona_Votacion.push(nuevozonasVotacion);
  res.status(201).json(nuevozonasVotacion);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
