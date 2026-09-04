/* ============================================
   CERTIFICADO — rellena la credencial con los
   datos del participante.
   Sin folio ni QR: como todo vive únicamente en
   el localStorage de cada navegador, no hay forma
   de garantizar que un código sea único entre
   distintos navegadores o computadoras sin una
   base de datos central — así que no fingimos esa
   garantía. Si en el futuro se agrega backend/login,
   aquí es donde se reintroduciría un folio real.
   Depende de: estado.js, navegacion.js, quiz.js
   ============================================ */

function abrirCertificado() {
  if (!estado.evaluacionAprobada) return;

  const puntajeSobre10 = (estado.evaluacion.mejorPuntaje * 10).toFixed(2);
  const fecha = estado.fechaCertificado ? new Date(estado.fechaCertificado) : new Date();
  const fechaTexto = fecha.toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" });

  document.getElementById("certificado-card").hidden = false;
  document.getElementById("btn-imprimir-certificado").hidden = false;
  document.getElementById("cert-nombre").textContent = estado.nombre || "—";
  document.getElementById("cert-puntaje").textContent = `Puntaje: ${puntajeSobre10} / 10`;
  document.getElementById("cert-lugar-fecha").textContent =
    `Dado en Samborondón, provincia del Guayas, República del Ecuador, el ${fechaTexto}.`;

  mostrarVista("view-certificado");
}

document.getElementById("btn-imprimir-certificado").addEventListener("click", () => window.print());
