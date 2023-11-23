// Crear la tabla de recolectores
const tablaRecolectores = new Tabulator("#tablaRecolectores", {
  height: "100%", // Altura de la tabla
  layout: "fitColumns", // Ajustar columnas al ancho disponible
  columns: [
    { title: "ID", field: "id", cssClass: "red-text" },
    { title: "Nombre", field: "nombre", cssClass: "red-text" },
    { title: "Teléfono", field: "telefono", cssClass: "red-text" },
    { title: "Dirección", field: "direccion", cssClass: "red-text" },

    { title: "Acciones", formatter: accionesFormatter, cssClass: "acciones" },
  ],
});

// Botón para ir al menú
const btnIrMenu = document.querySelector("#btnIrMenu");
btnIrMenu.addEventListener("click", () => {
  location.href = "/admin";
});

// Obtener los datos de los recolectores de la API
fetch("/recolector")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Asignar los datos a la tabla
    tablaRecolectores.setData(data);

    // Imprimir los datos recibidos en la consola
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener los datos de los recolectores. Por favor, inténtalo de nuevo más tarde."
    );
  });

// Función para dar formato a las acciones
function accionesFormatter(cell, formatterParams, onRendered) {
  const recolectorId = cell.getRow().getData().id;
  return `
    <button class="modificar" onclick="abrirModalModificar(${recolectorId})">
      <i class="fas fa-edit"></i>
    </button>
    <button class="eliminar" onclick="eliminarRecolector(${recolectorId})">
      <i class="fas fa-trash"></i>
    </button>`;
}

// Función para abrir el modal de agregar recolector
function abrirModalAgregar() {
  document.getElementById("modalAgregar").style.display = "block";
}

// Función para cerrar el modal de agregar recolector
function cerrarModalAgregar() {
  document.getElementById("modalAgregar").style.display = "none";
  location.reload(); // Esto recargará la página
}

async function obtenerUsuarioPorId(idUsuario) {
  try {
    const respuesta = await fetch(`/usuarios/${idUsuario}`);
    if (respuesta.ok) {
      const usuario = await respuesta.json();
      return usuario;
    } else {
      // Manejar el caso en que la respuesta no sea exitosa
      const mensajeError = await respuesta.text();
      throw new Error(
        `Error al obtener los datos del usuario: ${mensajeError}`
      );
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error(
      "Error en la red al intentar obtener los datos del usuario"
    );
  }
}

// Función para eliminar un recolector
function eliminarRecolector(id) {
  Swal.fire({
    title: "¿Estás seguro de que quieres eliminar este recolector?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/recolector/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Si la eliminación fue exitosa, actualizar la tabla
            tablaRecolectores.setData("/recolector");
            // Mostrar un mensaje de éxito
            Swal.fire(
              "Eliminado",
              "El recolector ha sido eliminado.",
              "success"
            );
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire("Error", "Error al eliminar el recolector.", "error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar un mensaje de error
          Swal.fire(
            "Error en la red",
            "Error en la red al intentar eliminar el recolector.",
            "error"
          );
        });
    }
  });
}
// Función para abrir el modal de modificar recolector

function abrirModalModificar(id) {
  // Obtener datos del recolector por ID y llenar el formulario modal
  fetch(`/recolector/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener los datos del recolector: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((recolector) => {
      // Llenar los campos del formulario con los datos del recolector
      document.getElementById("nombre_modificar").value = recolector.nombre;
      document.getElementById("telefono_modificar").value = recolector.telefono;
      document.getElementById("direccion_modificar").value =
        recolector.direccion;

      // Establecer el ID en un campo oculto
      document.getElementById("id_modificar").value = id;

      // Mostrar el modal de modificar
      document.getElementById("modalModificar").style.display = "block";
    })
    .catch((error) => {
      console.error("Error al obtener los datos del recolector:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los datos del recolector. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

// Función para cerrar el modal de modificar recolector
function cerrarModalModificar() {
  document.getElementById("modalModificar").style.display = "none";
}

// Función para registrar un nuevo recolector
function registrarRecolector() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const usuario_id = document.getElementById("usuario_id").value;

  // Validar los campos (puedes personalizar esta parte según tus necesidades)
  if (!nombre || !telefono || !direccion || !usuario_id) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos",
    });
    return;
  }

  // Aquí puedes hacer la solicitud POST para registrar el recolector
  fetch("/recolector", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      telefono,
      direccion,
      usuario_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Recolector registrado con éxito:", data);

      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Recolector registrado con éxito",
      });
    })
    .catch((error) => {
      console.error("Error al registrar el recolector:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el recolector. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

async function modificarRecolector() {
  const id = document.getElementById("id_modificar").value;
  const nombre = document.getElementById("nombre_modificar").value;
  const telefono = document.getElementById("telefono_modificar").value;
  const direccion = document.getElementById("direccion_modificar").value;

  try {
    const response = await fetch(`/recolector/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
      }),
    });

    if (response.ok) {
      // Si la modificación fue exitosa, actualizar la tabla y mostrar un mensaje de éxito
      // (Asumo que tienes una función similar a tablaUsuarios.setData para actualizar la tabla)
      tablaRecolectores.setData("/recolectores");
      Swal.fire("¡Éxito!", "Recolector modificado con éxito", "success");
    } else {
      // Si hubo un error, mostrar un mensaje de error
      Swal.fire("Error", "Error al modificar el recolector", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Si hubo un error de red, mostrar un mensaje de error
    Swal.fire(
      "Error en la red",
      "Error en la red al intentar modificar el recolector",
      "error"
    );
  }
}

// llevar datos al select

document.addEventListener("DOMContentLoaded", cargarOpcionesUsuarios);
function cargarOpcionesUsuarios() {
  const selectUsuario = document.getElementById("usuario_id");

  // Obtener la lista de usuarios desde el servidor
  fetch("/usuarios")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((usuarios) => {
      // Limpiar las opciones existentes (por si acaso)
      selectUsuario.innerHTML = "";

      // Filtrar la lista para incluir solo a los recolectores (puedes ajustar el rol según tu estructura)
      const recolectores = usuarios.filter(
        (usuario) => usuario.rol === "recolector"
      );

      // Agregar las opciones basadas en la respuesta filtrada del servidor
      recolectores.forEach((recolector) => {
        const option = document.createElement("option");
        option.value = recolector.id;

        // Mostrar el nombre del recolector y su rol
        option.textContent = `${recolector.nombre_usuario} - Rol: ${recolector.rol}`;

        selectUsuario.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener la lista de usuarios:", error);
      alert(
        "Error al obtener la lista de usuarios. Por favor, inténtalo de nuevo más tarde."
      );
    });
}
