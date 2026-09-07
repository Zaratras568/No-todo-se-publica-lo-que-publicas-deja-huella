/* ============================================
   YOUTUBE — carga la API de YouTube (IFrame Player
   API) y crea los dos reproductores que usa el
   curso: uno para Bienvenida y uno reutilizable
   para el contenido de cualquier módulo. Detectar
   cuándo termina un video (para habilitar el botón
   de continuar) solo es posible con esta API, no
   con un <iframe> simple.

   bienvenida.js y contenido.js definen las
   funciones marcarBienvenidaVista() y
   marcarContenidoVisto() — este archivo las llama
   cuando el video correspondiente termina.

   Depende de: datos.js (BIENVENIDA_YOUTUBE_ID, MODULOS)
   ============================================ */

let ytApiListo = false;
let playerBienvenida = null;
let playerContenido = null;
let pendingContenidoVideoId = null;

// La API de YouTube busca esta función global exacta cuando termina de cargar.
function onYouTubeIframeAPIReady() {
  ytApiListo = true;

  playerBienvenida = new YT.Player("yt-bienvenida", {
    videoId: BIENVENIDA_YOUTUBE_ID,
    playerVars: { rel: 0, modestbranding: 1 },
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED && typeof marcarBienvenidaVista === "function") {
          marcarBienvenidaVista();
        }
      },
    },
  });

  const primerVideoDisponible = MODULOS.find((m) => m.youtubeId)?.youtubeId || "";
  playerContenido = new YT.Player("yt-contenido", {
    videoId: pendingContenidoVideoId || primerVideoDisponible,
    playerVars: { rel: 0, modestbranding: 1 },
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED && typeof marcarContenidoVisto === "function") {
          marcarContenidoVisto();
        }
      },
    },
  });

  if (pendingContenidoVideoId) pendingContenidoVideoId = null;
}
