const tablaUsuarios = new Tabulator("#tablaUsuarios", {
  height: "100%", // Altura de la tabla
  layout: "fitColumns", // Ajustar columnas al ancho disponible
  columns: [
    { title: "ID", field: "id", cssClass: "red-text" },
    {
      title: "Nombre de Usuario",
      field: "nombre_usuario",
      cssClass: "red-text",
    },
    {
      title: "Rol",
      field: "rol",
      cssClass: "red-text",
    },
    { title: "Email", field: "email", cssClass: "red-text" },
    { title: "Contraseña", field: "contrasena", cssClass: "red-text" }, // Agregada columna de contraseña

    // Columna para los botones de acción
    {
      title: "Acciones",
      formatter: function (cell, formatterParams, onRendered) {
        // Retorna los botones de acción con iconos
        return (
          ' <button class="modificar" onclick="abrirModalModificar(' +
          cell.getRow().getData().id +
          ')"><i class="fas fa-edit"></i> </button> <button class="eliminar" onclick="eliminarUsuario(' +
          cell.getRow().getIndex() +
          ')"><i class="fas fa-trash"></i> </button>'
        );
      },
      cssClass: "acciones",
    },
  ],
});

// Obtener los datos de los usuarios de la API
fetch("/usuarios")
  .then((response) => response.json())
  .then((data) => {
    // Asignar los datos a la tabla
    tablaUsuarios.setData(data);

    // Imprimir los datos recibidos en la consola
    console.log(data);
  })
  .catch((error) => {
    console.error("Error al obtener los datos de los usuarios:", error);
    alert(
      "Error al obtener los datos de los usuarios. Por favor, inténtalo de nuevo más tarde."
    );
  });

const btnIrMenu = document.querySelector("#btnIrMenu");
btnIrMenu.addEventListener("click", () => {
  location.href = "/admin";
});

// modales

function abrirModalAgregar() {
  document.getElementById("modalAgregar").style.display = "block";
}

function cerrarModalAgregar() {
  document.getElementById("modalAgregar").style.display = "none";
  location.reload(); // Esto recargará la página
}

// Eliminar usuario
function eliminarUsuario(id) {
  Swal.fire({
    title: "¿Estás seguro de que quieres eliminar este usuario?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/usuarios/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Si la eliminación fue exitosa, actualizar la tabla
            tablaUsuarios.setData("/usuarios");
            // Mostrar un mensaje de éxito
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire("Error", "Error al eliminar el usuario.", "error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar un mensaje de error
          Swal.fire(
            "Error en la red",
            "Error en la red al intentar eliminar el usuario.",
            "error"
          );
        });
    }
  });
}

// modificar

function abrirModalModificar(idUsuario) {
  // Llamar a una función que obtenga los datos del usuario por su ID
  obtenerUsuarioPorId(idUsuario)
    .then((usuario) => {
      // Rellenar los campos del formulario con los datos del usuario
      document.getElementById("nombre_usuario_modificar").value =
        usuario.nombre_usuario;
      document.getElementById("email_modificar").value = usuario.email;
      document.getElementById("rol_modificar").value = usuario.rol;
      document.getElementById("contrasena_modificar").value =
        usuario.contrasena;
      document.getElementById("id_modificar").value = usuario.id;
      // Mostrar el modal
      document.getElementById("modalModificar").style.display = "block";
    })
    .catch((error) => {
      console.error("Error al obtener los datos del usuario:", error);
      // Mostrar un mensaje de error si no se pudieron obtener los datos del usuario
      alert("Error al obtener los datos del usuario");
    });
}

function cerrarModalModificar() {
  // Ocultar el modal
  document.getElementById("modalModificar").style.display = "none";
}

async function obtenerUsuarioPorId(idUsuario) {
  try {
    const respuesta = await fetch(`/usuarios/${idUsuario}`);
    if (respuesta.ok) {
      const usuario = await respuesta.json();
      return usuario;
    } else {
      throw new Error("Error al obtener los datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error(
      "Error en la red al intentar obtener los datos del usuario"
    );
  }
}

async function modificarUsuario() {
  const id = document.getElementById("id_modificar").value;
  const nombre_usuario = document.getElementById(
    "nombre_usuario_modificar"
  ).value;
  const email = document.getElementById("email_modificar").value;
  const rol = document.getElementById("rol_modificar").value;
  const contrasena = document.getElementById("contrasena_modificar").value;

  try {
    const response = await fetch(`/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario: nombre_usuario,
        email: email,
        rol: rol,
        contrasena: contrasena,
      }),
    });

    if (response.ok) {
      // Si la modificación fue exitosa, actualizar la tabla y mostrar un mensaje de éxito
      tablaUsuarios.setData("/usuarios");
      Swal.fire("¡Éxito!", "Usuario modificado con éxito", "success");
    } else {
      // Si hubo un error, mostrar un mensaje de error
      Swal.fire("Error", "Error al modificar el usuario", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Si hubo un error de red, mostrar un mensaje de error
    Swal.fire(
      "Error en la red",
      "Error en la red al intentar modificar el usuario",
      "error"
    );
  }
}
