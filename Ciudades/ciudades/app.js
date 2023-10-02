const selectCiudades = document.getElementById("selectCiudades");
const btnBuscar = document.getElementById("btnBuscar");
const divContenedor = document.querySelector(".contenedor__card");

//? Datos

const ciudadesData = [
  {
    nombre: "Chinchina",
    img: "img/383013019_983090602992621_9218815056043023728_n.jpg",
    descripcion: "Ciudad Electrica.",
  },
  {
    nombre: "Manizales",
    img: "img/bienvenidos-a-manizales.jpg",
    descripcion: "La ciudad de las puertas abiertas.",
  },
  {
    nombre: "Pereira",
    img: "img/pereira.jpg",
    descripcion: "La Querendona, Trasnochadora y Morena.",
  },
  {
    nombre: "Medellin",
    img: "img/13631_1671197910.jpg",
    descripcion: "Ciudad de la Eterna Primavera.",
  },
  {
    nombre: "Cali",
    img: "img/82c1a6a15546120338de95267ade0b48.jpg",
    descripcion: "La Sucursal del Cielo.",
  },
  {
    nombre: "Popayan",
    img: "img/poyan.jpg",
    descripcion: "La ciudad blanca.",
  },
  {
    nombre: "Cartagena",
    img: "img/cartagena.jpg",
    descripcion: "La Ciudad Amurallada.",
  },
];

ciudadesData.forEach((ciudades) => {
  let llenaroption = document.createElement("option");
  llenaroption.text = ciudades.nombre;
  selectCiudades.appendChild(llenaroption);
});

btnBuscar.addEventListener("click", function (ciudades) {
  const opcionSeleccionada = selectCiudades.value;

  switch (opcionSeleccionada) {
    case "Chinchina":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[0]);

      break;
    case "Manizales":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[1]);

      break;
    case "Pereira":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[2]);

      break;
    case "Medellin":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[3]);

      break;
    case "Cali":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[4]);

      break;
    case "Popayan":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[5]);

      break;
    case "Cartagena":
      console.log(opcionSeleccionada);
      mostrarCiudad(ciudadesData[6]);

      break;

    default:
      console.log("Opción no reconocida");
      break;
  }
});

function mostrarCiudad(ciudad) {
  const codigoHTML = `
    <div class="card">
      <img src="${ciudad.img}" alt="${ciudad.nombre}" />
      <h2>${ciudad.nombre}</h2>
      <p>${ciudad.descripcion}.</p>
    </div>
  `;
  divContenedor.innerHTML = codigoHTML;
}
