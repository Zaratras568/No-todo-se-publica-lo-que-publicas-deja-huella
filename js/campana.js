/* ============================================
   CAMPAÑA — ventana emergente con la infografía
   "No Todo Se Comparte". Se muestra sola una vez
   (al entrar al panel por primera vez en este
   navegador) y luego queda disponible mediante un
   botón para verla cuando el usuario quiera.
   Depende de: estado.js
   ============================================ */

const CLAVE_CAMPANA_VISTA = "ntsc_campana_vista";

const modalCampana = document.getElementById("campana-modal");
const btnCerrarCampana = document.getElementById("btn-cerrar-campana");
const btnVerCampana = document.getElementById("btn-ver-campana");

function abrirModalCampana() {
  modalCampana.hidden = false;
  requestAnimationFrame(() => modalCampana.classList.add("is-visible"));
}

function cerrarModalCampana() {
  modalCampana.classList.remove("is-visible");
  setTimeout(() => { modalCampana.hidden = true; }, 200);
}

btnVerCampana.addEventListener("click", abrirModalCampana);
btnCerrarCampana.addEventListener("click", cerrarModalCampana);
modalCampana.addEventListener("click", (e) => {
  if (e.target === modalCampana) cerrarModalCampana();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalCampana.hidden) cerrarModalCampana();
});

// Se muestra sola la primera vez que el usuario entra al panel,
// y nunca más después de eso (se recuerda en este navegador).
function mostrarCampanaSiEsPrimeraVez() {
  if (!localStorage.getItem(CLAVE_CAMPANA_VISTA)) {
    abrirModalCampana();
    localStorage.setItem(CLAVE_CAMPANA_VISTA, "1");
  }
}
