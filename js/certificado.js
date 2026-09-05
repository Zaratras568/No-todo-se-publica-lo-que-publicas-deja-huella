/* ============================================
   CERTIFICADO — rellena la credencial y genera
   el PDF directamente con código (html2canvas +
   jsPDF, cargadas por CDN en index.html), en vez
   de depender de la función de impresión del
   navegador — así el resultado es siempre igual
   sin importar la configuración de cada usuario.

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

async function descargarCertificadoPDF() {
  const boton = document.getElementById("btn-imprimir-certificado");
  const elemento = document.getElementById("certificado-card");
  if (!elemento || elemento.hidden) return;

  // Si por algún motivo las librerías no cargaron (ej. sin conexión la
  // primera vez), recurrimos a la impresión del navegador como respaldo.
  if (!window.html2canvas || !window.jspdf) {
    window.print();
    return;
  }

  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Generando PDF…";

  try {
    const canvas = await html2canvas(elemento, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margen = 28;
    const areaAncho = pageWidth - margen * 2;
    const areaAlto = pageHeight - margen * 2;

    const ratio = Math.min(areaAncho / canvas.width, areaAlto / canvas.height);
    const anchoFinal = canvas.width * ratio;
    const altoFinal = canvas.height * ratio;
    const x = (pageWidth - anchoFinal) / 2;
    const y = (pageHeight - altoFinal) / 2;

    pdf.addImage(imgData, "PNG", x, y, anchoFinal, altoFinal);

    const nombreArchivo = `certificado-${(estado.nombre || "participante").trim().toLowerCase().replace(/\s+/g, "-")}.pdf`;
    pdf.save(nombreArchivo);
  } catch (error) {
    console.error("No se pudo generar el PDF:", error);
    alert("No se pudo generar el PDF. Intenta de nuevo — si el problema sigue, prueba con otro navegador.");
  } finally {
    boton.disabled = false;
    boton.textContent = textoOriginal;
  }
}

document.getElementById("btn-imprimir-certificado").addEventListener("click", descargarCertificadoPDF);
