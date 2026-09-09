/* ============================================
   YOUTUBE — utilidades para crear reproductores
   de YouTube (IFrame Player API).

   IMPORTANTE: cada vez que se abre un video se crea
   un reproductor NUEVO dentro de su contenedor (en
   vez de reutilizar uno ya existente con
   loadVideoById). Reutilizar el mismo iframe después
   de que su contenedor estuvo oculto (al cambiar de
   vista) hace que YouTube lo muestre en negro sin
   reproducir — crear uno nuevo cada vez evita ese bug.

   bienvenida.js y contenido.js llaman a
   crearPlayerCuandoListo() con el contenedor, el id
   del video de YouTube, y qué hacer cuando termine.

   Depende de: datos.js (solo para que MODULOS ya
   exista si algo lo necesita al cargar)
   ============================================ */

let ytApiListo = false;

// La API de YouTube busca esta función global exacta cuando termina de cargar.
function onYouTubeIframeAPIReady() {
  ytApiListo = true;
}

// Vacía el contenedor y crea un reproductor nuevo dentro de un div fresco.
function crearPlayerEnContenedor(idContenedor, videoId, onTermina) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "";
  const destino = document.createElement("div");
  contenedor.appendChild(destino);

  return new YT.Player(destino, {
    videoId,
    playerVars: { rel: 0, modestbranding: 1 },
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) onTermina();
      },
    },
  });
}

// Si la API todavía no cargó (poco probable, pero puede pasar justo al
// entrar a la página), espera a que esté lista antes de crear el reproductor.
function crearPlayerCuandoListo(idContenedor, videoId, onTermina, asignarPlayer) {
  if (ytApiListo) {
    asignarPlayer(crearPlayerEnContenedor(idContenedor, videoId, onTermina));
    return;
  }
  const intervalo = setInterval(() => {
    if (ytApiListo) {
      clearInterval(intervalo);
      asignarPlayer(crearPlayerEnContenedor(idContenedor, videoId, onTermina));
    }
  }, 150);
}
