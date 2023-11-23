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
      window.location.href = ruta.imagen; // Redirigir al enlace de la imagen
    });

    // Agregar el elemento de ruta al contenedor principal
    contenedorRutas.appendChild(rutaDiv);
  });
}

fetch("/rutas")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Llamada a la función para construir las rutas con los datos obtenidos
    construirRutas(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener datos de rutas. Por favor, inténtalo de nuevo más tarde."
    );
  });
