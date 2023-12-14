// Crear la tabla de testimonios
const tablaTestimonios = new Tabulator("#tablaTestimonios", {
  height: "100%",
  layout: "fitColumns",
  columns: [
    { title: "ID", field: "id", cssClass: "red-text", headerFilter: "input" },
    {
      title: "Nombre",
      field: "autor",
      cssClass: "red-text",
      headerFilter: "input",
    },
    {
      title: "Mensaje",
      field: "contenido",
      cssClass: "red-text",
      headerFilter: "input",
    },
    { title: "Acciones", formatter: accionesFormatter, cssClass: "acciones" },
  ],
});

// Función para cargar los testimonios
function cargarTestimonios() {
  fetch("/testimonios")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      tablaTestimonios.setData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Error al obtener los datos de los testimonios. Por favor, inténtalo de nuevo más tarde."
      );
    });
}

// Llamamos a la función para cargar los testimonios al cargar la página
document.addEventListener("DOMContentLoaded", cargarTestimonios);

function accionesFormatter(cell, formatterParams, onRendered) {
  const testimonioId = cell.getRow().getData().id;
  return `
    
    <button class="eliminar" onclick="eliminarTestimonio(${testimonioId})">
      <i class="fas fa-trash"></i>
    </button>`;
}

// Función para eliminar un testimonio
function eliminarTestimonio(id) {
  Swal.fire({
    title: "¿Estás seguro de que quieres eliminar este testimonio?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/testimonios/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Si la eliminación fue exitosa, actualizar la tabla
            tablaTestimonios.setData("/testimonios");
            // Mostrar un mensaje de éxito
            Swal.fire(
              "Eliminado",
              "El testimonio ha sido eliminado.",
              "success"
            );
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire("Error", "Error al eliminar el testimonio.", "error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar un mensaje de error
          Swal.fire(
            "Error en la red",
            "Error en la red al intentar eliminar el testimonio.",
            "error"
          );
        });
    }
  });
}
