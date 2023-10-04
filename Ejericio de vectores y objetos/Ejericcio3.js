let users = [
  { firstName: "Susan", lastName: "Steward" },
  { firstName: "Daniel", lastName: "Longbottom" },
  { firstName: "Jacob", lastName: "Black" },
];

let nombres = users.map((usuario) => {
  let nombreCompleto = usuario.firstName.concat(" ", usuario.lastName);
  return nombreCompleto;
});

console.log("------Ejercicio 3--------");
console.log(nombres);
