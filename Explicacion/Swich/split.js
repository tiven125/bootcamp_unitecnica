// let text = "Steven ,Gutierrez ,Castañeda";
// const myArray = text.split(", ");
// console.log(myArray);

// const str = "Hola";
// console.log(str.substring(1, 2));

// let text2 = "    Steven Gutierrez Castañeda";
// const tectDos = text2.trim(", ");
// console.log(text2);

// const prueba = "   Hello world!   ";
// console.log(prueba);

// console.log(prueba.trimEnd());
// // Expected output: "   Hello world!";

// const p = "el perro de la casa es gris    ";
// console.log(p.replace("gris", "negro"));

// const numeros = [1, 2, 4, 8, 16];

// let uno = numeros.map(function (x) {
//   return x * 2;
// });

// console.log(uno);

// const count = numeros.push("8");

// console.log(numeros);

// console.log(Math.sqrt(24));
// console.log(Math.sin(32));

// const str1 = "Hello";
// const str2 = "World";

// console.log(str1.concat(" ", str2));
// // Expected output: "Hello World"

// console.log(str2.concat(", ", str1));
// // Expected output: "World, Hello"

let dias = prompt(
  "imgrese un numero 1 :lunes 2:martes, 3:miercoles, 4:jueves, 5:viernes"
);

let numero = parseInt(dias);
switch (numero) {
  case 1:
    alert("Es lunes");
    break;

  case 2:
    alert("Es Martes");
    break;

  case 3:
    alert("Es Miercoles");
    break;

  case 4:
    alert("Es Jueves");
    break;
  case 5:
    alert("Es Viernes");
    break;

  default:
    break;
}
