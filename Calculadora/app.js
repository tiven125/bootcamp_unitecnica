const buttons = document.querySelectorAll("button");
let resultado = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn.value);
    mostrarPantalla(btn);

    btn.value === "Ac" ? limpiarResultado() : null;
    btn.value === "=" ? calcularResultado() : null;
    btn.value === "c" ? eliminarUltimoCaracter() : null;
  });
});

function mostrarPantalla(btn) {
  if (btn.value !== "=" && btn.value !== "c") {
    resultado += btn.value;
    document.getElementById("mostrarResultado").value = resultado;
  }
}

function limpiarResultado() {
  resultado = "";
  document.getElementById("mostrarResultado").value = "";
}

function eliminarUltimoCaracter() {
  let elementoResultado = document.getElementById("mostrarResultado");
  let cadenaActual = elementoResultado.value;

  if (cadenaActual.length > 0) {
    let nuevaCadena = cadenaActual.slice(0, -1);
    elementoResultado.value = nuevaCadena;
    resultado = nuevaCadena;
  }
}

// function calcularResultado() {
//   const arreglo = resultado.split();
//   console.log(arreglo);
// }

function calcularResultado() {
  //   console.log(resultado);
  const calcular = eval(resultado);
  //   console.log(calcular);
  if (calcular !== undefined && !isNaN(calcular)) {
    resultado = calcular;
    document.getElementById("mostrarResultado").value = resultado;
  } else {
    document.getElementById("mostrarResultado").value = "Error";
  }
}
