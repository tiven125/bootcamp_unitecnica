async function registrarUsuario() {
  const nombre_usuario = document.getElementById("nombre_usuario").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;
  const rol = document.getElementById("rol").value;

  try {
    const response = await fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre_usuario, email, contrasena, rol }),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario registrado con éxito",
      });
    } else {
      const data = await response.json();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.mensaje,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Se ha producido un error al intentar registrar el usuario. Por favor, inténtalo de nuevo más tarde.",
    });
  }
}
