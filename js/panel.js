/* ============================================
   PANEL — tarjetas de misión del dashboard
   Depende de: estado.js, identidad.js (actualizarIdentidad)
   ============================================ */

const missionGrid = document.getElementById("mission-grid");

function renderPanel() {
  missionGrid.innerHTML = "";

  MODULOS.forEach((modulo, indice) => {
    const datos = estado.modulos[modulo.id];
    const desbloqueada = moduloDesbloqueado(indice);

    const card = document.createElement("article");
    card.className = "mission-card";
    if (!desbloqueada) card.classList.add("is-bloqueada");
    if (datos.testAprobado) card.classList.add("is-completada");

    const icono = datos.testAprobado ? "i-check" : desbloqueada ? "i-shield" : "i-lock";
    const boton = datos.testAprobado
      ? `<span class="btn btn--ghost" data-abrir="${indice}" style="width:100%;">Repasar</span>`
      : desbloqueada
        ? `<span class="btn btn--primary" data-abrir="${indice}" style="width:100%;">Comenzar</span>`
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
    if (desbloqueada) card.querySelector("[data-abrir]")?.addEventListener("click", () => abrirContenido(indice));
    missionGrid.appendChild(card);
  });

  const completados = contarCompletados();
  document.getElementById("progreso-texto").textContent = `${completados} de ${MODULOS.length} misiones completadas`;
  document.getElementById("progreso-fill").style.width = `${(completados / MODULOS.length) * 100}%`;

  const todosCompletos = todosLosModulosCompletos();
  const cardEval = document.getElementById("card-evaluacion");
  const cardCert = document.getElementById("card-certificado");

  cardEval.classList.toggle("is-bloqueada", !todosCompletos);
  document.getElementById("eval-mensaje-card").textContent = estado.evaluacionAprobada ? "Ya aprobaste la evaluación final." : todosCompletos ? "Todas las misiones están completas. ¡Ya puedes rendirla!" : "Completa las 6 misiones para desbloquearla.";
  document.getElementById("eval-mensaje").textContent = estado.evaluacionAprobada ? "Ya aprobaste la evaluación final." : todosCompletos ? "Todas las misiones están completas. Puedes rendir la evaluación final." : "Completa las 6 misiones para desbloquear la evaluación.";
  const btnComenzarEval = document.getElementById("btn-comenzar-evaluacion");
  btnComenzarEval.hidden = !todosCompletos;
  btnComenzarEval.textContent = estado.evaluacionAprobada ? "Ver certificado" : "Comenzar evaluación";
  const botonEval = cardEval.querySelector(".btn");
  botonEval.className = todosCompletos ? "btn btn--primary" : "btn btn--locked";
  botonEval.textContent = todosCompletos ? "Comenzar" : "Bloqueada";
  botonEval.style.width = "100%";

  cardCert.classList.toggle("is-bloqueada", !estado.evaluacionAprobada);
  document.getElementById("cert-mensaje-card").textContent = estado.evaluacionAprobada ? "Tu certificado está listo para generarse." : "Aprueba la evaluación para desbloquearlo.";
  document.getElementById("cert-mensaje").textContent = estado.evaluacionAprobada ? `Certificado listo para generarse a nombre de ${estado.nombre || "—"}.` : "Aprueba la evaluación final para desbloquear tu certificado.";
  const botonCert = cardCert.querySelector(".btn");
  botonCert.className = estado.evaluacionAprobada ? "btn btn--primary" : "btn btn--locked";
  botonCert.textContent = estado.evaluacionAprobada ? "Ver certificado" : "Bloqueado";
  botonCert.style.width = "100%";

  actualizarIdentidad();
}

document.getElementById("card-evaluacion").addEventListener("click", () => {
  if (todosLosModulosCompletos()) mostrarVista("view-evaluacion");
});
document.getElementById("card-certificado").addEventListener("click", () => {
  if (estado.evaluacionAprobada) abrirCertificado();
});
