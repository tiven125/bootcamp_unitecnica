document.addEventListener("DOMContentLoaded", () => {
  const formTestimonio = document.getElementById("form-testimonio");

  formTestimonio.addEventListener("submit", async (event) => {
    event.preventDefault();

    const autor = document.getElementById("autor").value;
    const contenido = document.getElementById("contenido").value;
    const imagen = document.getElementById("imagen").value;

    if (!autor || !contenido) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    const respuesta = await fetch("/testimonio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ autor, contenido, imagen }),
    });

    if (respuesta.ok) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Testimonio creado con éxito.",
      }).then(() => {
        // Redirigir a la página de inicio
        window.location.href = "/index"; // Cambia esto según tu estructura de carpetas y nombres de archivo
      });
      formTestimonio.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear testimonio.",
      });
    }
  });
});
