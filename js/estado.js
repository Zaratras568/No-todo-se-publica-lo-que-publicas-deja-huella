/* ============================================
   ESTADO — carga y guardado en localStorage,
   y utilidades para saber qué está desbloqueado.
   Depende de: datos.js
   ============================================ */

function estadoPorDefecto() {
  return {
    nombre: "",
    modulos: Object.fromEntries(
      MODULOS.map((m) => [m.id, { contenidoVisto: false, testAprobado: false, intentos: 0, mejorPuntaje: 0 }])
    ),
    evaluacionAprobada: false,
  };
}

function cargarEstado() {
  try {
    const guardado = localStorage.getItem(CLAVE_ESTADO);
    if (!guardado) return estadoPorDefecto();
    const datos = JSON.parse(guardado);
    return { ...estadoPorDefecto(), ...datos, modulos: { ...estadoPorDefecto().modulos, ...(datos.modulos || {}) } };
  } catch {
    return estadoPorDefecto();
  }
}

function guardarEstado() {
  localStorage.setItem(CLAVE_ESTADO, JSON.stringify(estado));
}

let estado = cargarEstado();
let moduloActivo = null; // índice del módulo abierto en contenido/test
let testState = { respuestas: [], indiceActual: 0 };

/* ===== Utilidades de progreso ===== */

function moduloDesbloqueado(indice) {
  if (indice === 0) return true;
  return estado.modulos[MODULOS[indice - 1].id].testAprobado;
}

function testDesbloqueado(indice) {
  return moduloDesbloqueado(indice) && estado.modulos[MODULOS[indice].id].contenidoVisto;
}

function todosLosModulosCompletos() {
  return MODULOS.every((m) => estado.modulos[m.id].testAprobado);
}

function contarCompletados() {
  return MODULOS.filter((m) => estado.modulos[m.id].testAprobado).length;
}

function iniciales(nombre) {
  const partes = nombre.trim().split(/\s+/).slice(0, 2);
  return partes.map((p) => p[0]?.toUpperCase() || "").join("") || "--";
}
