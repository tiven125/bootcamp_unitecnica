let vectorAlumnos = [
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

vectorAlumnos.forEach(function (alumno) {
  alumno.definitiva = (alumno.nota + alumno.nota1 + alumno.nota2) / 3;

  alumno.Talleres = alumno.definitiva > 3 ? 5 : 3;

  alumno.estado =
    alumno.definitiva + alumno.Talleres >= 7 ? "Aprobado" : "No Aprobado";
});

console.log("-------Ejercicio 1----------");
console.log(vectorAlumnos);
