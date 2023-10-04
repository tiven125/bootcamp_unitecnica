const selecCiudades = document.getElementById("cidades");
const inputResultado = document.getElementById("inputResultado");
const buscarciudad = document.getElementById("buscarciudad");
const ciudad = ["chinchina", "manizales", "pereira"];

ciudad.forEach((ciudades, index) => {
  let crearOption = document.createElement("option");
  crearOption.text = ciudades;
  crearOption.value = index + 1;
  console.log(crearOption);
  selecCiudades.appendChild(crearOption);
});

buscarciudad.addEventListener("click", function () {
  const valorSeleccionado = parseInt(selecCiudades.value);
  switch (valorSeleccionado) {
    case 1:
      console.log("Chinchina");
      inputResultado.value = "Ciudad electrica";
      inputResultado.disabled = true;
      break;
    case 2:
      console.log("Manizales");
      inputResultado.value = "Ciudad de las puertas Abiertas";
      inputResultado.disabled = true;
      break;
    case 3:
      console.log("Pereira");
      inputResultado.value = "Querendona trasnochadora y morena";
      inputResultado.disabled = true;
      break;
    default:
      inputResultado.value = "";
      inputResultado.disabled = true;
      break;
  }
});
