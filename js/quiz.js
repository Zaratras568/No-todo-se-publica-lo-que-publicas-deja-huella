/* ============================================
   QUIZ — preguntas centradas, navegación libre
   y cálculo de resultado con máximo de intentos.
   Sirve tanto para el test de un módulo como para
   la evaluación final (controlado por enEvaluacion).

   IMPORTANTE: un test ya aprobado NUNCA se reinicia
   solo al volver a entrar — se muestra un resumen
   con el resultado guardado y botones para continuar
   o, si el usuario lo pide explícitamente, repetirlo.

   Depende de: estado.js, navegacion.js, sidebar.js, contenido.js
   ============================================ */

const quizDots = document.getElementById("quiz-dots");
const quizCard = document.getElementById("quiz-card");
const btnAnterior = document.getElementById("btn-pregunta-anterior");
const btnSiguiente = document.getElementById("btn-pregunta-siguiente");
const btnFinalizar = document.getElementById("btn-finalizar-test");
const quizNav = document.getElementById("quiz-nav");
const intentoLabel = document.getElementById("intento-label");
const btnComenzarEvaluacion = document.getElementById("btn-comenzar-evaluacion");

let enEvaluacion = false;

/* Devuelve las preguntas y el registro de progreso del test actual,
   sea el de un módulo o el de la evaluación final. */
function preguntasActuales() {
  return enEvaluacion ? EVALUACION_FINAL.preguntas : MODULOS[moduloActivo].preguntas;
}
function datosProgresoActuales() {
  return enEvaluacion ? estado.evaluacion : estado.modulos[MODULOS[moduloActivo].id];
}

function abrirTest(indice) {
  if (!testDesbloqueado(indice)) return;
  enEvaluacion = false;
  moduloActivo = indice;
  const datos = estado.modulos[MODULOS[indice].id];

  document.getElementById("test-kicker").textContent = `Misión 0${indice + 1} · Test`;

  if (datos.testAprobado) {
    mostrarResumenAprobado();
    return;
  }

  iniciarTest();
}

function abrirEvaluacion() {
  if (!todosLosModulosCompletos()) return;
  enEvaluacion = true;

  document.getElementById("test-kicker").textContent = "Evaluación final";

  if (estado.evaluacionAprobada) {
    abrirCertificado();
    return;
  }

  iniciarTest();
}

function iniciarTest() {
  const datos = datosProgresoActuales();
  intentoLabel.textContent = `Intento ${Math.min(datos.intentos + 1, INTENTOS_MAXIMOS)} de ${INTENTOS_MAXIMOS}`;
  testState = { respuestas: new Array(preguntasActuales().length).fill(null), indiceActual: 0 };
  quizNav.style.display = "flex";
  renderPregunta();
  mostrarVista("view-test");
  renderSidebar();
}

/* ===== Resumen de un módulo ya aprobado (no se reinicia solo) ===== */

function mostrarResumenAprobado() {
  const datos = datosProgresoActuales();
  const puntajeSobre10 = (datos.mejorPuntaje * 10).toFixed(2);
  const indiceModulo = moduloActivo;

  quizNav.style.display = "none";
  quizDots.innerHTML = "";

  const haySiguiente = indiceModulo < MODULOS.length - 1;
  const evaluacionDisponible = !haySiguiente && todosLosModulosCompletos();

  let accionPrincipal = "";
  if (haySiguiente) {
    accionPrincipal = `<button class="btn btn--primary" data-siguiente>Continuar a la siguiente misión</button>`;
  } else if (evaluacionDisponible) {
    accionPrincipal = `<button class="btn btn--primary" data-ir-evaluacion>Ir a la evaluación final</button>`;
  }

  quizCard.innerHTML = `
    <div class="resultado__icono es-aprobado"><svg width="26" height="26"><use href="#i-check"></use></svg></div>
    <h3 class="resultado__titulo">Ya completaste esta misión</h3>
    <p class="resultado__puntaje">Tu mejor puntaje: ${Math.round(datos.mejorPuntaje * 100)}% (${puntajeSobre10} / 10)</p>
    <p class="resultado__intentos">Si quieres, puedes repetir el test para mejorar tu puntaje.</p>
    <div class="resultado__acciones">
      <button class="btn btn--ghost" data-volver-panel>Volver al panel</button>
      <button class="btn btn--ghost" data-repetir>Repetir test</button>
      ${accionPrincipal}
    </div>
  `;

  quizCard.querySelector("[data-volver-panel]").addEventListener("click", volverAlPanel);
  quizCard.querySelector("[data-repetir]").addEventListener("click", iniciarTest);
  quizCard.querySelector("[data-siguiente]")?.addEventListener("click", () => abrirContenido(indiceModulo + 1));
  quizCard.querySelector("[data-ir-evaluacion]")?.addEventListener("click", abrirEvaluacion);

  mostrarVista("view-test");
  renderSidebar();
}

btnComenzarEvaluacion.addEventListener("click", abrirEvaluacion);

function renderDots() {
  quizDots.innerHTML = preguntasActuales()
    .map((_, i) => {
      const clases = ["quiz__dot"];
      if (i === testState.indiceActual) clases.push("is-actual");
      if (testState.respuestas[i] !== null) clases.push("is-respondida");
      return `<button class="${clases.join(" ")}" data-ir-pregunta="${i}">${i + 1}</button>`;
    })
    .join("");
}

function renderPregunta() {
  const i = testState.indiceActual;
  const pregunta = preguntasActuales()[i];
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
  btnSiguiente.disabled = i === preguntasActuales().length - 1;
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
  if (testState.indiceActual < preguntasActuales().length - 1) { testState.indiceActual++; renderPregunta(); }
});

document.getElementById("btn-volver-test").addEventListener("click", () => {
  if (enEvaluacion) mostrarVista("view-evaluacion");
  else abrirContenido(moduloActivo);
});

btnFinalizar.addEventListener("click", () => {
  quizNav.style.display = "none";
  quizDots.innerHTML = "";
  quizCard.innerHTML = `<div class="spinner"></div><p class="spinner-text">Calculando resultados…</p>`;

  setTimeout(calcularResultado, 1200);
});

function calcularResultado() {
  const preguntas = preguntasActuales();
  const datos = datosProgresoActuales();
  const indiceModulo = moduloActivo;
  const esEvaluacion = enEvaluacion;

  const correctas = preguntas.filter((p, i) => testState.respuestas[i] === p.correcta).length;
  const puntaje = correctas / preguntas.length;
  const aprobado = puntaje >= PORCENTAJE_APROBACION;

  datos.intentos += 1;
  datos.mejorPuntaje = Math.max(datos.mejorPuntaje, puntaje);
  if (aprobado) {
    if (esEvaluacion) {
      estado.evaluacionAprobada = true;
      if (!estado.fechaCertificado) estado.fechaCertificado = new Date().toISOString();
    } else {
      datos.testAprobado = true;
    }
  }
  guardarEstado();

  // El progreso se refleja de inmediato al aprobar, no cuando el usuario
  // decide volver al panel — así no depende de que dé ese clic.
  renderPanel();
  renderSidebar();

  // Al aprobar la evaluación final, vamos directo al certificado
  // (no tiene sentido pedir un clic extra para verlo).
  if (esEvaluacion && aprobado) {
    abrirCertificado();
    return;
  }

  const intentosRestantes = INTENTOS_MAXIMOS - datos.intentos;
  const puedeReintentar = !aprobado && intentosRestantes > 0;
  const haySiguiente = !esEvaluacion && aprobado && indiceModulo < MODULOS.length - 1;
  const evaluacionDisponible = !esEvaluacion && aprobado && !haySiguiente && todosLosModulosCompletos();

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
    <p class="resultado__puntaje">${correctas} de ${preguntas.length} correctas (${Math.round(puntaje * 100)}%)</p>
    <p class="resultado__intentos">${aprobado ? (esEvaluacion ? "Evaluación completada" : "Misión completada") : puedeReintentar ? `Te quedan ${intentosRestantes} intento(s) de ${INTENTOS_MAXIMOS}` : `Alcanzaste el máximo de ${INTENTOS_MAXIMOS} intentos. Contacta a tu profesor para más intentos.`}</p>
    <div class="resultado__acciones">
      <button class="btn btn--ghost" data-volver-panel>Volver al panel</button>
      ${accionPrincipal}
    </div>
  `;

  quizCard.querySelector("[data-volver-panel]").addEventListener("click", volverAlPanel);
  quizCard.querySelector("[data-siguiente]")?.addEventListener("click", () => abrirContenido(indiceModulo + 1));
  quizCard.querySelector("[data-ir-evaluacion]")?.addEventListener("click", abrirEvaluacion);
  quizCard.querySelector("[data-reintentar]")?.addEventListener("click", () => (esEvaluacion ? abrirEvaluacion() : abrirTest(indiceModulo)));
}
