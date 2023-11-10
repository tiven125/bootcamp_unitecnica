document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // Obtener los valores de los campos de entrada del formulario
    const nombreUsuario = event.target.elements.nombreUsuario.value;
    const contrasena = event.target.elements.contrasena.value;

    // Enviar una solicitud de inicio de sesión al servidor
    fetch("/iniciar-sesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombreUsuario, contrasena }),
    })
      .then(async (response) => {
        console.log("Respuesta del servidor:", response);

        if (response.ok) {
          // Si la respuesta del servidor es exitosa, obtener los datos de la respuesta
          const data = await response.json();
          console.log("Datos de la respuesta:", data);

          // Redirigir al usuario a la página correspondiente basándote en su rol
          if (data.data.rol === "administrador") {
            sessionStorage.setItem("nombreUsuario", data.data.nombreUsuario);
            window.location.href = "/admin"; // Ruta para administradores
          } else if (data.data.rol === "recolector") {
            sessionStorage.setItem("nombreUsuario", data.data.nombreUsuario);
            window.location.href = "/cafetero"; // Ruta para recolectores
          } else {
            console.log("Rol desconocido:", data.data.rol);
          }
        } else {
          // Si la respuesta del servidor no es exitosa, mostrar un mensaje de error
          return response.json().then((data) => {
            console.log("Error en la respuesta:", data);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.mensaje,
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Se ha producido un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
        });
      });
  });
