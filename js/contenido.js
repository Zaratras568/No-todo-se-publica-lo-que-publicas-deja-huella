/* ============================================
   CONTENIDO — vista de video de un módulo
   Todos los módulos ya tienen su video real de
   YouTube (youtubeId en datos.js) — ya no existe
   respaldo manual. Cada vez que se abre un módulo
   se crea un reproductor nuevo (ver youtube.js) para
   evitar que el video se quede en negro al repasar.
   El botón "Ir al test" se habilita cuando el video
   termina (marcarContenidoVisto, llamado desde
   youtube.js al detectar el estado ENDED).
   Depende de: estado.js, navegacion.js, sidebar.js, youtube.js
   ============================================ */

let playerContenido = null;

const btnIrTest = document.getElementById("btn-ir-test");
const videoCheckDone = document.getElementById("video-check-done");

function abrirContenido(indice) {
  if (!moduloDesbloqueado(indice)) return;
  moduloActivo = indice;
  const modulo = MODULOS[indice];
  const datos = estado.modulos[modulo.id];

  document.getElementById("contenido-kicker").textContent = `Misión 0${indice + 1} de ${MODULOS.length} · Contenido`;
  document.getElementById("contenido-titulo").textContent = modulo.titulo;
  document.getElementById("contenido-lede").textContent = modulo.resumen;

  crearPlayerCuandoListo(
    "yt-contenido-container",
    modulo.youtubeId,
    marcarContenidoVisto,
    (player) => { playerContenido = player; }
  );

  videoCheckDone.hidden = !datos.contenidoVisto;
  btnIrTest.disabled = !datos.contenidoVisto;
  btnIrTest.textContent = "Ir al test";

  mostrarVista("view-contenido");
  renderSidebar();
}

function marcarContenidoVisto() {
  if (moduloActivo === null) return;
  const modulo = MODULOS[moduloActivo];
  if (estado.modulos[modulo.id].contenidoVisto) return;
  estado.modulos[modulo.id].contenidoVisto = true;
  guardarEstado();
  renderPanel();
  renderSidebar();
  videoCheckDone.hidden = false;
  btnIrTest.disabled = false;
}

document.getElementById("btn-volver-contenido").addEventListener("click", volverAlPanel);
btnIrTest.addEventListener("click", () => { if (moduloActivo !== null) abrirTest(moduloActivo); });
