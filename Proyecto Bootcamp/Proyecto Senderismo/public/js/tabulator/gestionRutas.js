// Crear la tabla de rutas
const tablaRutas = new Tabulator("#tablaRutas", {
  height: "100%", // Altura de la tabla
  layout: "fitColumns", // Ajustar columnas al ancho disponible
  columns: [
    { title: "ID", field: "id", cssClass: "red-text" },
    { title: "Nombre", field: "nombre", cssClass: "red-text" },
    { title: "Descripción", field: "descripcion", cssClass: "red-text" },
    { title: "Kilómetros", field: "kilometros", cssClass: "red-text" },
    { title: "Imagen", field: "imagen", cssClass: "red-text" },
    { title: "Acciones", formatter: accionesFormatter, cssClass: "acciones" },
  ],
});

// Botón para ir al menú
const btnIrMenu = document.querySelector("#btnIrMenu");
btnIrMenu.addEventListener("click", () => {
  location.href = "/admin";
});

// Obtener los datos de las rutas de la API
fetch("/rutas")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Asignar los datos a la tabla
    tablaRutas.setData(data);

    // Imprimir los datos recibidos en la consola
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener los datos de las rutas. Por favor, inténtalo de nuevo más tarde."
    );
  });

// Función para dar formato a las acciones
function accionesFormatter(cell, formatterParams, onRendered) {
  const rutaId = cell.getRow().getData().id;
  return `
    <button class="modificar" onclick="abrirModalModificar(${rutaId})">
      <i class="fas fa-edit"></i>
    </button>
    <button class="eliminar" onclick="eliminarRuta(${rutaId})">
      <i class="fas fa-trash"></i>
    </button>`;
}

// Función para abrir el modal de agregar ruta
function abrirModalAgregar() {
  document.getElementById("modalAgregar").style.display = "block";
}

// Función para cerrar el modal de agregar ruta
function cerrarModalAgregar() {
  document.getElementById("modalAgregar").style.display = "none";
  location.reload(); // Esto recargará la página
}

// Función para eliminar una ruta
function eliminarRuta(id) {
  Swal.fire({
    title: "¿Estás seguro de que quieres eliminar esta ruta?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/rutas/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Si la eliminación fue exitosa, actualizar la tabla
            tablaRutas.setData("/rutas");
            // Mostrar un mensaje de éxito
            Swal.fire("Eliminado", "La ruta ha sido eliminada.", "success");
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire("Error", "Error al eliminar la ruta.", "error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar un mensaje de error
          Swal.fire(
            "Error en la red",
            "Error en la red al intentar eliminar la ruta.",
            "error"
          );
        });
    }
  });
}

// Función para abrir el modal de modificar ruta
function abrirModalModificar(id) {
  // Obtener datos de la ruta por ID y llenar el formulario modal
  fetch(`/rutas/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener los datos de la ruta: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((ruta) => {
      // Llenar los campos del formulario con los datos de la ruta
      document.getElementById("nombre_modificar").value = ruta.nombre;
      document.getElementById("descripcion_modificar").value = ruta.descripcion;
      document.getElementById("kilometros_modificar").value = ruta.kilometros;
      document.getElementById("imagen_modificar").value = ruta.imagen;

      // Establecer el ID en un campo oculto
      document.getElementById("id_modificar").value = id;

      // Mostrar el modal de modificar
      document.getElementById("modalModificar").style.display = "block";
    })
    .catch((error) => {
      console.error("Error al obtener los datos de la ruta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los datos de la ruta. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

// Función para cerrar el modal de modificar ruta
function cerrarModalModificar() {
  document.getElementById("modalModificar").style.display = "none";
}

// Función para registrar una nueva ruta
function registrarRuta() {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const kilometros = document.getElementById("kilometros").value;
  const imagen = document.getElementById("imagen").value;

  // Validar los campos (puedes personalizar esta parte según tus necesidades)
  if (!nombre || !descripcion || !kilometros || !imagen) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos",
    });
    return;
  }

  // Aquí puedes hacer la solicitud POST para registrar la ruta
  fetch("/rutas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      kilometros,
      imagen,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ruta registrada con éxito:", data);

      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Ruta registrada con éxito",
      });
    })
    .catch((error) => {
      console.error("Error al registrar la ruta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la ruta. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

// Función para modificar una ruta
async function modificarRuta() {
  const id = document.getElementById("id_modificar").value;
  const nombre = document.getElementById("nombre_modificar").value;
  const descripcion = document.getElementById("descripcion_modificar").value;
  const kilometros = document.getElementById("kilometros_modificar").value;
  const imagen = document.getElementById("imagen_modificar").value;

  try {
    const response = await fetch(`/rutas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        kilometros,
        imagen,
      }),
    });

    if (response.ok) {
      // Si la modificación fue exitosa, actualizar la tabla y mostrar un mensaje de éxito
      // (Asumo que tienes una función similar a tablaRutas.setData para actualizar la tabla)
      tablaRutas.setData("/rutas");
      Swal.fire("¡Éxito!", "Ruta modificada con éxito", "success");
    } else {
      // Si hubo un error, mostrar un mensaje de error
      Swal.fire("Error", "Error al modificar la ruta", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Si hubo un error de red, mostrar un mensaje de error
    Swal.fire(
      "Error en la red",
      "Error en la red al intentar modificar la ruta",
      "error"
    );
  }
}
