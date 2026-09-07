/* ============================================
   CONTENIDO — vista de video de un módulo
   Cada módulo indica en datos.js su youtubeId (o
   null si aún no tiene video). Si lo tiene, se
   reutiliza el mismo reproductor de YouTube
   (playerContenido, creado en youtube.js) cambiando
   el video con loadVideoById(); el botón "Ir al
   test" se habilita cuando youtube.js detecta que
   terminó (llama a marcarContenidoVisto()). Si el
   módulo todavía no tiene video, se muestra el
   espacio de relleno con el botón manual de respaldo.
   Depende de: estado.js, navegacion.js, sidebar.js, youtube.js
   ============================================ */

const btnIrTest = document.getElementById("btn-ir-test");
const videoCheckDone = document.getElementById("video-check-done");
const contenidoPlaceholder = document.getElementById("contenido-placeholder");
const contenidoVideoWrap = document.getElementById("contenido-video-wrap");
const btnMarcarVistoWrap = document.getElementById("contenido-marcar-visto-wrap");
const btnMarcarVisto = document.getElementById("btn-marcar-visto");

function abrirContenido(indice) {
  if (!moduloDesbloqueado(indice)) return;
  moduloActivo = indice;
  const modulo = MODULOS[indice];
  const datos = estado.modulos[modulo.id];

  document.getElementById("contenido-kicker").textContent = `Misión 0${indice + 1} de ${MODULOS.length} · Contenido`;
  document.getElementById("contenido-titulo").textContent = modulo.titulo;
  document.getElementById("contenido-lede").textContent = modulo.resumen;

  if (modulo.youtubeId) {
    contenidoPlaceholder.hidden = true;
    btnMarcarVistoWrap.hidden = true;
    contenidoVideoWrap.hidden = false;

    if (playerContenido && playerContenido.loadVideoById) {
      playerContenido.loadVideoById(modulo.youtubeId);
    } else {
      // La API de YouTube todavía no terminó de cargar — se carga
      // este video en cuanto esté lista (ver youtube.js).
      pendingContenidoVideoId = modulo.youtubeId;
    }
  } else {
    contenidoVideoWrap.hidden = true;
    contenidoPlaceholder.hidden = false;
    btnMarcarVistoWrap.hidden = datos.contenidoVisto;
  }

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

btnMarcarVisto.addEventListener("click", () => {
  marcarContenidoVisto();
  btnMarcarVistoWrap.hidden = true;
});

document.getElementById("btn-volver-contenido").addEventListener("click", volverAlPanel);
btnIrTest.addEventListener("click", () => { if (moduloActivo !== null) abrirTest(moduloActivo); });
