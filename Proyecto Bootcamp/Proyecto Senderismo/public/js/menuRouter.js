const irGestionUsuarios = document.querySelector("#irGestionUsuarios");
irGestionUsuarios.addEventListener("click", () => {
  location.href = "/usuarios/gestion-usuarios";
});

const irGestionRutas = document.querySelector("#irGestionRutas");
irGestionRutas.addEventListener("click", () => {
  location.href = "/gestion-rutas";
});

const irGestionTestimonios = document.querySelector("#irGestionTestimonios");
irGestionTestimonios.addEventListener("click", () => {
  location.href = "/gestionar-testimonios";
});
