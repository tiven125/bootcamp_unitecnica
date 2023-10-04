/* 
Bueno no los escribi, pero puedo describirte de acuerdo a lo que hice y recuerdo como son

1. De acuerdo al vector v = ["a", "g", "a", "f", "p", "t", "e", "a", "p"]; debes contar y mostrar cuantas 'a' hay en el vector

2. De acuerdo al vector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] debes sumar todos los valores y mostrar el resultado

3. De acuerdo al vector x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], debes mostrar cada número pero en palabra. Ejm: 1 - uno

4. Realizar una función que reciba 2 números y un operador matemático, se debe realizar el operación matemática y devolver el resultado
*/

const letras = ["a", "g", "a", "f", "p", "t", "e", "a", "p"];
let contarleTras = letras.filter((letra) => {
  return letra.includes("a");
});
console.log(contarleTras.length);

const numero = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Ejercicio 3");

let resultado = 0;
for (let index = 0; index < numero.length; index++) {
  resultado += numero[index];
}
console.log(resultado);

console.log("Ejercicio 4");

const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const numerosEnPalabras = {
  0: "cero",
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
};

numeros.forEach((numero) => {
  const palabra = numerosEnPalabras[numero];
  console.log(`${numero} - ${palabra}`);
});

console.log("Ejercicio 5");
function realizarOperacion(num1, num2, operador) {
  let resultado;

  switch (operador) {
    case "+":
      resultado = num1 + num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    case "*":
      resultado = num1 * num2;
      break;
    case "/":
      resultado = num1 / num2;
      break;
    default:
      resultado = "Operador no válido";
      break;
  }

  return resultado;
}

// Ejemplos de uso:
console.log(realizarOperacion(4, 3, "+"));
