// Variable para almacenar los datos originales
let rutasOriginales;

function construirRutas(data) {
  // Obtén el contenedor donde se mostrarán las rutas
  const contenedorRutas = document.getElementById("contenedorRutas");

  // Limpiar el contenido existente en caso de actualizaciones
  contenedorRutas.innerHTML = "";

  // Iterar sobre los datos y construir el HTML para cada ruta
  data.forEach((ruta) => {
    // Crear un nuevo elemento div con las clases necesarias
    const rutaDiv = document.createElement("div");
    rutaDiv.classList.add("col-lg-4", "col-md-6", "mb-4");

    // Construir el contenido interno con las clases y datos de la ruta
    rutaDiv.innerHTML = `
      <div class="destination-item position-relative overflow-hidden mb-2">
        <img class="img-fluid" src="${ruta.imagen}" alt="${ruta.nombre}" />
        <a class="destination-overlay text-white text-decoration-none" href="#">
          <h5 class="text-white">${ruta.nombre}</h5>
          <span>${ruta.kilometros} Kilómetros</span>
        </a>
      </div>
    `;

    rutaDiv.addEventListener("click", () => {
      window.location.href = `/detalles/${ruta.id}`;
    });

    // Agregar el elemento de ruta al contenedor principal
    contenedorRutas.appendChild(rutaDiv);
  });
}

function filtrarPorNombreYDescripcion() {
  const filtroNombre = document
    .getElementById("filtroNombre")
    .value.toLowerCase();
  const filtroDescripcion = document
    .getElementById("filtroDescripcion")
    .value.toLowerCase();

  const rutasFiltradas = rutasOriginales.filter((ruta) => {
    const nombreEnMinusculas = ruta.nombre.toLowerCase();
    const descripcionEnMinusculas = ruta.descripcion.toLowerCase();

    return (
      nombreEnMinusculas.includes(filtroNombre) &&
      descripcionEnMinusculas.includes(filtroDescripcion)
    );
  });

  construirRutas(rutasFiltradas);
}

function filtrarPorKilometros(tipo) {
  const rutasFiltradas = rutasOriginales.slice(); // Clonar el array para no modificar el original

  if (tipo === "mayor") {
    rutasFiltradas.sort((a, b) => b.kilometros - a.kilometros);
  } else if (tipo === "menor") {
    rutasFiltradas.sort((a, b) => a.kilometros - b.kilometros);
  }

  construirRutas(rutasFiltradas);
}

function aplicarFiltros() {
  filtrarPorNombreYDescripcion();
  // Los filtros de kilómetros ya se aplican en sus respectivos métodos
}

// Realizar la solicitud para obtener los datos de las rutas
fetch("/rutas")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Almacenar los datos originales
    rutasOriginales = data;

    // Llamada a la función para construir las rutas con los datos obtenidos
    construirRutas(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener datos de rutas. Por favor, inténtalo de nuevo más tarde."
    );
  });

// Obtener el contenedor de testimonios
const testimoniosContainer = document.getElementById("testimonios-container");

// Función para cargar y mostrar testimonios con Swiper
async function cargarTestimonios() {
  try {
    const response = await fetch("/testimonios");
    const testimonios = await response.json();

    // Crear el contenedor del carrusel
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-container");

    // Crear el contenedor de las diapositivas
    const swiperSlideWrapper = document.createElement("div");
    swiperSlideWrapper.classList.add("swiper-wrapper");

    testimonios.forEach((testimonio) => {
      // Crear un elemento div para cada testimonio
      const testimonioDiv = document.createElement("div");
      testimonioDiv.classList.add(
        "swiper-slide",
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );

      // Crear la estructura interna del testimonio con clases y estilos
      testimonioDiv.innerHTML = `
        <img class="img-fluid mx-auto" src="${testimonio.imagen}" style="width: 350px; height: 350px" />
        <div class="testimonial-text bg-white p-4 mt-n5">
          <p class="mt-5">${testimonio.contenido}</p>
          <h5 class="text-truncate">${testimonio.autor}</h5>
        </div>
      `;

      // Agregar el testimonio al contenedor de las diapositivas
      swiperSlideWrapper.appendChild(testimonioDiv);
    });

    // Agregar el contenedor de diapositivas al contenedor del carrusel
    swiperWrapper.appendChild(swiperSlideWrapper);
    testimoniosContainer.appendChild(swiperWrapper);

    // Inicializar Swiper
    const swiper = new Swiper(".swiper-container", {
      // Configuración de Swiper (puedes personalizarla según tus necesidades)
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 5000, // 5 segundos de intervalo entre diapositivas
      },
    });
  } catch (error) {
    console.error("Error al cargar testimonios:", error);
  }
}

// Llamar a la función para cargar testimonios cuando la página se cargue
document.addEventListener("DOMContentLoaded", cargarTestimonios);
