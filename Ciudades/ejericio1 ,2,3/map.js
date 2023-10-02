let alumnos = [
  {
    nombre: "juan",
    edad: 18,
    nota: 4,
    nota1: 2,
    nota2: 2,
    Talleres: 2,
    definitiva: 0,
    estado: "",
  },
  {
    nombre: "Pedro",
    edad: 17,
    nota: 2,
    nota1: 3,
    nota2: 3,
    Talleres: 3,
    definitiva: 0,
    estado: "",
  },
  {
    nombre: "Luis",
    edad: 18,
    nota: 2,
    nota1: 2,
    nota2: 3,
    Talleres: 0,
    definitiva: 0,
    estado: "",
  },
];

let prueba = alumnos.map((alumno) => {
  let nuevoAlumno = { ...alumno };
  nuevoAlumno.definitiva =
    (nuevoAlumno.nota + nuevoAlumno.nota1 + nuevoAlumno.nota2) / 3;

  nuevoAlumno.Talleres = nuevoAlumno.definitiva > 3 ? 5 : 3;

  nuevoAlumno.estado =
    nuevoAlumno.definitiva + nuevoAlumno.Talleres >= 7
      ? "Aprobado"
      : "No Aprobado";
  return nuevoAlumno;
});

console.log("----Ejercicio Dos----");
console.log(prueba);
