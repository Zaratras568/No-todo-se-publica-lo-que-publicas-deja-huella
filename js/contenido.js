/* ============================================
   CONTENIDO — vista de video/contenido de un módulo
   Depende de: estado.js, navegacion.js, sidebar.js
   ============================================ */

const btnIrTest = document.getElementById("btn-ir-test");
const btnMarcarVisto = document.getElementById("btn-marcar-visto");
const videoCheckDone = document.getElementById("video-check-done");

function abrirContenido(indice) {
  if (!moduloDesbloqueado(indice)) return;
  moduloActivo = indice;
  const modulo = MODULOS[indice];
  const datos = estado.modulos[modulo.id];

  document.getElementById("contenido-kicker").textContent = `Misión 0${indice + 1} de ${MODULOS.length} · Contenido`;
  document.getElementById("contenido-titulo").textContent = modulo.titulo;
  document.getElementById("contenido-lede").textContent = modulo.resumen;

  btnMarcarVisto.hidden = datos.contenidoVisto;
  videoCheckDone.hidden = !datos.contenidoVisto;
  btnIrTest.disabled = !datos.contenidoVisto;
  btnIrTest.textContent = "Ir al test";

  mostrarVista("view-contenido");
  renderSidebar();
}
btnMarcarVisto.addEventListener("click", () => {
  if (moduloActivo === null) return;
  const modulo = MODULOS[moduloActivo];
  estado.modulos[modulo.id].contenidoVisto = true;
  guardarEstado();
  btnMarcarVisto.hidden = true;
  videoCheckDone.hidden = false;
  btnIrTest.disabled = false;
  renderSidebar();
});

document.getElementById("btn-volver-contenido").addEventListener("click", volverAlPanel);
btnIrTest.addEventListener("click", () => { if (moduloActivo !== null) abrirTest(moduloActivo); });
