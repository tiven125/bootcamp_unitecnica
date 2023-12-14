function enviarCorreo() {
  // Obtener datos del formulario
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const rutaSeleccionada = document.getElementById("selectRutas").value;

  // Validar que se haya seleccionado una ruta
  if (rutaSeleccionada === "Selecciona la ruta") {
    alert("Por favor, selecciona una ruta.");
    return;
  }

  // Crear objeto con datos a enviar
  const datosCorreo = {
    nombre,
    correo,
    ruta: rutaSeleccionada,
  };

  // Hacer la solicitud para enviar el correo
  fetch("/enviar-correo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosCorreo),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensaje);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      alert(
        "Error al enviar el correo. Por favor, inténtalo de nuevo más tarde."
      );
    });
}

// Obtener los datos de las rutas desde la API
fetch("/rutas")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Iterar sobre los datos y agregar opciones al select
    data.forEach((ruta) => {
      const option = document.createElement("option");
      option.value = ruta.id; // Asignar el valor del ID de la ruta
      option.text = ruta.nombre; // Asignar el nombre de la ruta como texto
      selectRutas.appendChild(option);
    });

    construirRutas(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(
      "Error al obtener datos de rutas. Por favor, inténtalo de nuevo más tarde."
    );
  });
