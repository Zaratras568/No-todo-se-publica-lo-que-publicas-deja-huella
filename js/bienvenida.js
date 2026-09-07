/* ============================================
   BIENVENIDA — sección introductoria antes del
   Módulo 1. El botón para pasar al Módulo 1 se
   habilita solo cuando el video de YouTube termina
   (ver youtube.js, que llama a marcarBienvenidaVista
   cuando detecta el estado ENDED).
   Depende de: estado.js, navegacion.js, sidebar.js,
   panel.js, contenido.js, youtube.js
   ============================================ */

const btnIrModulo1 = document.getElementById("btn-ir-modulo1");

function abrirBienvenida() {
  btnIrModulo1.disabled = !estado.bienvenida.contenidoVisto;
  mostrarVista("view-bienvenida");
  renderSidebar();
}

function marcarBienvenidaVista() {
  if (!estado.bienvenida.contenidoVisto) {
    estado.bienvenida.contenidoVisto = true;
    guardarEstado();
    renderPanel();
    renderSidebar();
  }
  btnIrModulo1.disabled = false;
}

btnIrModulo1.addEventListener("click", () => {
  if (estado.bienvenida.contenidoVisto) abrirContenido(0);
});

document.getElementById("card-bienvenida").addEventListener("click", abrirBienvenida);

function actualizarTarjetaBienvenida() {
  const card = document.getElementById("card-bienvenida");
  const boton = card.querySelector(".btn");
  card.classList.toggle("is-completada", estado.bienvenida.contenidoVisto);
  boton.textContent = estado.bienvenida.contenidoVisto ? "Repasar" : "Comenzar";
}
