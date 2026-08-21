/* ============================================
   NO TODO SE COMPARTE — lógica del curso
   Todo el estado vive en localStorage del
   navegador. No hay servidor ni base de datos.
   ============================================ */

const CLAVE_ESTADO = "ntsc_estado";

const MODULOS = [
  { id: "modulo1", titulo: "Huella digital", duracion: "8 min", nivel: "Fácil" },
  { id: "modulo2", titulo: "Privacidad", duracion: "10 min", nivel: "Fácil" },
  { id: "modulo3", titulo: "Ciberacoso", duracion: "9 min", nivel: "Medio" },
  { id: "modulo4", titulo: "Desinformación", duracion: "9 min", nivel: "Medio" },
  { id: "modulo5", titulo: "Bienestar digital", duracion: "7 min", nivel: "Fácil" },
  { id: "modulo6", titulo: "Uso responsable", duracion: "8 min", nivel: "Medio" },
];

function estadoPorDefecto() {
  return {
    nombre: "",
    progreso: Object.fromEntries(MODULOS.map((m) => [m.id, false])),
    evaluacionAprobada: false,
  };
}

function cargarEstado() {
  try {
    const guardado = localStorage.getItem(CLAVE_ESTADO);
    if (!guardado) return estadoPorDefecto();
    return { ...estadoPorDefecto(), ...JSON.parse(guardado) };
  } catch {
    return estadoPorDefecto();
  }
}

function guardarEstado(estado) {
  localStorage.setItem(CLAVE_ESTADO, JSON.stringify(estado));
}

let estado = cargarEstado();

/* ===== Utilidades de progreso ===== */

function moduloDesbloqueado(indice) {
  if (indice === 0) return true;
  const anterior = MODULOS[indice - 1];
  return estado.progreso[anterior.id];
}

function todosLosModulosCompletos() {
  return MODULOS.every((m) => estado.progreso[m.id]);
}

function contarCompletados() {
  return MODULOS.filter((m) => estado.progreso[m.id]).length;
}

function iniciales(nombre) {
  const partes = nombre.trim().split(/\s+/).slice(0, 2);
  return partes.map((p) => p[0]?.toUpperCase() || "").join("") || "--";
}

/* ===== Navegación entre vistas ===== */

function mostrarVista(idVista) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  document.getElementById(idVista)?.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "auto" });
}

document.getElementById("main").addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".mission-card:not(.is-bloqueada)");
  if (tarjeta && !e.target.closest("button[disabled]")) {
    mostrarVista(tarjeta.dataset.target);
  }

  const volver = e.target.closest("[data-back]");
  if (volver) {
    mostrarVista("view-dashboard");
  }

  const completar = e.target.closest("[data-complete]");
  if (completar) {
    const modulo = completar.dataset.complete;
    estado.progreso[modulo] = true;
    guardarEstado(estado);
    renderPanel();
    mostrarVista("view-dashboard");
  }
});

/* ===== Nombre del participante ===== */

const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("input-nombre");
const userPill = document.getElementById("user-pill");
const avatarIniciales = document.getElementById("avatar-iniciales");
const nivelLabel = document.getElementById("nivel-label");
const saludoPanel = document.getElementById("saludo-panel");

function actualizarIdentidad() {
  if (!estado.nombre) return;
  userPill.hidden = false;
  avatarIniciales.textContent = iniciales(estado.nombre);
  const completados = contarCompletados();
  const xp = completados * 100 + (estado.evaluacionAprobada ? 200 : 0);
  const nivel = 1 + Math.floor(xp / 200);
  nivelLabel.textContent = `Nivel ${nivel} · ${xp} XP`;
  saludoPanel.textContent = `Hola, ${estado.nombre.split(" ")[0]}`;
}

formNombre.addEventListener("submit", (e) => {
  e.preventDefault();
  estado.nombre = inputNombre.value.trim();
  guardarEstado(estado);
  actualizarIdentidad();
  renderPanel();
  mostrarVista("view-dashboard");
});

/* ===== Render del panel de misiones ===== */

const missionGrid = document.getElementById("mission-grid");

function renderPanel() {
  missionGrid.innerHTML = "";

  MODULOS.forEach((modulo, indice) => {
    const completada = estado.progreso[modulo.id];
    const desbloqueada = moduloDesbloqueado(indice);

    const card = document.createElement("article");
    card.className = "mission-card";
    card.dataset.target = `view-modulo-${indice + 1}`;
    if (!desbloqueada) card.classList.add("is-bloqueada");
    if (completada) card.classList.add("is-completada");

    const icono = completada ? "i-check" : desbloqueada ? "i-shield" : "i-lock";
    const boton = completada
      ? `<span class="btn btn--ghost" style="width:100%;pointer-events:none;">Repasar</span>`
      : desbloqueada
        ? `<span class="btn btn--primary" style="width:100%;pointer-events:none;">Comenzar</span>`
        : `<span class="btn btn--locked">Bloqueada</span>`;

    card.innerHTML = `
      <div class="mission-card__icon"><svg width="18" height="18"><use href="#${icono}"></use></svg></div>
      <p class="mission-card__eyebrow">Misión 0${indice + 1}</p>
      <h3 class="mission-card__title">${modulo.titulo}</h3>
      <div class="mission-card__meta">
        <span><svg width="13" height="13"><use href="#i-clock"></use></svg>${modulo.duracion}</span>
        <span><svg width="13" height="13"><use href="#i-bars"></use></svg>${modulo.nivel}</span>
      </div>
      ${boton}
    `;
    missionGrid.appendChild(card);
  });

  const completados = contarCompletados();
  document.getElementById("progreso-texto").textContent = `${completados} de ${MODULOS.length} misiones completadas`;
  document.getElementById("progreso-fill").style.width = `${(completados / MODULOS.length) * 100}%`;

  const todosCompletos = todosLosModulosCompletos();
  const cardEval = document.getElementById("card-evaluacion");
  const cardCert = document.getElementById("card-certificado");

  cardEval.classList.toggle("is-bloqueada", !todosCompletos);
  document.getElementById("eval-mensaje-card").textContent = todosCompletos
    ? "Todas las misiones están completas. ¡Ya puedes rendirla!"
    : "Completa las 6 misiones para desbloquearla.";
  document.getElementById("eval-mensaje").textContent = todosCompletos
    ? "Todas las misiones están completas. Puedes rendir la evaluación final."
    : "Completa las 6 misiones para desbloquear la evaluación.";
  const botonEval = cardEval.querySelector(".btn");
  botonEval.className = todosCompletos ? "btn btn--primary" : "btn btn--locked";
  botonEval.textContent = todosCompletos ? "Comenzar" : "Bloqueada";
  botonEval.style.width = "100%";

  cardCert.classList.toggle("is-bloqueada", !estado.evaluacionAprobada);
  document.getElementById("cert-mensaje-card").textContent = estado.evaluacionAprobada
    ? "Tu certificado está listo para generarse."
    : "Aprueba la evaluación para desbloquearlo.";
  document.getElementById("cert-mensaje").textContent = estado.evaluacionAprobada
    ? `Certificado listo para generarse a nombre de ${estado.nombre || "—"}.`
    : "Aprueba la evaluación final para desbloquear tu certificado.";
  const botonCert = cardCert.querySelector(".btn");
  botonCert.className = estado.evaluacionAprobada ? "btn btn--primary" : "btn btn--locked";
  botonCert.textContent = estado.evaluacionAprobada ? "Ver certificado" : "Bloqueado";
  botonCert.style.width = "100%";

  actualizarIdentidad();
}

/* ===== Inicialización ===== */

if (estado.nombre) {
  inputNombre.value = estado.nombre;
}
renderPanel();
mostrarVista(estado.nombre ? "view-dashboard" : "view-inicio");
