// Crear la tabla de registros diarios
const tablaRegistrosDiarios = new Tabulator("#tablaRegistrosDiarios", {
  height: "100%", // Altura de la tabla
  layout: "fitColumns", // Ajustar columnas al ancho disponible
  columns: [
    { title: "ID", field: "id", cssClass: "red-text" },
    {
      title: "Cantidad Recolectada",
      field: "cantidad_cafe_recolectado",
      cssClass: "red-text",
    },
    { title: "Fecha", field: "fecha", cssClass: "red-text" },
    // { title: "Recolector", field: "recolector.nombre", cssClass: "red-text" },
    { title: "Acciones", formatter: accionesFormatter, cssClass: "acciones" },
  ],
});

// Botón para ir al menú
const btnIrMenu = document.querySelector("#btnIrMenu");
btnIrMenu.addEventListener("click", () => {
  location.href = "/admin";
});

// Obtener los datos de los registros diarios de la API
fetch("/registros")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Asignar los datos a la tabla
    tablaRegistrosDiarios.setData(data);

    // Imprimir los datos recibidos en la consola
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener los datos de los registros diarios. Por favor, inténtalo de nuevo más tarde."
    );
  });

// Función para dar formato a las acciones
function accionesFormatter(cell, formatterParams, onRendered) {
  const registroDiarioId = cell.getRow().getData().id;
  return `
    <button class="modificar" onclick="abrirModalModificarDiario(${registroDiarioId})">
      <i class="fas fa-edit"></i>
    </button>
    <button class="eliminar" onclick="eliminarRegistroDiario(${registroDiarioId})">
      <i class="fas fa-trash"></i>
    </button>`;
}

// Función para registrar un nuevo registro diario
function registrarCafeDiario() {
  // Obtener los valores de los campos del formulario
  const cantidadCafeRecolectado = document.getElementById(
    "cantidad_cafe_diario"
  ).value;
  const recolectorId = document.getElementById("recolector_id_diario").value;

  // Validar los campos (puedes personalizar esta parte según tus necesidades)
  if (!cantidadCafeRecolectado || !recolectorId) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos",
    });
    return;
  }

  // Realizar la solicitud POST para registrar el café diario
  fetch("/registros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cantidad_cafe_recolectado: cantidadCafeRecolectado,
      recolector_id: recolectorId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error del servidor: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Registro diario creado con éxito:", data);

      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Registro diario creado con éxito",
      });

      // Cerrar el modal después de la creación exitosa (puedes personalizar esta parte)
      cerrarModalAgregarDiario();
    })
    .catch((error) => {
      console.error("Error al registrar el café diario:", error);

      // Mostrar un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al registrar el café diario: ${error.message}`,
      });
    });
}

// Función para abrir el modal de agregar registro diario
function abrirModalAgregarDiario() {
  document.getElementById("modalCafeDiario").style.display = "block";
}

// Función para cerrar el modal de agregar registro diario
function cerrarModalAgregarDiario() {
  document.getElementById("modalCafeDiario").style.display = "none";
  location.reload(); // Esto recargará la página
}

// Función para eliminar un registro diario
function eliminarRegistroDiario(id) {
  Swal.fire({
    title: "¿Estás seguro de que quieres eliminar este registro diario?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/registros/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Si la eliminación fue exitosa, actualizar la tabla
            tablaRegistrosDiarios.setData("/registrosDiarios");
            // Mostrar un mensaje de éxito
            Swal.fire(
              "Eliminado",
              "El registro diario ha sido eliminado.",
              "success"
            );
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire(
              "Error",
              "Error al eliminar el registro diario.",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar un mensaje de error
          Swal.fire(
            "Error en la red",
            "Error en la red al intentar eliminar el registro diario.",
            "error"
          );
        });
    }
  });
}

// Función para abrir el modal de modificar registro diario
function abrirModalModificarDiario(id) {
  // Obtener datos del registro diario por ID y llenar el formulario modal
  fetch(`/registros/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener los datos del registro diario: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((registroDiario) => {
      // Llenar los campos del formulario con los datos del registro diario
      document.getElementById("cantidad_cafe_diario_modificar").value =
        registroDiario.cantidad_cafe_recolectado;
      document.getElementById("fecha_diario_modificar").value =
        registroDiario.fecha;

      // Establecer el ID en un campo oculto
      document.getElementById("recolector_id_diario_modificar").value =
        registroDiario.recolector_id;
      document.getElementById("id_diario_modificar").value = id;

      // Mostrar el modal de modificar registro diario
      document.getElementById("modalModificarDiario").style.display = "block";
    })
    .catch((error) => {
      console.error("Error al obtener los datos del registro diario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los datos del registro diario. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

// Función para cerrar el modal de modificar registro diario
function cerrarModalModificarDiario() {
  document.getElementById("modalModificarDiario").style.display = "none";
}

// Función para modificar un registro diario
async function modificarRegistroDiario() {
  const id = document.getElementById("id_diario_modificar").value;
  const cantidadCafeRecolectado = document.getElementById(
    "cantidad_cafe_diario_modificar"
  ).value;
  const fecha = document.getElementById("fecha_diario_modificar").value;
  const recolectorId = document.getElementById(
    "recolector_id_diario_modificar"
  ).value;

  try {
    const response = await fetch(`/registros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidad_cafe_recolectado: cantidadCafeRecolectado,
        fecha: fecha,
        recolector_id: recolectorId,
      }),
    });

    if (response.ok) {
      // Si la modificación fue exitosa, actualizar la tabla y mostrar un mensaje de éxito
      tablaRegistrosDiarios.setData("/registrosDiarios");
      Swal.fire("¡Éxito!", "Registro diario modificado con éxito", "success");

      // Cerrar el modal después de la modificación exitosa
      cerrarModalModificarDiario();
    } else {
      // Si hubo un error, mostrar un mensaje de error
      Swal.fire("Error", "Error al modificar el registro diario", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Si hubo un error de red, mostrar un mensaje de error
    Swal.fire(
      "Error en la red",
      "Error en la red al intentar modificar el registro diario",
      "error"
    );
  }
}

document.addEventListener("DOMContentLoaded", cargarOpcionesRecolectores);
