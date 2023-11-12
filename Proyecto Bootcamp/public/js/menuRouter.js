const irGestionUsuarios = document.querySelector("#irGestionUsuarios");
irGestionUsuarios.addEventListener("click", () => {
  location.href = "/usuarios/gestion-usuarios";
});

const irGestionRecolectores = document.querySelector("#irGestionRecolectores");
irGestionRecolectores.addEventListener("click", () => {
  location.href = "/recolector/gestion-recolector";
});
