/* ============================================
   IDENTIDAD — nombre del participante, menú
   desplegable del avatar y salir de la sesión
   Depende de: estado.js, navegacion.js, sidebar.js, panel.js
   ============================================ */

const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("input-nombre");
const userPill = document.getElementById("user-pill");
const userTrigger = document.getElementById("btn-user-trigger");
const avatarIniciales = document.getElementById("avatar-iniciales");
const nivelLabel = document.getElementById("nivel-label");
const dropdownNombre = document.getElementById("dropdown-nombre");
const dropdownNivel = document.getElementById("dropdown-nivel");
const saludoPanel = document.getElementById("saludo-panel");
const btnSalir = document.getElementById("btn-salir");

function actualizarIdentidad() {
  if (!estado.nombre) return;
  userPill.hidden = false;
  avatarIniciales.textContent = iniciales(estado.nombre);

  const completados = contarCompletados();
  const xp = completados * 100 + (estado.evaluacionAprobada ? 200 : 0);
  const nivel = 1 + Math.floor(xp / 200);
  const nivelTexto = `Nivel ${nivel} · ${xp} XP`;

  nivelLabel.textContent = nivelTexto;
  dropdownNombre.textContent = estado.nombre;
  dropdownNivel.textContent = nivelTexto;
  saludoPanel.textContent = `Hola, ${estado.nombre.split(" ")[0]}`;
}

formNombre.addEventListener("submit", (e) => {
  e.preventDefault();
  estado.nombre = inputNombre.value.trim();
  guardarEstado();
  actualizarIdentidad();
  renderPanel();
  renderSidebar();
  mostrarVista("view-dashboard");
});

/* ===== Menú desplegable del avatar ===== */

userTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  const abierto = userPill.classList.toggle("is-abierto");
  userTrigger.setAttribute("aria-expanded", String(abierto));
});

document.addEventListener("click", (e) => {
  if (!userPill.contains(e.target)) userPill.classList.remove("is-abierto");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") userPill.classList.remove("is-abierto");
});

/* ===== Salir de la sesión (borra el progreso de este navegador) ===== */

btnSalir.addEventListener("click", () => {
  const confirmado = window.confirm(
    "¿Seguro que quieres salir? Se eliminará todo tu progreso guardado en este navegador (nombre, misiones y resultados) y no se podrá recuperar."
  );
  if (!confirmado) return;

  localStorage.removeItem(CLAVE_ESTADO);
  estado = estadoPorDefecto();
  moduloActivo = null;
  testState = { respuestas: [], indiceActual: 0 };

  inputNombre.value = "";
  avatarIniciales.textContent = "--";
  nivelLabel.textContent = "Nivel 1 · 0 XP";
  dropdownNombre.textContent = "—";
  dropdownNivel.textContent = "Nivel 1 · 0 XP";
  userPill.hidden = true;
  userPill.classList.remove("is-abierto");
  sidebar.innerHTML = "";

  mostrarVista("view-inicio");
});
