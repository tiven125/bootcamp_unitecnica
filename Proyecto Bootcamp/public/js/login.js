document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // Obtener los valores de los campos de entrada del formulario
    const nombreUsuario = event.target.elements.UsernameLogin.value;
    const contrasena = event.target.elements.passwordLogin.value;

    // Enviar una solicitud de inicio de sesión al servidor
    fetch("/iniciar-sesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombreUsuario, contrasena }),
    })
      .then((response) => {
        if (response.ok) {
          // Si la respuesta del servidor es exitosa, redirigir al usuario a la página de inicio
          window.location.href = "otros/inicio";
        } else {
          // Si la respuesta del servidor no es exitosa, mostrar un mensaje de error
          return response.json().then((data) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.mensaje,
            });
          });
        }
      })
      .catch((error) => {
        // Manejar errores en la solicitud
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Se ha producido un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
        });
      });
  });
