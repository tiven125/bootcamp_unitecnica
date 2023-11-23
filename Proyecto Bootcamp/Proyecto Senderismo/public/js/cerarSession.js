document.getElementById("mostrarNombre").innerText =
  sessionStorage.getItem("nombreUsuario");

// Botones del menu

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      fetch("/cerrar-sesion", { method: "GET" })
        .then((response) => {
          if (response.ok) {
            // Si la solicitud fue exitosa, mostrar una alerta de éxito y redirigir al usuario
            sessionStorage.removeItem("nombreUsuario");
            sessionStorage.clear();

            Swal.fire({
              icon: "success",
              title: "Sesión cerrada",
              text: "Has cerrado la sesión correctamente",
            }).then(() => {
              window.location.href = "/";
            });
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          // Si hubo un error de red, mostrar una alerta de error
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error en la red al intentar cerrar la sesión",
          });
        });
    });
});
