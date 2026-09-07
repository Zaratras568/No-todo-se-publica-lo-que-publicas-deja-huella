/* ============================================
   SIDEBAR — índice lateral del curso
   Depende de: estado.js, navegacion.js
   (abrirContenido/abrirTest se definen en
   contenido.js/quiz.js, pero solo se usan aquí
   dentro de callbacks, así que el orden no importa)
   ============================================ */

const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const btnMenuToggle = document.getElementById("btn-menu-toggle");

/* ===== Drawer del sidebar en móvil ===== */

btnMenuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("is-abierto");
  sidebarBackdrop.classList.toggle("is-visible");
});

sidebarBackdrop.addEventListener("click", () => {
  sidebar.classList.remove("is-abierto");
  sidebarBackdrop.classList.remove("is-visible");
});

function renderSidebar() {
  if (!estado.nombre) { sidebar.innerHTML = ""; return; }

  const vistaActualId = document.querySelector(".view.is-active")?.id;

  let html = `<button class="sidebar__panel-link" data-ir-panel><svg width="15" height="15"><use href="#i-bars"></use></svg>Panel principal</button>`;
  html += `<button class="sidebar__panel-link" data-ver-campana><svg width="15" height="15"><use href="#i-megaphone"></use></svg>Ver campaña</button>`;

  html += `<p class="sidebar__group-label">Antes de empezar</p>`;
  html += `<button class="sidebar__modulo-head ${vistaActualId === "view-bienvenida" ? "is-activo" : ""}" data-ir-bienvenida>
    <span class="sidebar__modulo-num ${estado.bienvenida.contenidoVisto ? "is-completado" : ""}">${estado.bienvenida.contenidoVisto ? '<svg width="11" height="11"><use href="#i-check"></use></svg>' : ""}</span>
    Bienvenida
  </button>`;

  html += `<p class="sidebar__group-label">Misiones</p>`;

  MODULOS.forEach((modulo, indice) => {
    const datos = estado.modulos[modulo.id];
    const bloqueado = !moduloDesbloqueado(indice);
    const testListo = testDesbloqueado(indice);
    const activo = !enEvaluacion && moduloActivo === indice;

    html += `<div class="sidebar__modulo ${bloqueado ? "is-bloqueado" : ""} ${datos.testAprobado ? "is-completado" : ""}">
      <button class="sidebar__modulo-head" data-ir-contenido="${indice}" ${bloqueado ? "disabled" : ""}>
        <span class="sidebar__modulo-num">${datos.testAprobado ? '<svg width="11" height="11"><use href="#i-check"></use></svg>' : indice + 1}</span>
        ${modulo.titulo}
      </button>
      <div class="sidebar__sub-list">
        <button class="sidebar__sub-item ${activo && vistaActualId === "view-contenido" ? "is-activo" : ""} ${datos.contenidoVisto ? "is-completado" : ""}" data-ir-contenido="${indice}" ${bloqueado ? "disabled" : ""}>
          <svg width="12" height="12"><use href="#i-play"></use></svg>Contenido
        </button>
        <button class="sidebar__sub-item ${activo && vistaActualId === "view-test" ? "is-activo" : ""} ${datos.testAprobado ? "is-completado" : ""}" data-ir-test="${indice}" ${testListo ? "" : "disabled"}>
          <svg width="12" height="12"><use href="#i-list"></use></svg>Test
        </button>
      </div>
    </div>`;
  });

  const todosCompletos = todosLosModulosCompletos();
  const evalActiva = enEvaluacion && vistaActualId === "view-test";
  const certActiva = vistaActualId === "view-certificado";

  html += `<div class="sidebar__closing">
    <button class="sidebar__modulo-head ${evalActiva ? "is-activo" : ""}" data-ir-vista="view-evaluacion" ${todosCompletos ? "" : "disabled"}>
      <span class="sidebar__modulo-num ${estado.evaluacionAprobada ? "is-completado" : ""}">${estado.evaluacionAprobada ? '<svg width="11" height="11"><use href="#i-check"></use></svg>' : todosCompletos ? "" : '<svg width="10" height="10"><use href="#i-lock"></use></svg>'}</span>
      Evaluación final
    </button>
    <button class="sidebar__modulo-head ${certActiva ? "is-activo" : ""}" data-ir-vista="view-certificado" ${estado.evaluacionAprobada ? "" : "disabled"}>
      <span class="sidebar__modulo-num ${estado.evaluacionAprobada ? "is-completado" : ""}">${estado.evaluacionAprobada ? '<svg width="11" height="11"><use href="#i-check"></use></svg>' : '<svg width="10" height="10"><use href="#i-lock"></use></svg>'}</span>
      Certificado
    </button>
  </div>`;

  sidebar.innerHTML = html;
}

sidebar.addEventListener("click", (e) => {
  const botonPanel = e.target.closest("[data-ir-panel]");
  if (botonPanel) return volverAlPanel();

  const botonCampana = e.target.closest("[data-ver-campana]");
  if (botonCampana) return abrirModalCampana();

  const botonBienvenida = e.target.closest("[data-ir-bienvenida]");
  if (botonBienvenida) return abrirBienvenida();

  const botonContenido = e.target.closest("[data-ir-contenido]");
  if (botonContenido && !botonContenido.disabled) return abrirContenido(Number(botonContenido.dataset.irContenido));

  const botonTest = e.target.closest("[data-ir-test]");
  if (botonTest && !botonTest.disabled) return abrirTest(Number(botonTest.dataset.irTest));

  const botonVista = e.target.closest("[data-ir-vista]");
  if (botonVista && !botonVista.disabled) {
    if (botonVista.dataset.irVista === "view-certificado") return abrirCertificado();
    return mostrarVista(botonVista.dataset.irVista);
  }
});
