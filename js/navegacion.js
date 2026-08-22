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
}

function volverAlPanel() {
  moduloActivo = null;
  renderPanel();
  renderSidebar();
  mostrarVista("view-dashboard");
}

document.querySelectorAll("[data-back-dashboard]").forEach((b) => b.addEventListener("click", volverAlPanel));
