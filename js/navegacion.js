/* ============================================
   NAVEGACIÓN — mostrar/ocultar vistas
   Depende de: estado.js
   ============================================ */

const layout = document.getElementById("layout");

function mostrarVista(idVista) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  document.getElementById(idVista)?.classList.add("is-active");
  layout.classList.toggle("layout--sin-sidebar", idVista === "view-inicio");
  window.scrollTo({ top: 0, behavior: "auto" });

  // El drawer del sidebar (móvil) siempre se cierra al cambiar de vista,
  // sin importar cómo se llegó a la navegación.
  document.getElementById("sidebar")?.classList.remove("is-abierto");
  document.getElementById("sidebar-backdrop")?.classList.remove("is-visible");
}

function volverAlPanel() {
  moduloActivo = null;
  renderPanel();
  renderSidebar();
  mostrarVista("view-dashboard");
}

document.querySelectorAll("[data-back-dashboard]").forEach((b) => b.addEventListener("click", volverAlPanel));
