/* ============================================
   QUIZ — preguntas centradas, navegación libre
   y cálculo de resultado con máximo de intentos
   Depende de: estado.js, navegacion.js, sidebar.js, contenido.js
   ============================================ */

const quizDots = document.getElementById("quiz-dots");
const quizCard = document.getElementById("quiz-card");
const btnAnterior = document.getElementById("btn-pregunta-anterior");
const btnSiguiente = document.getElementById("btn-pregunta-siguiente");
const btnFinalizar = document.getElementById("btn-finalizar-test");
const quizNav = document.getElementById("quiz-nav");
const intentoLabel = document.getElementById("intento-label");

function abrirTest(indice) {
  if (!testDesbloqueado(indice)) return;
  moduloActivo = indice;
  const modulo = MODULOS[indice];
  const datos = estado.modulos[modulo.id];

  document.getElementById("test-kicker").textContent = `Misión 0${indice + 1} · Test`;
  intentoLabel.textContent = `Intento ${Math.min(datos.intentos + 1, INTENTOS_MAXIMOS)} de ${INTENTOS_MAXIMOS}`;

  testState = { respuestas: new Array(modulo.preguntas.length).fill(null), indiceActual: 0 };
  quizNav.style.display = "flex";
  renderPregunta();
  renderSidebar();
  mostrarVista("view-test");
}

function renderDots() {
  const modulo = MODULOS[moduloActivo];
  quizDots.innerHTML = modulo.preguntas
    .map((_, i) => {
      const clases = ["quiz__dot"];
      if (i === testState.indiceActual) clases.push("is-actual");
      if (testState.respuestas[i] !== null) clases.push("is-respondida");
      return `<button class="${clases.join(" ")}" data-ir-pregunta="${i}">${i + 1}</button>`;
    })
    .join("");
}

function renderPregunta() {
  const modulo = MODULOS[moduloActivo];
  const i = testState.indiceActual;
  const pregunta = modulo.preguntas[i];
  const seleccion = testState.respuestas[i];

  renderDots();

  quizCard.innerHTML = `
    <p class="quiz__pregunta">${pregunta.pregunta}</p>
    <div class="quiz__opciones">
      ${pregunta.opciones
        .map(
          (opcion, j) => `
        <button class="quiz__opcion ${seleccion === j ? "is-seleccionada" : ""}" data-opcion="${j}">
          <span class="quiz__opcion-marca"></span>${opcion}
        </button>`
        )
        .join("")}
    </div>
  `;

  btnAnterior.disabled = i === 0;
  btnSiguiente.disabled = i === modulo.preguntas.length - 1;
  btnFinalizar.disabled = testState.respuestas.some((r) => r === null);
}

quizDots.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-ir-pregunta]");
  if (!boton) return;
  testState.indiceActual = Number(boton.dataset.irPregunta);
  renderPregunta();
});

quizCard.addEventListener("click", (e) => {
  const opcion = e.target.closest("[data-opcion]");
  if (!opcion) return;
  testState.respuestas[testState.indiceActual] = Number(opcion.dataset.opcion);
  renderPregunta();
});

btnAnterior.addEventListener("click", () => {
  if (testState.indiceActual > 0) { testState.indiceActual--; renderPregunta(); }
});
btnSiguiente.addEventListener("click", () => {
  const modulo = MODULOS[moduloActivo];
  if (testState.indiceActual < modulo.preguntas.length - 1) { testState.indiceActual++; renderPregunta(); }
});

document.getElementById("btn-volver-test").addEventListener("click", () => abrirContenido(moduloActivo));

btnFinalizar.addEventListener("click", () => {
  quizNav.style.display = "none";
  quizDots.innerHTML = "";
  quizCard.innerHTML = `<div class="spinner"></div><p class="spinner-text">Calculando resultados…</p>`;

  setTimeout(calcularResultado, 1200);
});

function calcularResultado() {
  const modulo = MODULOS[moduloActivo];
  const datos = estado.modulos[modulo.id];
  const indiceModulo = moduloActivo;

  const correctas = modulo.preguntas.filter((p, i) => testState.respuestas[i] === p.correcta).length;
  const puntaje = correctas / modulo.preguntas.length;
  const aprobado = puntaje >= PORCENTAJE_APROBACION;

  datos.intentos += 1;
  datos.mejorPuntaje = Math.max(datos.mejorPuntaje, puntaje);
  if (aprobado) datos.testAprobado = true;
  guardarEstado();

  // El progreso se refleja de inmediato al aprobar, no cuando el usuario
  // decide volver al panel — así no depende de que dé ese clic.
  renderPanel();
  renderSidebar();

  const intentosRestantes = INTENTOS_MAXIMOS - datos.intentos;
  const puedeReintentar = !aprobado && intentosRestantes > 0;
  const haySiguiente = aprobado && indiceModulo < MODULOS.length - 1;
  const evaluacionDisponible = aprobado && !haySiguiente && todosLosModulosCompletos();

  let accionPrincipal = "";
  if (haySiguiente) {
    accionPrincipal = `<button class="btn btn--primary" data-siguiente>Continuar a la siguiente misión</button>`;
  } else if (evaluacionDisponible) {
    accionPrincipal = `<button class="btn btn--primary" data-ir-evaluacion>Ir a la evaluación final</button>`;
  } else if (puedeReintentar) {
    accionPrincipal = `<button class="btn btn--primary" data-reintentar>Reintentar test</button>`;
  }

  quizCard.innerHTML = `
    <div class="resultado__icono ${aprobado ? "es-aprobado" : "es-reprobado"}">
      <svg width="26" height="26"><use href="#${aprobado ? "i-check" : "i-x"}"></use></svg>
    </div>
    <h3 class="resultado__titulo">${aprobado ? "¡Aprobado!" : "Necesitas repasar un poco más"}</h3>
    <p class="resultado__puntaje">${correctas} de ${modulo.preguntas.length} correctas (${Math.round(puntaje * 100)}%)</p>
    <p class="resultado__intentos">${aprobado ? `Misión completada` : puedeReintentar ? `Te quedan ${intentosRestantes} intento(s) de ${INTENTOS_MAXIMOS}` : `Alcanzaste el máximo de ${INTENTOS_MAXIMOS} intentos. Contacta a tu profesor para más intentos.`}</p>
    <div class="resultado__acciones">
      <button class="btn btn--ghost" data-volver-panel>Volver al panel</button>
      ${accionPrincipal}
    </div>
  `;

  quizCard.querySelector("[data-volver-panel]").addEventListener("click", volverAlPanel);
  quizCard.querySelector("[data-siguiente]")?.addEventListener("click", () => abrirContenido(indiceModulo + 1));
  quizCard.querySelector("[data-ir-evaluacion]")?.addEventListener("click", () => mostrarVista("view-evaluacion"));
  quizCard.querySelector("[data-reintentar]")?.addEventListener("click", () => abrirTest(indiceModulo));
}
