document
  .getElementById("registroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreUsuario = document.getElementsByName("nombreUsuario")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const contrasena = document.getElementsByName("contrasena")[0].value;

    fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombreUsuario, email, contrasena }),
    })
      .then((response) =>
        response.json().then((data) => ({ status: response.status, data }))
      )
      .then(({ status, data }) => {
        if (status === 201) {
          // Mostrar un mensaje de éxito
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Usuario registrado con éxito",
          });
        } else {
          // Mostrar un mensaje de error
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.mensaje,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
